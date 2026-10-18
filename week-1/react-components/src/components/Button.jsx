/**
 * Button — Reusable button component
 *
 * Props:
 *   variant   - 'primary' | 'outline' | 'ghost' | 'danger' | 'success'
 *   size      - 'sm' | 'md' | 'lg'
 *   leftIcon  - JSX element rendered before label
 *   rightIcon - JSX element rendered after label
 *   loading   - boolean: shows spinner when true
 *   disabled  - boolean
 *   onClick   - click handler
 *   fullWidth - boolean: takes full width
 *   type      - button type attribute
 *   children  - button label content
 */

const VARIANTS = {
  primary: {
    background: 'var(--accent)',
    color: '#0D1117',
    border: '1px solid var(--accent)',
    hover: { background: 'var(--accent-h)', borderColor: 'var(--accent-h)' },
  },
  outline: {
    background: 'transparent',
    color: 'var(--text)',
    border: '1px solid var(--border)',
    hover: { borderColor: 'var(--accent)', color: 'var(--accent)' },
  },
  ghost: {
    background: 'transparent',
    color: 'var(--muted)',
    border: '1px solid transparent',
    hover: { background: 'var(--bg3)', color: 'var(--text)' },
  },
  danger: {
    background: 'transparent',
    color: 'var(--error)',
    border: '1px solid var(--error)',
    hover: { background: 'rgba(248,81,73,0.12)' },
  },
  success: {
    background: 'var(--success)',
    color: '#0D1117',
    border: '1px solid var(--success)',
    hover: { opacity: 0.85 },
  },
};

const SIZES = {
  sm: { fontSize: '0.78rem', padding: '6px 14px', borderRadius: '100px' },
  md: { fontSize: '0.88rem', padding: '10px 22px', borderRadius: '100px' },
  lg: { fontSize: '1rem',    padding: '13px 30px', borderRadius: '100px' },
};

export default function Button({
  variant   = 'primary',
  size      = 'md',
  leftIcon  = null,
  rightIcon = null,
  loading   = false,
  disabled  = false,
  onClick,
  fullWidth = false,
  type      = 'button',
  children,
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: 'inherit',
    fontWeight: 600,
    lineHeight: 1,
    border: v.border,
    background: v.background,
    color: v.color,
    ...s,
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || loading ? 0.5 : 1,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 150ms var(--ease)',
    outline: 'none',
  };

  return (
    <button
      type={type}
      style={baseStyle}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled && !loading && v.hover) {
          Object.assign(e.currentTarget.style, v.hover);
        }
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, baseStyle);
          e.currentTarget.style.transform = '';
        }
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = '2px solid var(--accent)';
        e.currentTarget.style.outlineOffset = '3px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
      }}
    >
      {loading && <Spinner />}
      {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      width="14" height="14"
      viewBox="0 0 24 24"
      style={{ animation: 'spin 700ms linear infinite', flexShrink: 0 }}
      aria-hidden="true"
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4" strokeDashoffset="10" />
    </svg>
  );
}
