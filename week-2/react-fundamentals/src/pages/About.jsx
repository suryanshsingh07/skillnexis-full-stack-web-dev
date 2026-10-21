import styles from './Pages.module.css';

export default function About() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.heroTag}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '0.35rem' }}>
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
          Architecture & Engineering Notes
        </div>
        <h1 className={styles.title}>About This Project</h1>
        <p className={styles.subtitle}>
          Implemented by <strong>Suryansh Singh</strong> for Week 2 of the SkillNexis Full Stack Web
          Development (MERN) Internship.
        </p>
      </header>

      {/* Checklist of Covered Requirements */}
      <section className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>Week 2 React Fundamentals Covered</h2>
        <ul className={styles.checkList}>
          <li className={styles.checkItem}>
            <span className={styles.checkIcon}>✓</span>
            <span>
              <strong>Reusable Components:</strong> <code>&lt;ProductCard /&gt;</code>, <code>&lt;Counter /&gt;</code>, <code>&lt;TodoApp /&gt;</code>, and <code>&lt;Navbar /&gt;</code>.
            </span>
          </li>
          <li className={styles.checkItem}>
            <span className={styles.checkIcon}>✓</span>
            <span>
              <strong>Props & State Handling:</strong> Implemented across Counter (step/bounds) and ProductCard (selection callback).
            </span>
          </li>
          <li className={styles.checkItem}>
            <span className={styles.checkIcon}>✓</span>
            <span>
              <strong>Functional To-Do App:</strong> Add, toggle, delete, validation, and localStorage persistence.
            </span>
          </li>
          <li className={styles.checkItem}>
            <span className={styles.checkIcon}>✓</span>
            <span>
              <strong>React Router Multi-Page Navigation:</strong> Client-side routing with nested layout, active styles, and 404 fallback.
            </span>
          </li>
          <li className={styles.checkItem}>
            <span className={styles.checkIcon}>✓</span>
            <span>
              <strong>CSS Modules Styling:</strong> Locally-scoped <code>.module.css</code> styles preventing stylesheet pollution.
            </span>
          </li>
        </ul>
      </section>

      {/* Developer Profile Section */}
      <section className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>Developer Profile</h2>
        <p className={styles.aboutText}>
          <strong>Suryansh Singh</strong> is a Computer Science undergraduate and Full Stack Developer
          based in Lucknow, Uttar Pradesh, India. Experienced in building responsive, accessible web
          applications and REST APIs using the MERN stack (MongoDB, Express.js, React.js, Node.js).
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <a
            href="https://github.com/suryanshSingh07"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.featureLink}
          >
            GitHub: @suryanshSingh07 ↗
          </a>
          <a
            href="https://linkedin.com/in/suryansh-singh-thakur"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.featureLink}
          >
            LinkedIn: suryansh-singh-thakur ↗
          </a>
          <a
            href="https://suryanshsingh.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.featureLink}
          >
            Portfolio: suryanshsingh.vercel.app ↗
          </a>
          <a
            href="mailto:suryanshsinghchauhanthakur@gmail.com"
            className={styles.featureLink}
          >
            Email: suryanshsinghchauhanthakur@gmail.com ↗
          </a>
        </div>
      </section>
    </div>
  );
}
