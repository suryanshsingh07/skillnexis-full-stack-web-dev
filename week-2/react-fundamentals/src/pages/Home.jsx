import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import styles from './Pages.module.css';

export default function Home() {
  return (
    <div>
      {/* Hero Header */}
      <header className={styles.pageHeader}>
        <div className={styles.heroTag}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '0.35rem' }}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          SkillNexis MERN Internship · Week 2 Practice Set
        </div>
        <h1 className={styles.title}>React Fundamentals & Modern Architecture</h1>
        <p className={styles.subtitle}>
          A structured application demonstrating components, props, state hooks, React Router
          multi-page navigation, and scoped CSS Modules styling.
        </p>
      </header>

      {/* Feature Cards Grid */}
      <section className={styles.featureGrid} aria-label="Assignment Deliverables">
        <article className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2 className={styles.featureTitle}>Product Information Component</h2>
          <p className={styles.featureDesc}>
            Reusable ProductCard component displaying name, price, category, description, and
            selection interactions styled via CSS Modules.
          </p>
          <Link to="/products" className={styles.featureLink}>
            Explore Products Grid →
          </Link>
        </article>

        <article className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <h2 className={styles.featureTitle}>React To-Do Application</h2>
          <p className={styles.featureDesc}>
            Interactive task management featuring add, toggle completion, delete, input validation,
            counter metrics, and localStorage persistence.
          </p>
          <Link to="/todos" className={styles.featureLink}>
            Launch To-Do App →
          </Link>
        </article>

        <article className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
          <h2 className={styles.featureTitle}>React Router Navigation</h2>
          <p className={styles.featureDesc}>
            Client-side multi-page routing with Layout, active link indicators, mobile drawer, and
            fallback 404 page handling.
          </p>
          <Link to="/about" className={styles.featureLink}>
            View About & Architecture →
          </Link>
        </article>
      </section>

      {/* Live Feature 2 Demo: Props and State Counter */}
      <section style={{ marginTop: '3rem' }}>
        <Counter
          initialCount={10}
          defaultStep={5}
          min={-100}
          max={100}
          label="Feature 2: Props & State Demonstration"
        />
      </section>
    </div>
  );
}
