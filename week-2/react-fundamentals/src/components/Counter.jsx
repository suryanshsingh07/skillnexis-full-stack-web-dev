import { useState } from 'react';
import styles from './Counter.module.css';

/**
 * Counter — Demonstrates React Props & State handling
 *
 * Props:
 *   initialCount - Starting numeric state (default: 0)
 *   defaultStep  - Starting step interval (default: 1)
 *   min          - Minimum allowed count (default: -50)
 *   max          - Maximum allowed count (default: 50)
 *   label        - Descriptive title passed as prop
 *   onChange     - Callback function fired on state change
 */
export default function Counter({
  initialCount = 0,
  defaultStep = 1,
  min = -50,
  max = 50,
  label = 'Interactive Props & State Counter',
  onChange,
}) {
  const [count, setCount] = useState(initialCount);
  const [step, setStep] = useState(defaultStep);
  const [log, setLog] = useState([`Initialized with count = ${initialCount}`]);

  const recordAction = (newCount, actionName) => {
    setCount(newCount);
    const entry = `${actionName} by ${step} → ${newCount} (${new Date().toLocaleTimeString()})`;
    setLog((prev) => [entry, ...prev.slice(0, 4)]);
    onChange?.(newCount);
  };

  const handleIncrement = () => {
    if (count + step <= max) {
      recordAction(count + step, 'Incremented');
    }
  };

  const handleDecrement = () => {
    if (count - step >= min) {
      recordAction(count - step, 'Decremented');
    }
  };

  const handleReset = () => {
    setCount(initialCount);
    setLog((prev) => [`Reset to initial count ${initialCount}`, ...prev.slice(0, 4)]);
    onChange?.(initialCount);
  };

  return (
    <section className={styles.container} aria-label={label}>
      <header className={styles.header}>
        <h2 className={styles.title}>{label}</h2>
        <p className={styles.subtitle}>
          Props received: <code>initialCount={initialCount}</code>, <code>min={min}</code>, <code>max={max}</code>
        </p>
      </header>

      {/* Reactive State Display */}
      <div className={styles.displayWrapper}>
        <span
          className={styles.countDisplay}
          aria-live="polite"
          aria-atomic="true"
        >
          {count}
        </span>
      </div>

      {/* State Mutation Controls */}
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.button} ${styles.btnDecrement}`}
          onClick={handleDecrement}
          disabled={count - step < min}
          aria-label={`Decrement count by ${step}`}
        >
          − Decrement ({step})
        </button>

        <button
          type="button"
          className={`${styles.button} ${styles.btnReset}`}
          onClick={handleReset}
          aria-label="Reset count to initial value"
        >
          ↺ Reset
        </button>

        <button
          type="button"
          className={`${styles.button} ${styles.btnIncrement}`}
          onClick={handleIncrement}
          disabled={count + step > max}
          aria-label={`Increment count by ${step}`}
        >
          + Increment ({step})
        </button>
      </div>

      {/* Step Interval Settings */}
      <div className={styles.stepSettings}>
        <span>Step Interval:</span>
        <div className={styles.stepButtonGroup} role="radiogroup" aria-label="Step Interval Selector">
          {[1, 5, 10].map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.stepBtn} ${step === s ? styles.stepBtnActive : ''}`}
              onClick={() => setStep(s)}
              aria-checked={step === s}
              role="radio"
            >
              ±{s}
            </button>
          ))}
        </div>
      </div>

      {/* Action History Log */}
      <div className={styles.history}>
        <strong>Recent State Mutations:</strong>
        <ul style={{ marginTop: '0.4rem', fontFamily: 'var(--font-mono)' }}>
          {log.map((entry, idx) => (
            <li key={idx} style={{ padding: '2px 0' }}>
              • {entry}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
