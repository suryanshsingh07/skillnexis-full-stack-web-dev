import { useState, useEffect } from 'react';
import styles from './TodoApp.module.css';

const STORAGE_KEY = 'skillnexis_week2_todos';

const INITIAL_TODOS = [
  { id: 1, title: 'Learn React Props and State', completed: true },
  { id: 2, title: 'Build reusable ProductCard component', completed: true },
  { id: 3, title: 'Configure React Router multi-page navigation', completed: false },
  { id: 4, title: 'Style components using CSS Modules', completed: false },
  { id: 5, title: 'Implement To-Do List REST API in Express', completed: false },
];

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback on corrupt storage
    }
    return INITIAL_TODOS;
  });

  const [inputTitle, setInputTitle] = useState('');
  const [error, setError] = useState('');

  // Synchronize to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Ignore storage quota errors in restricted test environments
    }
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = inputTitle.trim();

    if (!trimmed) {
      setError('Task title cannot be empty.');
      return;
    }

    if (trimmed.length < 3) {
      setError('Task title must be at least 3 characters.');
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputTitle('');
    setError('');
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <section className={styles.container} aria-label="React To-Do Application">
      <header className={styles.header}>
        <h2 className={styles.title}>React To-Do Practice App</h2>
        <p className={styles.description}>
          Add, complete, and delete tasks with instant state updates and local storage persistence.
        </p>
      </header>

      {/* Task Metrics Bar */}
      <div className={styles.statsBar}>
        <span>
          Total Tasks: <strong className={styles.badge}>{totalCount}</strong>
        </span>
        <span>
          Completed: <strong className={styles.badge}>{completedCount}</strong> of {totalCount}
        </span>
      </div>

      {/* Add Task Form */}
      <form className={styles.form} onSubmit={handleAddTodo}>
        <input
          type="text"
          className={styles.input}
          placeholder="What needs to be done? (e.g., Test JWT Auth API)"
          value={inputTitle}
          onChange={(e) => {
            setInputTitle(e.target.value);
            if (error) setError('');
          }}
          aria-label="New task title"
        />
        <button type="submit" className={styles.addButton}>
          + Add Task
        </button>
      </form>

      {error && (
        <div className={styles.errorMessage} role="alert">
          ⚠ {error}
        </div>
      )}

      {/* To-Do Items List */}
      {todos.length > 0 ? (
        <ul className={styles.todoList} role="list" aria-label="Task items">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`${styles.todoItem} ${todo.completed ? styles.todoItemCompleted : ''}`}
            >
              <div className={styles.itemLeft}>
                <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  className={styles.checkbox}
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`${styles.todoText} ${todo.completed ? styles.todoTextCompleted : ''}`}
                >
                  {todo.title}
                </label>
              </div>

              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDelete(todo.id)}
                aria-label={`Delete task: ${todo.title}`}
                title="Delete task"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎉</div>
          <h3>All caught up!</h3>
          <p>No tasks remaining. Use the input field above to create a new task.</p>
        </div>
      )}
    </section>
  );
}
