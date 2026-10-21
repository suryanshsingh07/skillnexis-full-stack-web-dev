import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 2rem'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            background: 'var(--primary-light)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'var(--primary)'
          }}
        >
          <Compass size={32} />
        </div>

        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.08em' }}>
          404 Error · Page Not Found
        </span>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '0.75rem' }}>
          Lost in Navigation?
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          The page or product you are looking for does not exist or may have been relocated.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            <span>Return to Storefront</span>
          </Link>
          <Link to="/products" className="btn btn-secondary">
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
