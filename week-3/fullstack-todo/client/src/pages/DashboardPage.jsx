import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';

export const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchTerm.trim()) params.search = searchTerm.trim();

      const data = await taskService.getTasks(params);
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTasks();
  };

  const handleToggle = async (id, completed) => {
    try {
      await taskService.updateTask(id, { completed });
      setTasks(tasks.map(t => t._id === id ? { ...t, completed } : t));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update task.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete task.');
    }
  };

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      const updated = await taskService.updateTask(editingTask._id, taskData);
      setTasks(tasks.map(t => t._id === editingTask._id ? updated.task : t));
    } else {
      const created = await taskService.createTask(taskData);
      setTasks([created.task, ...tasks]);
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f9fafb' }}>Task Dashboard</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Persistent To-Do tracking with Express, MongoDB, and JWT
          </p>
        </div>
        <button onClick={openCreateModal} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>+</span> Add New Task
        </button>
      </div>

      {/* Stats and Filter Bar */}
      <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setStatusFilter('all')}
              className={statusFilter === 'all' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
            >
              All ({tasks.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={statusFilter === 'active' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={statusFilter === 'completed' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
            >
              Completed ({completedCount})
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1', maxWidth: '340px' }}>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            />
            <button type="submit" className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}>
              Search
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={() => { setSearchTerm(''); fetchTasks(); }}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }}
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {/* Task List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          Loading your tasks from MongoDB...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : tasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f9fafb' }}>No Tasks Found</h3>
          <p style={{ color: '#9ca3af', maxWidth: '400px', margin: '0.5rem auto 1.5rem', fontSize: '0.9rem' }}>
            {searchTerm || statusFilter !== 'all'
              ? 'No tasks match your active filters. Try resetting search.'
              : 'You have not created any tasks yet. Click below to add your first task.'}
          </p>
          <button onClick={openCreateModal} className="btn-primary">
            + Create First Task
          </button>
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  );
};
