/**
 * BlogCard — renders a single blog post preview
 * Props: post (object), onTagClick (fn), onCategoryClick (fn)
 */
const CATEGORY_COLORS = {
  React:      { bg: 'rgba(79,142,247,0.1)',  color: '#4F8EF7',  border: 'rgba(79,142,247,0.3)'  },
  CSS:        { bg: 'rgba(63,185,80,0.1)',   color: '#3FB950',  border: 'rgba(63,185,80,0.3)'   },
  JavaScript: { bg: 'rgba(210,153,34,0.12)', color: '#D29922',  border: 'rgba(210,153,34,0.3)'  },
  Backend:    { bg: 'rgba(248,81,73,0.1)',   color: '#F85149',  border: 'rgba(248,81,73,0.3)'   },
  Git:        { bg: 'rgba(139,73,248,0.1)',  color: '#A371F7',  border: 'rgba(139,73,248,0.3)'  },
  AI:         { bg: 'rgba(16,185,129,0.1)',  color: '#10B981',  border: 'rgba(16,185,129,0.3)'  },
  DSA:        { bg: 'rgba(249,115,22,0.1)',  color: '#F97316',  border: 'rgba(249,115,22,0.3)'  },
  DevOps:     { bg: 'rgba(100,116,139,0.1)', color: '#94A3B8',  border: 'rgba(100,116,139,0.3)' },
};

export default function BlogCard({ post, onTagClick, onCategoryClick, onReadPost, featured = false }) {
  const catColor = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.React;

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <article
      style={{
        background: 'var(--bg2)',
        border: `1px solid ${featured ? 'rgba(79,142,247,0.35)' : 'var(--border)'}`,
        borderTop: featured ? '2px solid var(--accent)' : undefined,
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 200ms, transform 200ms, box-shadow 200ms',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(79,142,247,0.5)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = featured ? 'rgba(79,142,247,0.35)' : 'var(--border)';
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}
      aria-label={`Blog post: ${post.title}`}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem' }}>
        {/* Category pill */}
        <button
          onClick={() => onCategoryClick?.(post.category)}
          style={{
            background: catColor.bg,
            color: catColor.color,
            border: `1px solid ${catColor.border}`,
            borderRadius: '100px',
            fontSize: '0.7rem',
            fontWeight: 700,
            fontFamily: 'var(--mono)',
            padding: '3px 10px',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            transition: 'opacity 150ms',
            flexShrink: 0,
          }}
          aria-label={`Filter by category: ${post.category}`}
        >
          {post.category}
        </button>

        {featured && (
          <span style={{
            fontSize: '0.68rem', fontWeight: 600, fontFamily: 'var(--mono)',
            color: 'var(--accent)', background: 'rgba(79,142,247,0.1)',
            border: '1px solid rgba(79,142,247,0.3)', borderRadius: '100px',
            padding: '3px 8px', letterSpacing: '0.06em',
          }}>
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        onClick={() => onReadPost?.(post)}
        style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.35,
          marginBottom: '0.6rem',
          cursor: onReadPost ? 'pointer' : 'default',
          transition: 'color 150ms',
        }}
        onMouseEnter={(e) => { if (onReadPost) e.currentTarget.style.color = 'var(--accent)'; }}
        onMouseLeave={(e) => { if (onReadPost) e.currentTarget.style.color = 'var(--text)'; }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{
        fontSize: '0.84rem',
        color: 'var(--muted)',
        lineHeight: 1.7,
        flex: 1,
        marginBottom: '1rem',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {post.excerpt}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1rem' }} role="list" aria-label="Tags">
        {post.tags.slice(0, 4).map((tag) => (
          <button
            key={tag}
            role="listitem"
            onClick={() => onTagClick?.(tag)}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.68rem',
              fontWeight: 500,
              color: 'var(--subtle)',
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '2px 7px',
              cursor: 'pointer',
              transition: 'border-color 150ms, color 150ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--subtle)'; }}
            aria-label={`Filter by tag: ${tag}`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Read Article Action */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => onReadPost?.(post)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'gap 150ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
          aria-label={`Read full article: ${post.title}`}
        >
          Read article →
        </button>
      </div>

      {/* Footer: author + meta */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.1rem' }} aria-hidden="true">{post.authorAvatar}</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)' }}>{post.author}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', fontSize: '0.72rem', color: 'var(--subtle)', fontFamily: 'var(--mono)' }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span aria-label={`${post.readTime} minute read`}>{post.readTime} min</span>
        </div>
      </div>
    </article>
  );
}
