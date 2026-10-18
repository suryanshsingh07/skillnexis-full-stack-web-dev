/**
 * CategoryFilter — horizontal scrolling category pill filter
 * Props: categories (string[]), selected (string), onChange (fn)
 */
const CATEGORY_COLORS = {
  React:      '#4F8EF7',
  CSS:        '#3FB950',
  JavaScript: '#D29922',
  Backend:    '#F85149',
  Git:        '#A371F7',
  AI:         '#10B981',
  DSA:        '#F97316',
  DevOps:     '#94A3B8',
};

export default function CategoryFilter({ categories, selected, onChange }) {
  const all = ['All', ...categories];

  return (
    <div
      role="group"
      aria-label="Filter by category"
      style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}
    >
      {all.map((cat) => {
        const isActive = selected === cat;
        const color = cat === 'All' ? 'var(--accent)' : (CATEGORY_COLORS[cat] || 'var(--accent)');

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            aria-label={`Filter by ${cat}`}
            style={{
              padding: '7px 16px',
              borderRadius: '100px',
              fontSize: '0.82rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 150ms',
              background: isActive ? color : 'transparent',
              color:      isActive ? (cat === 'All' ? '#0D1117' : '#0D1117') : 'var(--muted)',
              border:     isActive ? `1px solid ${color}` : '1px solid var(--border)',
              boxShadow:  isActive ? `0 0 12px ${color}33` : 'none',
              opacity: 1,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.color = color;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--muted)';
              }
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
