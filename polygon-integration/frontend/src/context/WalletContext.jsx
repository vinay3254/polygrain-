// frontend/src/context/WalletContext.jsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BrowserProvider, formatEther } from 'ethers';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState(null);

  const refreshBalance = useCallback(async (ethProvider, addr) => {
    try {
      const raw = await ethProvider.getBalance(addr);
      setBalance(parseFloat(formatEther(raw)).toFixed(3));
    } catch {
      setBalance('—');
    }
  }, []);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert('MetaMask not detected. Please install it first.');
      return;
    }
    setIsConnecting(true);
    setConnectError(null);
    try {
      const ethProvider = new BrowserProvider(window.ethereum);
      await ethProvider.send('eth_requestAccounts', []);

      // Switch to target chain; add it if MetaMask doesn't know it (error 4902)
      const isMainnet = import.meta.env.VITE_NETWORK === 'mainnet';
      const targetChainId = isMainnet ? '0x89' : '0x7A69';   // Polygon mainnet | Hardhat localhost
      const targetName    = isMainnet ? 'Polygon' : 'Localhost 8545';
      const targetRpc     = isMainnet ? 'https://polygon-rpc.com' : 'http://127.0.0.1:8545';
      try {
        await ethProvider.send('wallet_switchEthereumChain', [{ chainId: targetChainId }]);
      } catch (switchErr) {
        const code = switchErr.code ?? switchErr.error?.code;
        if (code === 4902) {
          await ethProvider.send('wallet_addEthereumChain', [{
            chainId:        targetChainId,
            chainName:      targetName,
            rpcUrls:        [targetRpc],
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
          }]);
          await ethProvider.send('wallet_switchEthereumChain', [{ chainId: targetChainId }]);
        } else {
          throw switchErr;
        }
      }

      // Re-create provider after chain switch so signer is on the correct chain
      const finalProvider = new BrowserProvider(window.ethereum);
      const ethSigner = await finalProvider.getSigner();
      const network = await finalProvider.getNetwork();
      setProvider(finalProvider);
      setSigner(ethSigner);
      setAccount(await ethSigner.getAddress());
      setChainId(Number(network.chainId));
      await refreshBalance(finalProvider, await ethSigner.getAddress());
    } catch (err) {
      const code = err.code ?? err.error?.code;
      let message;
      if (code === 4001)        message = 'Connection rejected — please approve in MetaMask.';
      else if (code === -32002) message = 'MetaMask popup is already open.';
      else message = err?.shortMessage ?? err?.reason ?? err?.message ?? 'Connection failed';
      setConnectError(message);
    } finally {
      setIsConnecting(false);
    }
  }, [refreshBalance]);

  const disconnect = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setBalance('');
    setProvider(null);
    setSigner(null);
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const onAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAccount(accounts[0]);
        if (provider) refreshBalance(provider, accounts[0]);
      }
    };

    const onChainChanged = () => window.location.reload();

    window.ethereum.on('accountsChanged', onAccountsChanged);
    window.ethereum.on('chainChanged', onChainChanged);
    return () => {
      window.ethereum.removeListener('accountsChanged', onAccountsChanged);
      window.ethereum.removeListener('chainChanged', onChainChanged);
    };
  }, [provider, disconnect, refreshBalance]);

  const value = useMemo(() => ({
    account,
    chainId,
    balance,
    provider,
    signer,
    isConnecting,
    connectError,
    connect,
    disconnect,
  }), [account, chainId, balance, provider, signer, isConnecting, connectError, connect, disconnect]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used inside WalletProvider');
  return ctx;
}
