/**
 * App.jsx — React Components Practice
 * Demonstrates all 5 reusable components:
 * Header, Footer, Card, Button, Form
 */
import './index.css';
import Header  from './components/Header';
import Footer  from './components/Footer';
import Card    from './components/Card';
import Button  from './components/Button';
import Form    from './components/Form';

/* ============================================================
   SAMPLE DATA — dynamic lists rendered with keys
   ============================================================ */
const NAV_LINKS = [
  { label: 'Home',       href: '#hero',    active: true  },
  { label: 'Components', href: '#comps'               },
  { label: 'Cards',      href: '#cards'               },
  { label: 'Forms',      href: '#forms'               },
];

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/suryanshsingh07', icon: '⧉' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/suryansh-singh-thakur',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    )
  },
];

const FOOTER_LINKS = [
  {
    title: 'Components',
    items: [
      { label: 'Header',  href: '#header-demo'  },
      { label: 'Footer',  href: '#footer-demo'  },
      { label: 'Card',    href: '#cards'         },
      { label: 'Button',  href: '#buttons'       },
      { label: 'Form',    href: '#forms'         },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Portfolio',  href: 'https://suryanshsingh.vercel.app' },
      { label: 'GitHub',     href: 'https://github.com/suryanshsingh07' },
      { label: 'Week 1 Repo',href: '#' },
    ],
  },
];

const PROJECT_CARDS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M15 3v6" /><path d="M9 3v6" /><path d="M15 15v6" /><path d="M9 15v6" />
        <path d="M3 15h6" /><path d="M3 9h6" /><path d="M15 15h6" /><path d="M15 9h6" />
      </svg>
    ),
    title: 'OpsMind AI',
    subtitle: 'RAG · AI',
    description: 'Context-aware corporate knowledge brain using Gemini API and MongoDB Atlas Vector Search.',
    tags: ['Gemini API', 'RAG', 'MongoDB', 'Node.js'],
    badge: { label: 'Active', color: 'success' },
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Extensio.ai',
    subtitle: 'AI · Chrome',
    description: 'No-code Chrome extension generator from natural-language prompts.',
    tags: ['Gemini API', 'React.js', 'Manifest V3'],
    badge: { label: 'Active', color: 'success' },
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: 'MyJob',
    subtitle: 'Full Stack · MERN',
    description: 'Recruitment and applicant tracking platform with JWT auth and REST APIs.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'JWT'],
    badge: { label: 'MERN', color: 'accent' },
    variant: 'featured',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: 'MyShop',
    subtitle: 'Frontend · React',
    description: 'E-commerce frontend with cart, wishlist, filtering, and Recoil state management.',
    tags: ['React.js', 'Recoil', 'Tailwind CSS'],
    badge: { label: 'Frontend', color: 'warn' },
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Actify',
    subtitle: 'AI · Productivity',
    description: 'Academic planner that converts deadlines into daily micro-task schedules.',
    tags: ['Gemini API', 'React.js', 'MongoDB'],
    badge: { label: 'In Dev', color: 'warn' },
  },
];

