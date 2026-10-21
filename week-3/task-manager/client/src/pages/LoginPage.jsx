import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, authError, setAuthError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError('Please provide both email address and password.');
      return;
    }
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.success) {
      navigate('/');
    }
  };

  const handleFillDemo = () => {
    setEmail('suryansh@example.com');
    setPassword('Password123');
  };

  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto', padding: '0 1rem' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.35rem',
            marginBottom: '0.75rem'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f9fafb' }}>Task Manager Login</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Authenticate to access your isolated task workspace
          </p>
        </div>

        {authError && <div className="alert-error">{authError}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: '#e5e7eb' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="suryansh@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              required
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: '#e5e7eb' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleFillDemo}
            style={{
              background: 'transparent',
              color: '#a5b4fc',
              fontSize: '0.8rem',
              textDecoration: 'underline'
            }}
          >
            Quick Fill Demo Credentials
          </button>
        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.875rem', color: '#9ca3af' }}>
          New to Task Manager?{' '}
          <Link to="/register" style={{ fontWeight: 600, color: '#818cf8' }}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
