/**
 * Form — Reusable controlled form component
 *
 * Props:
 *   fields     - array of field configs (see below)
 *   onSubmit   - function(formData: object) => void
 *   submitLabel- string: submit button label
 *   title      - string: form title
 *   note       - string: informational note shown above form
 */
import { useState } from 'react';
import Button from './Button';

/**
 * Field config shape:
 * {
 *   name:        string (unique key)
 *   label:       string
 *   type:        'text'|'email'|'password'|'tel'|'textarea'|'select'|'checkbox'
 *   placeholder: string
 *   required:    boolean
 *   options:     array of { value, label } — for select type
 *   validate:    (value) => string | null (null = valid)
 *   autoComplete:string
 * }
 */

export default function Form({
  fields       = [],
  onSubmit     = () => {},
  submitLabel  = 'Submit',
  title        = '',
  note         = '',
}) {
  // Build initial state from fields
  const initValues  = Object.fromEntries(fields.map(f => [f.name, f.type === 'checkbox' ? false : '']));
  const initTouched = Object.fromEntries(fields.map(f => [f.name, false]));
  const initErrors  = Object.fromEntries(fields.map(f => [f.name, '']));

  const [values,    setValues]    = useState(initValues);
  const [touched,   setTouched]   = useState(initTouched);
  const [errors,    setErrors]    = useState(initErrors);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  // Validate a single field
  function validateField(field, value) {
    if (field.required && (value === '' || value === false)) {
      return `${field.label} is required.`;
    }
    if (field.validate) {
      return field.validate(value) || '';
    }
    return '';
  }

  // Validate all and return bool
  function validateAll() {
    const nextErrors = {};
    let allValid = true;
    for (const field of fields) {
      const err = validateField(field, values[field.name]);
      nextErrors[field.name] = err;
      if (err) allValid = false;
    }
    setErrors(nextErrors);
    return allValid;
  }

  function handleChange(e, field) {
    const val = field.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues(prev => ({ ...prev, [field.name]: val }));
    if (touched[field.name]) {
      setErrors(prev => ({ ...prev, [field.name]: validateField(field, val) }));
    }
  }

  function handleBlur(field) {
    setTouched(prev => ({ ...prev, [field.name]: true }));
    setErrors(prev => ({ ...prev, [field.name]: validateField(field, values[field.name]) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Mark all as touched
    setTouched(Object.fromEntries(fields.map(f => [f.name, true])));
    if (!validateAll()) return;

    setLoading(true);
    // Simulate async (real apps would call an API here)
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
    onSubmit(values);
  }

  function handleReset() {
    setValues(initValues);
    setTouched(initTouched);
    setErrors(initErrors);
    setSubmitted(false);
  }

  const formStyle = {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '1.5rem',
    maxWidth: '480px',
  };

  const inputStyle = (hasErr) => ({
    width: '100%',
    background: 'var(--bg3)',
    border: `1px solid ${hasErr ? 'var(--error)' : 'var(--border)'}`,
    borderRadius: '8px',
    color: 'var(--text)',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    padding: '10px 14px',
    outline: 'none',
    boxShadow: hasErr ? '0 0 0 3px rgba(248,81,73,0.1)' : 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
  });

  if (submitted) {
    return (
      <div style={formStyle} role="status" aria-live="polite">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }} aria-hidden="true">✅</div>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Form submitted!</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
            All fields validated successfully. Data captured:
          </p>
          <pre style={{
            background: 'var(--bg3)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '1rem',
            fontSize: '0.75rem', fontFamily: 'var(--mono)',
            color: 'var(--muted)', textAlign: 'left',
            overflowX: 'auto', marginBottom: '1.5rem',
          }}>
            {JSON.stringify(values, null, 2)}
          </pre>
          <Button variant="outline" onClick={handleReset}>Submit another</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={formStyle}>
      {title && <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h2>}
      {note && (
        <p style={{
          fontSize: '0.78rem', color: 'var(--subtle)',
          background: 'rgba(210,153,34,0.08)', border: '1px solid rgba(210,153,34,0.25)',
          borderRadius: '6px', padding: '8px 12px', marginBottom: '1.25rem',
        }}>
          {note}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {fields.map((field) => {
          const hasErr = touched[field.name] && !!errors[field.name];
          const val    = values[field.name];

          return (
            <div key={field.name} style={{ marginBottom: '1rem' }}>
              {field.type !== 'checkbox' && (
                <label
                  htmlFor={`form-${field.name}`}
                  style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '6px' }}
                >
                  {field.label}
                  {field.required && <span style={{ color: 'var(--error)', marginLeft: 2 }} aria-hidden="true"> *</span>}
                </label>
              )}

              {/* SELECT */}
              {field.type === 'select' && (
                <select
                  id={`form-${field.name}`}
                  name={field.name}
                  value={val}
                  onChange={(e) => handleChange(e, field)}
                  onBlur={() => handleBlur(field)}
                  aria-required={field.required}
                  aria-invalid={hasErr}
                  aria-describedby={hasErr ? `${field.name}-err` : undefined}
                  style={{ ...inputStyle(hasErr), cursor: 'pointer' }}
                >
                  <option value="">— Select —</option>
                  {(field.options || []).map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}

              {/* TEXTAREA */}
              {field.type === 'textarea' && (
                <textarea
                  id={`form-${field.name}`}
                  name={field.name}
                  value={val}
                  placeholder={field.placeholder}
                  rows={4}
                  onChange={(e) => handleChange(e, field)}
                  onBlur={() => handleBlur(field)}
                  aria-required={field.required}
                  aria-invalid={hasErr}
                  aria-describedby={hasErr ? `${field.name}-err` : undefined}
                  style={{ ...inputStyle(hasErr), resize: 'vertical', minHeight: 100 }}
                />
              )}

              {/* CHECKBOX */}
              {field.type === 'checkbox' && (
                <label
                  htmlFor={`form-${field.name}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--muted)' }}
                >
                  <input
                    type="checkbox"
                    id={`form-${field.name}`}
                    name={field.name}
                    checked={val}
                    onChange={(e) => handleChange(e, field)}
                    onBlur={() => handleBlur(field)}
                    aria-required={field.required}
                    aria-invalid={hasErr}
                    style={{ width: 16, height: 16, accentColor: 'var(--accent)', cursor: 'pointer' }}
                  />
                  {field.label}
                  {field.required && <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span>}
                </label>
              )}

              {/* TEXT / EMAIL / PASSWORD / TEL */}
              {!['select', 'textarea', 'checkbox'].includes(field.type) && (
                <input
                  type={field.type || 'text'}
                  id={`form-${field.name}`}
                  name={field.name}
                  value={val}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  onChange={(e) => handleChange(e, field)}
                  onBlur={() => handleBlur(field)}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,142,247,0.15)'; }}
                  aria-required={field.required}
                  aria-invalid={hasErr}
                  aria-describedby={hasErr ? `${field.name}-err` : undefined}
                  style={inputStyle(hasErr)}
                />
              )}

              {/* Error message */}
              {hasErr && (
                <p
                  id={`${field.name}-err`}
                  role="alert"
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--error)', marginTop: 5 }}
                >
                  ⚠ {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}

        <Button type="submit" variant="primary" fullWidth loading={loading} style={{ marginTop: '0.5rem' }}>
          {submitLabel}
        </Button>
      </form>
    </div>
  );
}
