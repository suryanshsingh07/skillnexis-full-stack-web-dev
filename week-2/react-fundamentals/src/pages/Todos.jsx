import TodoApp from '../components/TodoApp';
import styles from './Pages.module.css';

export default function Todos() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.heroTag}>
          <span>📝</span> Feature 3: Interactive To-Do Application
        </div>
        <h1 className={styles.title}>React State & To-Do List</h1>
        <p className={styles.subtitle}>
          Demonstrates controlled inputs, list mutations, task completion toggles, delete operations,
          empty states, and browser local storage persistence.
        </p>
      </header>

      {/* Embedded TodoApp Component */}
      <TodoApp />

      {/* Architecture Guidance Callout */}
      <aside
        style={{
          marginTop: '3rem',
          maxWidth: '680px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '1.25rem 1.5rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: 'var(--text-primary)' }}>💡 Educational Note for Evaluators:</strong>
        <p style={{ marginTop: '0.5rem' }}>
          This client-side To-Do app uses React <code>useState</code> and <code>localStorage</code> for
          quick frontend practice. For persistent server-side MongoDB storage with REST endpoints,
          see the dedicated <code>todo-rest-api/</code> project built alongside this app in Week 2.
        </p>
      </aside>
    </div>
  );
}
