import { Link } from 'react-router-dom';
import styles from './Pages.module.css';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <h1 className={styles.title} style={{ fontSize: '2rem' }}>
        404 — Page Not Found
      </h1>
      <p className={styles.subtitle} style={{ margin: '0 auto 2rem auto' }}>
        The route you requested does not exist in this React Router configuration.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          backgroundColor: 'var(--accent)',
          color: '#0D1117',
          padding: '10px 24px',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 600,
          fontSize: '0.9rem',
        }}
      >
        ← Return to Home
      </Link>
    </div>
  );
}
