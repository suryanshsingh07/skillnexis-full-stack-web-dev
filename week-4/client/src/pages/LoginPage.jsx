import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, ShoppingBag, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }
    if (!password) {
      setError('Please provide your account password.');
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@nexisstore.com');
    setPassword('Admin@123456');
    setError('');
  };

  const fillDemoUser = () => {
    setEmail('suryansh@nexisstore.com');
    setPassword('User@123456');
    setError('');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div className="brand-icon">
              <ShoppingBag size={18} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>NexisStore</span>
          </Link>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to manage orders, addresses, and wishlist items.</p>
        </div>

        {error && (
          <div
            style={{
              padding: '0.85rem 1rem',
              background: 'var(--danger-bg)',
              color: 'var(--danger)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }}>
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="demo-credentials-box">
          <div className="demo-credentials-title">
            <span>Demo Internship Credentials</span>
          </div>
          <div className="demo-btns-row">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem 0.5rem' }}
              onClick={fillDemoAdmin}
            >
              Fill Admin Account
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem 0.5rem' }}
              onClick={fillDemoUser}
            >
              Fill Demo Customer
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don't have an account yet?{' '}
          <Link to={`/signup?redirect=${encodeURIComponent(redirect)}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Create one now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
