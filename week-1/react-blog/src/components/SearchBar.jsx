/**
 * SearchBar — controlled search input with clear button
 * Props: value, onChange, onClear, placeholder
 */
export default function SearchBar({ value, onChange, onClear, placeholder = 'Search posts…' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'border-color 150ms',
      }}
      onFocusWithin={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
    >
      {/* Search icon */}
      <span style={{ padding: '0 0.75rem', color: 'var(--subtle)', display: 'inline-flex', alignItems: 'center', pointerEvents: 'none' }} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search blog posts"
        style={{
          flex: 1,
          background: 'none',
          border: 'none',
          outline: 'none',
          color: 'var(--text)',
          fontFamily: 'inherit',
          fontSize: '0.92rem',
          padding: '12px 0',
        }}
        onFocus={(e) => { e.currentTarget.parentElement.style.borderColor = 'var(--accent)'; e.currentTarget.parentElement.style.boxShadow = '0 0 0 3px rgba(79,142,247,0.12)'; }}
        onBlur={(e) => { e.currentTarget.parentElement.style.borderColor = 'var(--border)'; e.currentTarget.parentElement.style.boxShadow = 'none'; }}
      />

      {/* Clear button — only shown when there's text */}
      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          style={{
            padding: '0 0.75rem',
            color: 'var(--subtle)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            lineHeight: 1,
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--error)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--subtle)'; }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
