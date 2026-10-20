import React from 'react';

export const StatsOverview = ({ stats }) => {
  if (!stats) return null;

  const items = [
    { label: 'Total Tasks', value: stats.total, color: '#6366f1', icon: '📊' },
    { label: 'In Progress', value: stats.inProgress, color: '#818cf8', icon: '⏳' },
    { label: 'Pending', value: stats.pending, color: '#f59e0b', icon: '📋' },
    { label: 'Completed', value: stats.completed, color: '#10b981', icon: '✅' },
    { label: 'High Priority', value: stats.highPriority, color: '#ef4444', icon: '🔥' }
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
