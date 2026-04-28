// frontend/src/components/web3/OnChainConfirmModal.jsx
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const GOLD = '#D4B571';
const GOLD_DIM = 'rgba(212,181,113,0.10)';
const GOLD_BORDER = 'rgba(212,181,113,0.25)';
const SURFACE = 'rgba(18,18,22,0.98)';

function Row({ label, value, gold, mono }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 14px',
      background: 'rgba(255,255,255,0.04)',
      borderRadius: 8,
      marginBottom: 8,
    }}>
      <span style={{ fontSize: 12, color: '#888' }}>{label}</span>
      <span style={{
        fontSize: 13,
        color: gold ? GOLD : '#F0EEE8',
        fontFamily: mono ? 'monospace' : 'inherit',
        fontWeight: gold ? 600 : 400,
        maxWidth: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {value}
      </span>
    </div>
  );
}

function Spinner() {
  return (
    <span style={{
      width: 16, height: 16, flexShrink: 0,
      border: `2px solid ${GOLD_DIM}`,
      borderTopColor: GOLD,
      borderRadius: '50%',
      display: 'inline-block',
      animation: 'spin 0.8s linear infinite',
    }} />
  );
}

/**
 * Props:
 *   isOpen        — bool
 *   onClose       — () => void
 *   onConfirmed   — (txHash: string) => void  called after tx mines
 *   meetingId     — string
 *   isHost        — bool
 *   onSubmit      — (meetingId) => Promise<receipt|null>  from useMeetingContract
 *   isTxPending   — bool  from useMeetingContract
 *   txHash        — string|null  from useMeetingContract
 *   contractError — string|null  from useMeetingContract
 */
export default function OnChainConfirmModal({
  isOpen, onClose, onConfirmed,
  meetingId, isHost,
  onSubmit, isTxPending, txHash, contractError,
}) {
  const [phase, setPhase] = useState('confirm'); // 'confirm' | 'pending' | 'error'

  useEffect(() => {
    if (isOpen) setPhase('confirm');
  }, [isOpen]);

  useEffect(() => {
    if (isTxPending) setPhase('pending');
  }, [isTxPending]);

  useEffect(() => {
    if (contractError) setPhase('error');
  }, [contractError]);

  // When txHash arrives while pending → confirmed
  useEffect(() => {
    if (txHash && phase === 'pending') {
      onConfirmed(txHash);
    }
  }, [txHash, phase, onConfirmed]);

  const handleConfirm = useCallback(async () => {
    setPhase('pending');
    const receipt = await onSubmit(meetingId);
    if (!receipt) setPhase('error');
  }, [onSubmit, meetingId]);

  const networkLabel = import.meta.env.VITE_NETWORK === 'mainnet'
    ? 'Polygon Mainnet' : 'Localhost 8545';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(9,11,11,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
          onClick={(e) => e.target === e.currentTarget && phase !== 'pending' && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              background: SURFACE,
              border: phase === 'error'
                ? '1px solid rgba(239,68,68,0.5)'
                : `1px solid ${GOLD_BORDER}`,
              borderRadius: 16,
              padding: 32,
              width: '100%',
              maxWidth: 420,
              position: 'relative',
            }}
          >
            {phase !== 'pending' && (
              <button
                onClick={onClose}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'transparent', border: 'none',
                  color: '#666', cursor: 'pointer', padding: 4,
                }}
              >
                <X size={18} />
              </button>
            )}

            {phase === 'confirm' && (
              <>
                <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, color: '#E8D5A3', marginBottom: 6 }}>
                  {isHost ? 'Start meeting on Polygon' : 'Join meeting on Polygon'}
                </h2>
                <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>
                  This will record your meeting permanently on-chain.
                </p>
                <Row label="Meeting ID" value={meetingId} mono />
                <Row label="Network" value={networkLabel} gold />
                <Row label="Est. Gas" value="~0.002 MATIC" />
                <Row label="IPFS Metadata" value="Will pin on confirm" />
                <button
                  onClick={handleConfirm}
                  style={{
                    width: '100%', marginTop: 20,
                    background: 'linear-gradient(135deg,#D4B571,#6F5115)',
                    border: 'none', color: '#000',
                    fontWeight: 700, fontSize: 14,
                    padding: 14, borderRadius: 10, cursor: 'pointer',
                  }}
                >
                  Confirm in MetaMask →
                </button>
                <button
                  onClick={onClose}
                  style={{
                    width: '100%', marginTop: 10,
                    background: 'transparent', border: 'none',
                    color: '#666', fontSize: 13, cursor: 'pointer', padding: 8,
                  }}
                >
                  Cancel
                </button>
              </>
            )}

            {phase === 'pending' && (
              <>
                <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, color: '#E8D5A3', marginBottom: 6 }}>
                  Waiting for confirmation
                </h2>
                <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>
                  Transaction submitted — waiting for block inclusion.
                </p>
                <Row label="Tx Hash" value={txHash ? `${txHash.slice(0,10)}…${txHash.slice(-6)}` : 'Submitting…'} mono />
                <Row label="Block" value="Pending…" gold />
                <Row label="IPFS Metadata" value="Pinning…" />
                <div style={{
                  width: '100%', marginTop: 20,
                  background: GOLD_DIM,
                  border: `1px solid ${GOLD_BORDER}`,
                  color: GOLD, fontWeight: 700, fontSize: 14,
                  padding: 14, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}>
                  <Spinner />
                  Confirming on-chain…
                </div>
              </>
            )}

            {phase === 'error' && (
              <>
                <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, color: '#E8D5A3', marginBottom: 6 }}>
                  Transaction failed
                </h2>
                <p style={{ fontSize: 13, color: '#EF4444', marginBottom: 24 }}>
                  {contractError ?? 'Unknown error'}
                </p>
                <Row label="Meeting ID" value={meetingId} mono />
                <button
                  onClick={handleConfirm}
                  style={{
                    width: '100%', marginTop: 20,
                    background: 'linear-gradient(135deg,#D4B571,#6F5115)',
                    border: 'none', color: '#000',
                    fontWeight: 700, fontSize: 14,
                    padding: 14, borderRadius: 10, cursor: 'pointer',
                  }}
                >
                  Retry
                </button>
              </>
            )}
          </motion.div>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
