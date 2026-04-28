const GOLD = '#D4B571';
const GOLD_DIM = 'rgba(212,181,113,0.08)';
const GOLD_BORDER = 'rgba(212,181,113,0.2)';

/**
 * Props:
 *   txHash — string | undefined  if falsy the badge is not rendered
 */
export default function ChainProofBadge({ txHash }) {
  if (!txHash) return null;

  const url = txHash !== 'no-contract-configured'
    ? `https://amoy.polygonscan.com/tx/${txHash}`
    : null;

  return (
    <a
      href={url ?? undefined}
      target={url ? '_blank' : undefined}
      rel="noopener noreferrer"
      onClick={url ? undefined : (e) => e.preventDefault()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: GOLD_DIM,
        border: `1px solid ${GOLD_BORDER}`,
        borderRadius: 6,
        padding: '4px 8px',
        fontSize: 11,
        color: GOLD,
        fontWeight: 600,
        cursor: url ? 'pointer' : 'default',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,181,113,0.15)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = GOLD_DIM; }}
    >
      ⛓ On-chain ↗
    </a>
  );
}
