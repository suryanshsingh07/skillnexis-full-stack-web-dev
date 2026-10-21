import React from 'react';

export const StatsOverview = ({ stats }) => {
  if (!stats) return null;

  const items = [
    {
      label: 'Total Tasks',
      value: stats.total,
      color: '#6366f1',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      color: '#818cf8',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      label: 'Pending',
      value: stats.pending,
      color: '#f59e0b',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      )
    },
    {
      label: 'Completed',
      value: stats.completed,
      color: '#10b981',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    },
    {
      label: 'High Priority',
      value: stats.highPriority,
      color: '#ef4444',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '1rem',
      marginBottom: '1.75rem'
    }}>
      {items.map((it) => (
        <div key={it.label} className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            fontSize: '1.75rem',
            width: '46px',
            height: '46px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-color)'
          }}>
            {it.icon}
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: it.color, lineHeight: 1.1 }}>
              {it.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.2rem' }}>
              {it.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
