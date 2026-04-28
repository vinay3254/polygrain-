import { useEffect, useState } from 'react';
import { useWallet } from '../../context/WalletContext';

const GOLD = '#D4B571';
const GOLD_DIM = 'rgba(212,181,113,0.10)';
const GOLD_BORDER = 'rgba(212,181,113,0.2)';

/**
 * Props:
 *   txPending — bool  shows "Anchoring message…" indicator when true
 */
export default function ChainHUD({ txPending = false }) {
  const { account, provider } = useWallet();
  const [blockNumber, setBlockNumber] = useState(null);

  useEffect(() => {
    if (!provider) return;
    let cancelled = false;

    const poll = async () => {
      try {
        const n = await provider.getBlockNumber();
        if (!cancelled) setBlockNumber(n);
      } catch { /* ignore */ }
    };

    poll();
    const id = setInterval(poll, 12000);
    return () => { cancelled = true; clearInterval(id); };
  }, [provider]);

  if (!account) return null;

  return (
    <>
      {/* Top-right: chain status */}
      <div style={{
        position: 'absolute', top: 20, right: 20, zIndex: 10,
        background: 'rgba(9,11,11,0.9)',
        border: `1px solid ${GOLD_BORDER}`,
        borderRadius: 8,
        padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 8,
        pointerEvents: 'none',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#22C55E',
          boxShadow: '0 0 6px #22C55E',
          flexShrink: 0,
        }} />
        <div>
          <div style={{ fontSize: 11, color: GOLD, fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            POLYGON AMOY
          </div>
          <div style={{ fontSize: 10, color: '#666' }}>
            {blockNumber ? `Block #${blockNumber.toLocaleString()}` : 'Syncing…'}
          </div>
        </div>
      </div>

      {/* Top-left: tx pending indicator */}
      {txPending && (
        <div style={{
          position: 'absolute', top: 20, left: 20, zIndex: 10,
          background: GOLD_DIM,
          border: `1px solid ${GOLD_BORDER}`,
          borderRadius: 8,
          padding: '6px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            width: 10, height: 10, flexShrink: 0,
            border: `1.5px solid ${GOLD_DIM}`,
            borderTopColor: GOLD,
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.8s linear infinite',
          }} />
          <span style={{ fontSize: 11, color: GOLD }}>Anchoring message…</span>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
