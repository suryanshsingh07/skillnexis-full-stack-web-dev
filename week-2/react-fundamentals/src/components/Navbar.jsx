import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand} onClick={closeMobile}>
          <svg width="22" height="22" viewBox="-11.5 -10.23174 23 20.46348" fill="none" style={{ verticalAlign: 'middle' }}>
            <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
            <g stroke="#61dafb" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
          <span>ReactFundamentals</span>
          <span className={styles.badge}>Week 2</span>
        </Link>

        {/* Desktop Links */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            To-Do App
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            About
          </NavLink>
        </nav>

        {/* Mobile toggle button */}
        <button
          className={styles.menuToggle}
          onClick={toggleMobile}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      <nav
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileActive : ''}`}
        aria-label="Mobile Navigation"
      >
        <NavLink
          to="/"
          end
          onClick={closeMobile}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          onClick={closeMobile}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/todos"
          onClick={closeMobile}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          To-Do App
        </NavLink>
        <NavLink
          to="/about"
          onClick={closeMobile}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
