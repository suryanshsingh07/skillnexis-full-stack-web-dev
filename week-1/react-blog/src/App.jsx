import { useState, useMemo } from 'react';
import postsData from './data/posts.json';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import BlogCard from './components/BlogCard';
import PostModal from './components/PostModal';

// Extract unique categories dynamically from the data
const CATEGORIES = Array.from(new Set(postsData.map((p) => p.category)));

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'readTime'
  const [selectedPost, setSelectedPost] = useState(null);

  // Filter & sort logic
  const filteredPosts = useMemo(() => {
    return postsData
      .filter((post) => {
        // Category check
        const matchCategory =
          selectedCategory === 'All' || post.category === selectedCategory;

        // Tag check
        const matchTag =
          !selectedTag || post.tags.includes(selectedTag);

        // Search check
        const q = searchQuery.trim().toLowerCase();
        const matchSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q)) ||
          post.category.toLowerCase().includes(q);

        return matchCategory && matchTag && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'readTime') return a.readTime - b.readTime;
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedTag !== null;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag(null);
    setSortBy('newest');
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
  };

  const handleTagClick = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Top Navigation */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'rgba(13, 17, 23, 0.85)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <div>
              <a
                href="#top"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                }}
              >
                Suryansh Singh <span style={{ color: 'var(--accent)', fontWeight: 400 }}>/ DevBlog</span>
              </a>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                Skill Nexis Week 1 · React Blog
              </div>
            </div>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href="../../portfolio-html-css/index.html"
              style={{
                fontSize: '0.85rem',
                color: 'var(--muted)',
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
            >
              ← Portfolio
            </a>
            <a
              href="https://github.com/suryanshsingh07"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.85rem',
                color: 'var(--muted)',
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/suryansh-singh-thakur"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.85rem',
                color: 'var(--muted)',
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
            >
              LinkedIn ↗
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'linear-gradient(180deg, rgba(79,142,247,0.05) 0%, transparent 100%)',
          padding: '3rem 1.5rem 2.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '100px',
              background: 'rgba(79,142,247,0.1)',
              border: '1px solid rgba(79,142,247,0.25)',
              color: 'var(--accent)',
              fontSize: '0.78rem',
              fontWeight: 600,
              fontFamily: 'var(--mono)',
              marginBottom: '1rem',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '0.35rem' }}>
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            Technical Articles & Field Notes
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Engineering Insights & Full-Stack Deep Dives
          </h1>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--muted)',
              lineHeight: 1.65,
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Original articles written by Suryansh Singh covering React architecture, modern CSS,
            Node.js backends, RAG systems with Gemini, and real internship learnings.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '2rem 1.5rem 4rem',
        }}
      >
        {/* Controls Bar: Search & Sort */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}
        >
          {/* SearchBar Component */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search articles by title, content, or tag…"
          />

          {/* Sort & Quick Filter Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <label
              htmlFor="sort-select"
              style={{ fontSize: '0.82rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}
            >
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg2)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '9px 12px',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="newest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="readTime">Shortest Read Time</option>
            </select>
          </div>
        </div>

        {/* Category Filters Component */}
        <div style={{ marginBottom: '1.25rem' }}>
          <CategoryFilter
            categories={CATEGORIES}
            selected={selectedCategory}
            onChange={handleCategorySelect}
          />
        </div>

        {/* Active Filters & Feedback Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            marginBottom: '1.75rem',
            fontSize: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--muted)' }}>
              Showing <strong style={{ color: 'var(--text)' }}>{filteredPosts.length}</strong> of{' '}
              <strong style={{ color: 'var(--text)' }}>{postsData.length}</strong> articles
            </span>

            {selectedCategory !== 'All' && (
              <span
                style={{
                  background: 'rgba(79,142,247,0.1)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(79,142,247,0.3)',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--mono)',
                }}
              >
                Category: {selectedCategory}
              </span>
            )}

            {selectedTag && (
              <span
                style={{
                  background: 'rgba(63,185,80,0.1)',
                  color: 'var(--success)',
                  border: '1px solid rgba(63,185,80,0.3)',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--mono)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Tag: #{selectedTag}
                <button
                  onClick={() => setSelectedTag(null)}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
                  title="Remove tag filter"
                >
                  ✕
                </button>
              </span>
            )}

            {searchQuery && (
              <span
                style={{
                  background: 'rgba(210,153,34,0.12)',
                  color: 'var(--warn)',
                  border: '1px solid rgba(210,153,34,0.3)',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--mono)',
                }}
              >
                Query: "{searchQuery}"
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--error)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Reset all filters ↺
            </button>
          )}
        </div>

        {/* Post Grid or Empty State */}
        {filteredPosts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                featured={post.featured}
                onCategoryClick={handleCategorySelect}
                onTagClick={handleTagClick}
                onReadPost={setSelectedPost}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              background: 'var(--bg2)',
              border: '1px dashed var(--border)',
              borderRadius: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text)' }}>
              No articles match your search
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
              We couldn't find any articles matching your search criteria. Try a different keyword, category, or clear your filters.
            </p>
            <button
              onClick={handleResetFilters}
              style={{
                background: 'var(--accent)',
                color: '#0D1117',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              Clear all filters & show all posts
            </button>
          </div>
        )}
      </main>

      {/* Reader Modal */}
      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onTagClick={handleTagClick}
        onCategoryClick={handleCategorySelect}
      />

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--bg2)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--muted)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <p>
            Built by <strong style={{ color: 'var(--text)' }}>Suryansh Singh</strong> · Full Stack Web Development Intern
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--subtle)' }}>
            Skill Nexis Week 1 Assignment · Deliverable G (React Blog UI Mini-Project)
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
            <a href="https://github.com/suryanshsingh07" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              GitHub
            </a>
            <span>·</span>
            <a href="https://linkedin.com/in/suryansh-singh-thakur" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              LinkedIn
            </a>
            <span>·</span>
            <a href="mailto:suryanshsinghchauhanthakur@gmail.com" style={{ color: 'var(--accent)' }}>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
