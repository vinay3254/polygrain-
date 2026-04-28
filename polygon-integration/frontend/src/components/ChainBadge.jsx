// frontend/src/components/ChainBadge.jsx
// Post-meeting badge showing Polygon blockchain storage status.
// Animates in with fade + slide-up via Framer Motion.
// Three states: pending (spinner), confirmed (Polygon icon + tx link), error (red note).
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ChainBadge — displays on-chain storage status after a meeting ends.
 *
 * Render this conditionally: it returns null when isTxPending, txHash, and
 * error are all falsy (i.e. before any blockchain action has been taken).
 *
 * @param {boolean}     isTxPending - True while the tx is awaiting confirmation
 * @param {string|null} txHash      - Transaction hash once submitted to the mempool
 * @param {string|null} error       - Error message if the store attempt failed
 * @param {boolean}     isTestnet   - True → links to mumbai.polygonscan.com
 *                                    False → links to polygonscan.com
 */
export default function ChainBadge({ isTxPending, txHash, error, onDismiss, isTestnet = true }) {
  // Nothing to show — hide the badge entirely
  if (!isTxPending && !txHash && !error) return null;

  const isLocalhost = import.meta.env.VITE_NETWORK === 'localhost';
  const explorerBase = isLocalhost
    ? null
    : isTestnet
      ? 'https://mumbai.polygonscan.com/tx/'
      : 'https://polygonscan.com/tx/';

  /**
   * Shortens a transaction hash to "0x12345678…ef56cd" for display.
   * @param {string} hash - Full 0x-prefixed transaction hash
   */
  const truncateTx = (hash) => `${hash.slice(0, 10)}…${hash.slice(-6)}`;

  // Pick border colour based on state
  const borderClass = error
    ? 'border-red-500/40'
    : txHash
      ? 'border-[#8247E5]/50'
      : 'border-[#D4B571]/30';

  return (
    <AnimatePresence>
      <motion.div
        key="chain-badge"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{    opacity: 0, y: 10 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={[
          'flex flex-col gap-1.5 px-3 py-2 rounded-xl text-xs',
          'bg-[#090B0B]/90 backdrop-blur-sm shadow-lg border',
          borderClass,
        ].join(' ')}
        role="status"
        aria-live="polite"
      >
        {/* ── Pending: tx submitted, awaiting on-chain confirmation ──────── */}
        {isTxPending && !txHash && (
          <div className="flex items-center gap-2 text-[#D4B571]">
            <svg
              className="animate-spin h-3 w-3 shrink-0"
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
            <span className="font-medium">Storing on Polygon…</span>
          </div>
        )}

        {/* ── Confirmed: Polygon logo + clickable truncated tx hash ──────── */}
        {txHash && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Inline Polygon logo — purple diamond shape */}
            <svg
              width="14" height="14"
              viewBox="0 0 38 38"
              fill="none"
              className="shrink-0"
              aria-label="Polygon logo"
            >
              <path d="M19 1L37 19L19 37L1 19Z" fill="#8247E5" />
              <path
                d="M26 14.5L19 7.5L12 14.5L7.5 19L12 23.5L19 30.5L26 23.5L30.5 19Z"
                fill="white" opacity="0.35"
              />
            </svg>

            <span className="text-[#D4B571] font-semibold">
              {isLocalhost ? 'Confirmed on Hardhat' : 'Stored on Polygon'}
            </span>

            {explorerBase ? (
              <a
                href={`${explorerBase}${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'font-mono text-[#8247E5] underline underline-offset-2',
                  'hover:text-[#a97af8] transition-colors duration-150',
                ].join(' ')}
                aria-label={`View transaction on Polygonscan: ${txHash}`}
              >
                {truncateTx(txHash)}
              </a>
            ) : (
              <span className="font-mono text-white/40">{truncateTx(txHash)}</span>
            )}
          </div>
        )}

        {/* ── Error: non-blocking red note ──────────────────────────────── */}
        {error && (
          <p className="text-red-400 leading-snug max-w-[260px]">
            ⚠ {error}
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
