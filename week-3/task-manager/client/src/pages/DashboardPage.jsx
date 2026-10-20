import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { StatsOverview } from '../components/StatsOverview';
import { TaskCard } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';

export const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
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
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      if (searchTerm.trim()) params.search = searchTerm.trim();

      const data = await taskService.getTasks(params);
      setTasks(data.tasks || []);
      setStats(data.stats || null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTasks();
  };

  const handleResetFilters = () => {
    setStatusFilter('');
    setPriorityFilter('');
    setSearchTerm('');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await taskService.updateTask(id, { status: newStatus });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update task status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete task.');
    }
  };

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      await taskService.updateTask(editingTask._id, taskData);
    } else {
      await taskService.createTask(taskData);
    }
    fetchTasks();
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#f9fafb' }}>Task Operations Center</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Production-grade full-stack task management with isolated user boundaries
          </p>
        </div>
        <button onClick={openCreateModal} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>+</span> Create New Task
        </button>
      </div>

      {/* Stats Cards */}
      <StatsOverview stats={stats} />

      {/* Search & Filter Toolbar */}
      <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1', minWidth: '240px', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search tasks by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            />
            <button type="submit" className="btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}>
              Search
            </button>
          </form>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ width: 'auto', padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                style={{ width: 'auto', padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {(statusFilter || priorityFilter || searchTerm) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', color: '#ef4444' }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {/* Task Cards List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          Loading your tasks from MongoDB...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : tasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🗂️</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f9fafb' }}>No Tasks Match Filter</h3>
          <p style={{ color: '#9ca3af', maxWidth: '420px', margin: '0.5rem auto 1.5rem', fontSize: '0.9rem' }}>
            {statusFilter || priorityFilter || searchTerm
              ? 'No tasks found for the current query criteria. Try adjusting or resetting filters.'
              : 'You have not added any tasks yet. Create your first task to start organizing.'}
          </p>
          <button onClick={openCreateModal} className="btn-primary">
            + Create New Task
          </button>
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={handleStatusChange}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  );
};