const CONTACT_FORM_FIELDS = [
  { name: 'name',    label: 'Full Name',     type: 'text',     placeholder: 'Your name',          required: true,  autoComplete: 'name',
    validate: v => v.length < 2 ? 'Name must be at least 2 characters.' : null },
  { name: 'email',   label: 'Email Address', type: 'email',    placeholder: 'you@example.com',    required: true,  autoComplete: 'email',
    validate: v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please enter a valid email.' : null },
  { name: 'subject', label: 'Subject',       type: 'select',   required: true,
    options: [
      { value: 'job',       label: 'Job opportunity' },
      { value: 'collab',    label: 'Collaboration' },
      { value: 'feedback',  label: 'Feedback' },
      { value: 'other',     label: 'Other' },
    ]},
  { name: 'message', label: 'Message',       type: 'textarea', placeholder: 'What would you like to say?', required: true,
    validate: v => v.length < 20 ? 'Message must be at least 20 characters.' : null },
  { name: 'consent', label: 'I understand this is a demo form and no message will be sent.', type: 'checkbox', required: true },
];

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const s = (extra) => ({ maxWidth: 1100, margin: '0 auto', padding: '4rem 1.5rem', ...extra });
  const sectionTitle = (text) => (
    <div style={{ marginBottom: '2rem' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.4rem' }}>
        React Component
      </p>
      <h2 style={{ fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 700 }}>{text}</h2>
      <div style={{ width: 36, height: 2, background: 'var(--accent)', marginTop: '0.75rem' }} />
    </div>
  );

  return (
    <>
      {/* ===== 1. HEADER ===== */}
      <section id="header-demo">
        <Header
          logo="DevNexis"
          navLinks={NAV_LINKS}
          ctaLabel="Contact"
          onCtaClick={() => document.getElementById('forms').scrollIntoView({ behavior: 'smooth' })}
          sticky
        />
      </section>

      {/* ===== HERO ===== */}
      <section id="hero" style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.3)', borderRadius: '100px', display: 'inline-block', padding: '4px 14px', marginBottom: '1.25rem' }}>
          Skill Nexis Week 1 · React Components Practice
        </p>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Five Reusable<br /><span style={{ color: 'var(--accent)' }}>React Components</span>
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.75 }}>
          Each component is props-driven, handles empty/error states, renders lists dynamically with keys, and uses controlled inputs where applicable.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => document.getElementById('comps').scrollIntoView({ behavior: 'smooth' })}>
            Explore Components
          </Button>
          <Button variant="outline" onClick={() => document.getElementById('cards').scrollIntoView({ behavior: 'smooth' })}>
            View Cards
          </Button>
        </div>
      </section>

      {/* ===== 2. BUTTONS ===== */}
      <section id="buttons" style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={s()}>
          {sectionTitle('2. Button')}
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
            Variants, sizes, icons, loading state, and disabled state — all controlled by props.
          </p>

          {/* Variants */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--subtle)', marginBottom: '0.75rem' }}>// Variants</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              {['primary','outline','ghost','danger','success'].map(v => (
                <Button key={v} variant={v}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--subtle)', marginBottom: '0.75rem' }}>// Sizes</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>

          {/* States */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--subtle)', marginBottom: '0.75rem' }}>// States</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <Button variant="primary" loading>Loading…</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="outline" leftIcon="→">With Icon</Button>
              <Button variant="danger" rightIcon="✕">Delete</Button>
            </div>
          </div>

          {/* Full width */}
          <div>
            <p style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--subtle)', marginBottom: '0.75rem' }}>// fullWidth prop</p>
            <div style={{ maxWidth: 320 }}>
              <Button variant="primary" fullWidth>Full Width Button</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. CARDS ===== */}
      <section id="cards" style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={s()}>
          {sectionTitle('3. Card')}
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
            Dynamically rendered from <code style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--accent)' }}>PROJECT_CARDS</code> array with unique <code style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--accent)' }}>key</code> props.
          </p>

          {/* Empty state demo */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--subtle)', marginBottom: '0.75rem' }}>// Empty state</p>
            <Card
              title="No projects yet"
              description="When the data array is empty, you can render a friendly empty state card like this one."
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
              badge={{ label: 'Empty State', color: 'warn' }}
              footer={<Button variant="outline" size="sm">Add a project</Button>}
            />
          </div>

          {/* Project cards grid */}
          <p style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--subtle)', marginBottom: '0.75rem' }}>
            // PROJECT_CARDS.map(p =&gt; &lt;Card key=&#123;p.title&#125; &#123;...p&#125; /&gt;)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }} role="list" aria-label="Project cards">
            {PROJECT_CARDS.map(({ variant, ...p }) => (
              <div key={p.title} role="listitem">
                <Card
                  {...p}
                  variant={variant || 'default'}
                  footer={
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <Button variant="outline" size="sm">GitHub</Button>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. FORM ===== */}
      <section id="forms" style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={s({ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' })}>
          <div>
            {sectionTitle('5. Form')}
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Config-driven controlled form component. All fields are defined in a <code style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--accent)' }}>fields</code> array — 
              no hardcoded markup. Supports text, email, password, select, textarea, and checkbox with per-field validators.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Controlled inputs with useState','Per-field validate functions','On-blur & on-change validation','Loading state during fake async','JSON output on success','Reset to initial state'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <Form
            title="Contact Form Demo"
            note="Demo form — no data is sent or stored."
            fields={CONTACT_FORM_FIELDS}
            submitLabel="Send Message"
            onSubmit={(data) => console.log('Form data:', data)}
          />
        </div>
      </section>

      {/* ===== 2. FOOTER ===== */}
      <section id="footer-demo">
        <Footer
          brand="DevNexis"
          tagline="Reusable components for modern web apps. Built by Suryansh Singh."
          links={FOOTER_LINKS}
          socialLinks={SOCIAL_LINKS}
          copyright="© 2026 Suryansh Singh · Skill Nexis Week 1 Assignment"
        />
      </section>
    </>
  );
}
