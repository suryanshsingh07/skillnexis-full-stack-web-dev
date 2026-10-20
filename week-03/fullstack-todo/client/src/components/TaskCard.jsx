import React from 'react';

export const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="card" style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      padding: '1.2rem',
      marginBottom: '0.85rem',
      transition: 'var(--transition)',
      borderLeft: task.completed ? '4px solid var(--success)' : '4px solid var(--primary)',
      opacity: task.completed ? 0.75 : 1
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id, !task.completed)}
        style={{
          width: '20px',
          height: '20px',
          marginTop: '0.2rem',
          cursor: 'pointer',
          accentColor: '#10b981'
        }}
        aria-label="Toggle task completion"
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: task.completed ? '#9ca3af' : '#f9fafb',
            textDecoration: task.completed ? 'line-through' : 'none',
            wordBreak: 'break-word'
          }}>
            {task.title}
          </h3>
          <span className={task.completed ? 'badge badge-success' : 'badge badge-pending'}>
            {task.completed ? 'Completed' : 'Active'}
          </span>
        </div>

        {task.description && (
          <p style={{
            fontSize: '0.875rem',
            color: '#9ca3af',
            marginTop: '0.35rem',
            lineHeight: 1.4,
            wordBreak: 'break-word'
          }}>
            {task.description}
          </p>
        )}

        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.65rem' }}>
          Created: {formattedDate}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignSelf: 'center' }}>
        <button
          onClick={() => onEdit(task)}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          title="Edit Task"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="btn-danger"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          title="Delete Task"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
