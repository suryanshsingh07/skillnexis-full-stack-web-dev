import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <strong>Suryansh Singh</strong> · Full Stack Web Development Intern · SkillNexis Week 2
          </div>
          <div className={styles.footerLinks}>
            <a
              href="https://github.com/suryanshSingh07"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/suryansh-singh-thakur"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://suryanshsingh.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              Portfolio ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
