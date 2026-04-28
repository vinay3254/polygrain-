// frontend/src/components/web3/MeetingReceiptModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Copy } from 'lucide-react';

const GOLD = '#D4B571';
const GOLD_BORDER = 'rgba(212,181,113,0.25)';
const SURFACE = 'rgba(18,18,22,0.98)';

function Row({ label, value, link, linkHref, mono }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontSize: 12, color: '#888' }}>{label}</span>
      {link ? (
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12, color: GOLD, textDecoration: 'underline', cursor: 'pointer' }}
        >
          {value} ↗
        </a>
      ) : (
        <span style={{
          fontSize: 12,
          color: '#C9B48A',
          fontFamily: mono ? 'monospace' : 'inherit',
          maxWidth: 220,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {value}
        </span>
      )}
    </div>
  );
}

/**
 * Props:
 *   isOpen        — bool
 *   onClose       — () => void
 *   meetingId     — string
 *   txHash        — string
 *   ipfsCid       — string
 *   blockNumber   — string | number
 *   durationMin   — number
 *   participantCount — number
 *   onDashboard   — () => void
 */
export default function MeetingReceiptModal({
  isOpen, onClose,
  meetingId, txHash, ipfsCid, blockNumber,
  durationMin, participantCount,
  onDashboard,
}) {
  const polygonScanUrl = txHash && txHash !== 'no-contract-configured'
    ? `https://amoy.polygonscan.com/tx/${txHash}`
    : null;

  const gateway = import.meta.env.VITE_PINATA_GATEWAY ?? 'https://gateway.pinata.cloud/ipfs';
  const ipfsUrl = ipfsCid && ipfsCid !== 'ipfs-unavailable'
    ? `${gateway}/${ipfsCid}`
    : null;

  const copyIpfs = () => {
    if (ipfsUrl && navigator.clipboard) {
      navigator.clipboard.writeText(ipfsUrl).catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="receipt-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(9,11,11,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              background: SURFACE,
              border: `1px solid ${GOLD_BORDER}`,
              borderRadius: 16,
              padding: 28,
              width: '100%',
              maxWidth: 440,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(212,181,113,0.12)',
                border: `1px solid rgba(212,181,113,0.3)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
              }}>
                ⛓️
              </div>
              <div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 16, color: '#E8D5A3', fontWeight: 600 }}>
                  Meeting recorded on-chain
                </div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                  Permanent proof of this meeting exists on Polygon
                </div>
              </div>
            </div>

            {/* Rows */}
            <Row label="Meeting ID" value={meetingId} mono />
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{ fontSize: 12, color: '#888' }}>Duration</span>
              <span style={{ fontSize: 12, color: GOLD, fontWeight: 600 }}>
                {durationMin ?? '—'} min · {participantCount ?? '—'} participants
              </span>
            </div>
            <Row label="Tx Hash" value={txHash ? `${txHash.slice(0,10)}…${txHash.slice(-6)}` : '—'} mono />
            <Row label="Block" value={blockNumber ? String(blockNumber) : '—'} mono />
            <Row label="IPFS CID" value={ipfsCid ? `${ipfsCid.slice(0,10)}…` : '—'} mono />
            {polygonScanUrl && (
              <Row label="PolygonScan" value="View transaction" link linkHref={polygonScanUrl} />
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button
                onClick={copyIpfs}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: `1px solid rgba(212,181,113,0.3)`,
                  color: GOLD,
                  fontSize: 13, padding: 10, borderRadius: 8,
                  cursor: 'pointer', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <Copy size={14} /> Copy IPFS Link
              </button>
              <button
                onClick={onDashboard}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg,#D4B571,#6F5115)',
                  border: 'none',
                  color: '#000',
                  fontSize: 13, padding: 10, borderRadius: 8,
                  cursor: 'pointer', fontWeight: 700,
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
