export default function VideoBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, width: '100vw', height: '100vh', pointerEvents: 'none', background: '#090B0B' }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          /* sepia converts all hues to warm brown, hue-rotate nudges to gold */
          filter: 'sepia(1) saturate(1.4) hue-rotate(5deg) brightness(0.28)',
        }}
      >
        <source src="/bg-animation.mp4" type="video/mp4" />
      </video>

      {/* gold color blend — replaces any remaining hue with #D4B571 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: '#D4B571',
        mixBlendMode: 'color',
        opacity: 0.01,
      }} />
    </div>
  );
}
