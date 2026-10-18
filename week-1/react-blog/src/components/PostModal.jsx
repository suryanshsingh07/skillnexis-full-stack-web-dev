/**
 * PostModal — displays full article content in an accessible reader modal
 * Props: post (object | null), onClose (fn), onTagClick (fn), onCategoryClick (fn)
 */
import { useEffect } from 'react';

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

export default function PostModal({ post, onClose, onTagClick, onCategoryClick }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  const catColor = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.React;
  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-post-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Modal Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => {
                onCategoryClick?.(post.category);
                onClose();
              }}
              style={{
                background: catColor.bg,
                color: catColor.color,
                border: `1px solid ${catColor.border}`,
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--mono)',
                padding: '4px 12px',
                cursor: 'pointer',
              }}
            >
              {post.category}
            </button>
            {post.featured && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  fontFamily: 'var(--mono)',
                  color: 'var(--accent)',
                  background: 'rgba(79,142,247,0.1)',
                  border: '1px solid rgba(79,142,247,0.3)',
                  borderRadius: '100px',
                  padding: '3px 9px',
                }}
              >
                ⭐ Featured Article
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close article modal"
            style={{
              background: 'transparent',
              color: 'var(--muted)',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'color 150ms, background 150ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.background = 'var(--border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div
          style={{
            padding: '1.75rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <h2
            id="modal-post-title"
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </h2>

          {/* Author & Meta Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--border)',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>{post.authorAvatar}</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
                  {post.author}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                  Full Stack Developer · SRMU CSE
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                fontSize: '0.8rem',
                color: 'var(--subtle)',
                fontFamily: 'var(--mono)',
              }}
            >
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Excerpt callout */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'var(--bg3)',
              borderLeft: '4px solid var(--accent)',
              borderRadius: '0 8px 8px 0',
              fontStyle: 'italic',
              color: 'var(--muted)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            {post.excerpt}
          </div>

          {/* Body Article Content */}
          <div
            style={{
              fontSize: '0.96rem',
              color: 'var(--text)',
              lineHeight: 1.8,
              letterSpacing: '0.01em',
            }}
          >
            <p>{post.content}</p>
          </div>

          {/* Tags */}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.5rem' }}>
              Tagged with:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {post.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    onTagClick?.(tag);
                    onClose();
                  }}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'var(--accent)',
                    background: 'rgba(79, 142, 247, 0.08)',
                    border: '1px solid rgba(79, 142, 247, 0.25)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg3)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'var(--accent)',
              color: '#0D1117',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
}
