import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import styles from './Pages.module.css';

export default function Home() {
  return (
    <div>
      {/* Hero Header */}
      <header className={styles.pageHeader}>
        <div className={styles.heroTag}>
          <span>⚡</span> SkillNexis MERN Internship · Week 2 Practice Set
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
          <div className={styles.featureIcon}>🛍️</div>
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
          <div className={styles.featureIcon}>📝</div>
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
          <div className={styles.featureIcon}>🧭</div>
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
