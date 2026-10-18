/**
 * Card — Reusable content card component
 *
 * Props:
 *   variant      - 'default' | 'featured' | 'compact' | 'horizontal'
 *   title        - string
 *   subtitle     - string
 *   description  - string
 *   tags         - string[]
 *   icon         - string | JSX (displayed in card header)
 *   badge        - { label, color: 'success'|'error'|'warn'|'accent' }
 *   footer       - JSX: footer content (buttons etc.)
 *   href         - string: makes whole card a link
 *   onClick      - function
 *   image        - string: image URL (optional)
 *   imageAlt     - string: alt text for image
 */

const BADGE_COLORS = {
  success: { bg: 'rgba(63,185,80,0.1)',   color: 'var(--success)', border: 'rgba(63,185,80,0.3)' },
  error:   { bg: 'rgba(248,81,73,0.1)',   color: 'var(--error)',   border: 'rgba(248,81,73,0.3)' },
  warn:    { bg: 'rgba(210,153,34,0.1)',  color: 'var(--warn)',    border: 'rgba(210,153,34,0.3)' },
  accent:  { bg: 'rgba(79,142,247,0.1)',  color: 'var(--accent)',  border: 'rgba(79,142,247,0.3)' },
};

export default function Card({
  variant     = 'default',
  title       = '',
  subtitle    = '',
  description = '',
  tags        = [],
  icon        = null,
  badge       = null,
  footer      = null,
  href        = null,
  onClick     = null,
  image       = null,
  imageAlt    = '',
}) {
  const isHorizontal = variant === 'horizontal';
  const isFeatured   = variant === 'featured';

  const cardStyle = {
    background: 'var(--bg2)',
    border: `1px solid ${isFeatured ? 'rgba(79,142,247,0.4)' : 'var(--border)'}`,
    borderTop: isFeatured ? '2px solid var(--accent)' : undefined,
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    cursor: href || onClick ? 'pointer' : 'default',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color 200ms, transform 200ms, box-shadow 200ms',
  };

  const bodyStyle = {
    padding: variant === 'compact' ? '0.75rem' : '1.25rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const handleHover = (entering) => (e) => {
    if (entering) {
      e.currentTarget.style.borderColor = 'rgba(79,142,247,0.5)';
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
      if (isFeatured) e.currentTarget.style.boxShadow = '0 12px 32px rgba(79,142,247,0.15)';
    } else {
      e.currentTarget.style.borderColor = isFeatured ? 'rgba(79,142,247,0.4)' : 'var(--border)';
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    }
  };

  const content = (
    <>
      {/* Image */}
      {image && (
        <div style={{ height: isHorizontal ? '100%' : '160px', minWidth: isHorizontal ? '140px' : undefined, overflow: 'hidden', background: 'var(--bg3)', flexShrink: 0 }}>
          <img src={image} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Body */}
      <div style={bodyStyle}>
        {/* Header row: icon + badge */}
        {(icon || badge) && (
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            {icon && (
              <div style={{
                width: 40, height: 40,
                borderRadius: '8px',
                background: 'var(--accent-dim)',
                border: '1px solid rgba(79,142,247,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem',
                color: 'var(--accent)',
                flexShrink: 0,
              }}>
                {icon}
              </div>
            )}
            {badge && (() => {
              const bc = BADGE_COLORS[badge.color] || BADGE_COLORS.accent;
              return (
                <span style={{
                  fontSize: '0.68rem', fontWeight: 600, fontFamily: 'var(--mono)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '3px 8px', borderRadius: '100px',
                  background: bc.bg, color: bc.color, border: `1px solid ${bc.border}`,
                }}>
                  {badge.label}
                </span>
              );
            })()}
          </div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            {subtitle}
          </p>
        )}

        {/* Title */}
        {title && (
          <h3 style={{ fontSize: variant === 'compact' ? '0.9rem' : '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.7, flex: 1, marginBottom: tags.length || footer ? '0.75rem' : 0 }}>
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: footer ? '0.75rem' : 0 }} role="list" aria-label="Tags">
            {tags.map((tag) => (
              <span key={tag} role="listitem" style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem', fontWeight: 500,
                color: 'var(--muted)',
                background: 'var(--bg3)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '2px 8px',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        {footer && <div style={{ marginTop: 'auto' }}>{footer}</div>}
      </div>
    </>
  );

  const sharedProps = {
    style: cardStyle,
    onMouseEnter: handleHover(true),
    onMouseLeave: handleHover(false),
    onClick,
  };

  if (href) {
    return (
      <a href={href} {...sharedProps} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <div {...sharedProps} tabIndex={onClick ? 0 : undefined} role={onClick ? 'button' : undefined}>{content}</div>;
}
