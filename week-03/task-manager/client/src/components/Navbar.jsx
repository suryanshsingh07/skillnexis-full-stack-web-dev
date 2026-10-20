import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header style={{
      background: 'rgba(17, 24, 39, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.9rem 1.5rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>⚡</div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', margin: 0 }}>
              SkillNexis Task Manager
            </h1>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Mini Project — Full Stack MERN</span>
          </div>
        </Link>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <nav style={{ display: 'flex', gap: '0.5rem' }}>
              <Link
                to="/"
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: location.pathname === '/' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  color: location.pathname === '/' ? '#818cf8' : '#9ca3af',
                  textDecoration: 'none'
                }}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: location.pathname === '/profile' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  color: location.pathname === '/profile' ? '#818cf8' : '#9ca3af',
                  textDecoration: 'none'
                }}
              >
                Profile
              </Link>
            </nav>

            <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }} />

            <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f9fafb' }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{user.role}</div>
            </div>

            <button
              onClick={logout}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                borderRadius: '6px'
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
