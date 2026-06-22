export default function Footer() {
  return (
    <footer
      style={{
        padding: '2.5rem 1.5rem',
        background: '#030303',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontSize: '1.1rem',
          fontWeight: 900,
          letterSpacing: '0.2em',
          background: 'linear-gradient(135deg,#6366f1,#22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        FORTE
      </span>
      <p style={{ color: '#334155', fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} Forte Studio. Crafting immersive web experiences.
      </p>
    </footer>
  );
}
