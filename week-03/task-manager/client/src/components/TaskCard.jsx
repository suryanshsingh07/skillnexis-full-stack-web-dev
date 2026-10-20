import React from 'react';

export const TaskCard = ({ task, onStatusChange, onEdit, onDelete }) => {
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const priorityClass = {
    high: 'badge badge-high',
    medium: 'badge badge-medium',
    low: 'badge badge-low'
  }[task.priority] || 'badge badge-medium';

  const statusClass = {
    pending: 'badge badge-pending',
    'in-progress': 'badge badge-in-progress',
    completed: 'badge badge-completed'
  }[task.status] || 'badge badge-pending';

  return (
    <div className="card" style={{
      padding: '1.25rem',
      marginBottom: '1rem',
      borderLeft: `4px solid ${task.status === 'completed' ? '#10b981' : task.priority === 'high' ? '#ef4444' : '#6366f1'}`,
      opacity: task.status === 'completed' ? 0.75 : 1,
      transition: 'var(--transition)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
            <span className={statusClass}>{task.status}</span>
            <span className={priorityClass}>{task.priority} Priority</span>
            {formattedDueDate && (
              <span style={{
                fontSize: '0.75rem',
                color: isOverdue ? '#ef4444' : '#9ca3af',
                fontWeight: isOverdue ? 700 : 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                📅 Due: {formattedDueDate} {isOverdue && '(Overdue)'}
              </span>
            )}
          </div>

          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: task.status === 'completed' ? '#9ca3af' : '#f9fafb',
            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
            wordBreak: 'break-word'
          }}>
            {task.title}
          </h3>

          {task.description && (
            <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginTop: '0.35rem', lineHeight: 1.4, wordBreak: 'break-word' }}>
              {task.description}
            </p>
          )}

          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.75rem' }}>
            Created {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            style={{
              width: 'auto',
              padding: '0.4rem 0.65rem',
              fontSize: '0.8rem',
              borderRadius: '6px',
              background: '#1f2937',
              color: '#f9fafb',
              cursor: 'pointer'
            }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => onEdit(task)}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="btn-danger"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
