import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <h1 style={{ fontSize: '5rem', fontWeight: 900, color: '#6366f1', lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0 0.5rem' }}>Page Not Found</h2>
      <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>The requested resource does not exist.</p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-block' }}>
        Return to Task Dashboard
      </Link>
    </div>
  );
};
