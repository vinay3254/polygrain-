import { motion } from 'framer-motion';
import { useWallet } from '../../context/WalletContext';

const GOLD = '#E5C76A';
const GOLD_DIM = 'rgba(229,199,106,0.12)';
const GOLD_BORDER = 'rgba(229,199,106,0.70)';
const BLACK_CARD = 'rgba(0, 0, 0, 0.97)';

function truncate(addr) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';
}

const NETWORK_LABEL = import.meta.env.VITE_NETWORK === 'mainnet' ? 'POLYGON' : 'HARDHAT';
const NETWORK_SYMBOL = import.meta.env.VITE_NETWORK === 'mainnet' ? 'MATIC' : 'ETH';

export default function WalletBanner() {
  const { account, balance, isConnecting, connectError, connect } = useWallet();

  if (account) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: BLACK_CARD,
          border: `1px solid ${GOLD_BORDER}`,
          borderRadius: 10,
          padding: '10px 16px',
          marginBottom: 16,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', flexShrink: 0 }} />
        <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#F0E0B0' }}>
          {truncate(account)}
        </span>
        <span style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`, borderRadius: 20, padding: '2px 10px', fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: '0.06em' }}>
          {NETWORK_LABEL}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#888' }}>
          {balance || '…'} {NETWORK_SYMBOL}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ marginBottom: 16 }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: BLACK_CARD, border: `1px solid ${GOLD_BORDER}`,
        borderRadius: 10, padding: '12px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.70), 0 0 28px rgba(212,181,113,0.14)',
      }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#D4B571,#D4B571)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
          🦊
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#F0E0B0', fontWeight: 600, marginBottom: 2 }}>
            Connect your wallet to go on-chain
          </div>
          <div style={{ fontSize: 12, color: '#888' }}>
            Meeting activity will be recorded on {NETWORK_LABEL}
          </div>
        </div>
        <button
          onClick={connect}
          disabled={isConnecting}
          style={{
            background: isConnecting ? GOLD_DIM : 'linear-gradient(135deg,#D4B571,#6F5115)',
            border: isConnecting ? `1px solid ${GOLD_BORDER}` : 'none',
            color: isConnecting ? GOLD : '#000',
            fontWeight: 700, fontSize: 13, padding: '10px 20px',
            borderRadius: 8, cursor: isConnecting ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap', opacity: isConnecting ? 0.7 : 1,
          }}
        >
          {isConnecting ? 'Connecting…' : 'Connect MetaMask'}
        </button>
      </div>
      {connectError && (
        <div style={{ marginTop: 8, padding: '8px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, fontSize: 12, color: '#f87171' }}>
          ⚠ {connectError}
        </div>
      )}
    </motion.div>
  );
}
