import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1rem',
        gap: '1rem',
        color: 'var(--text-secondary)'
      }}
    >
      <Loader2
        size={36}
        color="var(--primary)"
        style={{ animation: 'spin 1s linear infinite' }}
      />
      <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{text}</p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
