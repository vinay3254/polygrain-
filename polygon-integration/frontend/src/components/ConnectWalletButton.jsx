// frontend/src/components/ConnectWalletButton.jsx
// Styled MetaMask connect button using EtherXMeet brand colors.
// Shows a truncated address pill when connected, a spinner while connecting.
// Pure Tailwind — no external UI library.
import { motion } from 'framer-motion';

/**
 * ConnectWalletButton — triggers MetaMask wallet connection.
 *
 * @param {function}    onConnect     - Pass connectWallet() from useMeetingContract here
 * @param {string|null} walletAddress - Connected address from hook state (null = disconnected)
 * @param {boolean}     isConnecting  - True while the MetaMask popup is open
 */
export default function ConnectWalletButton({ onConnect, walletAddress, isConnecting }) {
  /**
   * Truncates a wallet address to first 6 + last 4 chars.
   * Example: "0xf39Fd6...b92266"
   */
  const truncate = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const isDisabled = isConnecting || !!walletAddress;

  return (
    <motion.button
      onClick={isDisabled ? undefined : onConnect}
      disabled={isDisabled}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={!isDisabled ? { scale: 1.03 } : {}}
      whileTap={!isDisabled   ? { scale: 0.97 } : {}}
      className={[
        // Base: pill shape, small text
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        'text-xs font-medium tracking-wide select-none',
        // Brand colours: gold border on near-black background
        'border border-[#D4B571] text-[#D4B571] bg-[#090B0B]/90',
        'backdrop-blur-sm shadow-lg',
        // Interactive states
        !isDisabled
          ? 'hover:bg-[#D4B571] hover:text-[#090B0B] cursor-pointer transition-colors duration-200'
          : 'cursor-default opacity-90',
      ].join(' ')}
      aria-label={
        walletAddress
          ? `Wallet connected: ${walletAddress}`
          : 'Connect MetaMask wallet'
      }
    >
      {isConnecting ? (
        // ── Loading state ─────────────────────────────────────────────────
        <>
          <svg
            className="animate-spin h-3.5 w-3.5 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Connecting…
        </>
      ) : walletAddress ? (
        // ── Connected state — address pill ────────────────────────────────
        <>
          {/* Pulsing green connected dot */}
          <span
            className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.7)] shrink-0"
            aria-hidden="true"
          />
          <span className="font-mono">{truncate(walletAddress)}</span>
        </>
      ) : (
        // ── Disconnected state ────────────────────────────────────────────
        <>
          {/* Simple wallet icon in brand gold */}
          <svg
            width="13" height="13"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <rect x="1" y="5" width="18" height="12" rx="2"
              stroke="#D4B571" strokeWidth="1.5" />
            <path d="M1 9h18" stroke="#D4B571" strokeWidth="1.5" />
            <circle cx="14" cy="13" r="1.5" fill="#D4B571" />
          </svg>
          Connect Wallet
        </>
      )}
    </motion.button>
  );
}
