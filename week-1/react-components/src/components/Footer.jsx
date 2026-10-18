/**
 * Footer — Reusable site footer
 *
 * Props:
 *   brand       - string: brand name
 *   tagline     - string: short description
 *   links       - array of sections: { title, items: [{ label, href }] }
 *   socialLinks - array of { label, href, icon (JSX) }
 *   copyright   - string: copyright text
 */

const DEFAULT_COPYRIGHT = '© 2026 All rights reserved.';

export default function Footer({
  brand = 'DevApp',
  tagline = 'Building useful things on the web.',
  links = [],
  socialLinks = [],
  copyright = DEFAULT_COPYRIGHT,
}) {
  const rootStyle = {
    background: 'var(--bg2)',
    borderTop: '1px solid var(--border)',
    paddingTop: '3rem',
    paddingBottom: '1.5rem',
  };

  const wrapStyle = {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 1.5rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `200px repeat(${links.length}, 1fr)`,
    gap: '2rem',
    marginBottom: '2.5rem',
  };

  return (
    <footer style={rootStyle} role="contentinfo">
      <div style={wrapStyle}>
        {/* Top grid: brand + link columns */}
        <div style={{ ...gridStyle, flexWrap: 'wrap' }}>
          {/* Brand column */}
          <div>
            <a
              href="#"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '0.75rem',
              }}
              aria-label={`${brand} — Home`}
            >
              <span style={{ color: 'var(--accent)' }}>&lt;</span>
              {brand}
              <span style={{ color: 'var(--accent)' }}>/&gt;</span>
            </a>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {tagline}
            </p>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {socialLinks.map((sl) => (
                  <a
                    key={sl.label}
                    href={sl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={sl.label}
                    aria-label={`${sl.label} (opens in new tab)`}
                    style={{
                      width: 36, height: 36,
                      background: 'var(--bg3)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--muted)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      transition: 'border-color 150ms, color 150ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--muted)';
                    }}
                  >
                    {sl.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {links.map((section) => (
            <div key={section.title}>
              <h3 style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--text)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}>
                {section.title}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href || '#'}
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--muted)',
                        textDecoration: 'none',
                        transition: 'color 150ms',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--subtle)' }}>{copyright}</p>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
