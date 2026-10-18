/**
 * Header — Reusable site header / navigation bar
 *
 * Props:
 *   logo       - string: brand name
 *   navLinks   - array of { label, href, active? }
 *   ctaLabel   - string: CTA button text (optional)
 *   onCtaClick - function: CTA button handler
 *   sticky     - boolean: position: sticky
 */
import { useState, useEffect, useRef } from 'react';

const headerStyle = (sticky, scrolled) => ({
  position: sticky ? 'sticky' : 'relative',
  top: 0,
  zIndex: 1000,
  height: '64px',
  background: scrolled ? 'rgba(13,17,23,0.9)' : 'rgba(13,17,23,0.7)',
  backdropFilter: 'blur(12px)',
  borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
  transition: 'border-color 250ms, background 250ms',
});

export default function Header({
  logo = 'DevApp',
  navLinks = [],
  ctaLabel = 'Contact',
  onCtaClick = () => {},
  sticky = true,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileRef = useRef(null);
  const toggleRef = useRef(null);

  // Scroll listener for navbar style
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Escape key closes menu
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header style={headerStyle(sticky, scrolled)} role="banner">
      <nav
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          style={{ fontFamily: 'var(--mono)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}
          aria-label={`${logo} — Home`}
        >
          <span style={{ color: 'var(--accent)' }}>&lt;</span>
          {logo}
          <span style={{ color: 'var(--accent)' }}>/&gt;</span>
        </a>

        {/* Desktop nav links */}
        <ul
          style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none' }}
          className="nav-desktop"
          aria-label="Desktop navigation"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href || '#'}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: link.active ? 'var(--text)' : 'var(--muted)',
                  textDecoration: 'none',
                  padding: '4px 0',
                  borderBottom: link.active ? '1px solid var(--accent)' : '1px solid transparent',
                  transition: 'color 150ms',
                }}
                aria-current={link.active ? 'page' : undefined}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = link.active ? 'var(--text)' : 'var(--muted)'; }}
              >
                {link.label}
              </a>
            </li>
          ))}

          {ctaLabel && (
            <li>
              <button
                onClick={onCtaClick}
                style={{
                  background: 'var(--accent)',
                  color: '#0D1117',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '8px 20px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 150ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-h)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; }}
              >
                {ctaLabel}
              </button>
            </li>
          )}
        </ul>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
          className="nav-ham"
        >
          {[1,2,3].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '22px', height: '2px',
              background: 'var(--text)',
              borderRadius: '2px',
              transform: menuOpen
                ? i === 1 ? 'translateY(7px) rotate(45deg)'
                : i === 2 ? 'scaleX(0)'
                : 'translateY(-7px) rotate(-45deg)'
                : 'none',
              opacity: menuOpen && i === 2 ? 0 : 1,
              transition: 'transform 250ms, opacity 250ms',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={mobileRef}
          role="menu"
          aria-label="Mobile navigation"
          style={{
            position: 'absolute', top: '64px', left: 0, right: 0,
            background: 'var(--bg2)',
            borderBottom: '1px solid var(--border)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href || '#'}
              role="menuitem"
              onClick={closeMenu}
              style={{
                display: 'block',
                padding: '0.75rem 0.5rem',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: link.active ? 'var(--accent)' : 'var(--muted)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                transition: 'color 150ms',
              }}
              aria-current={link.active ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Responsive CSS (injected once) */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-ham { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
