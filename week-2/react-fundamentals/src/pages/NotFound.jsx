import { Link } from 'react-router-dom';
import styles from './Pages.module.css';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
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
