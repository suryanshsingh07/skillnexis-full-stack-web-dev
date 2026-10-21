import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import styles from './Pages.module.css';

const SAMPLE_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Keychron K2 Pro Mechanical Keyboard',
    description: 'Wireless custom mechanical keyboard with hot-swappable switches, QMK/VIA support, and Mac/Windows layout.',
    price: 8499,
    category: 'Peripherals',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="M6 8h.001" /><path d="M10 8h.001" /><path d="M14 8h.001" /><path d="M18 8h.001" />
        <path d="M6 12h.001" /><path d="M10 12h.001" /><path d="M14 12h.001" /><path d="M18 12h.001" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
  {
    id: 'prod-2',
    name: 'Logitech MX Master 3S Wireless Mouse',
    description: 'Ergonomic performance mouse with quiet clicks, 8K DPI any-surface tracking, and MagSpeed electromagnetic scrolling.',
    price: 7995,
    category: 'Peripherals',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="7" />
        <line x1="12" y1="6" x2="12" y2="10" />
      </svg>
    ),
  },
  {
    id: 'prod-3',
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    description: 'Industry-leading active noise cancellation with 8 microphones, Auto NC Optimizer, and 30-hour battery life.',
    price: 26990,
    category: 'Audio',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
  {
    id: 'prod-4',
    name: 'Dell UltraSharp 27" 4K USB-C Hub Monitor',
    description: 'IPS Black technology with 2000:1 contrast ratio, 98% DCI-P3 color coverage, and 90W power delivery over USB-C.',
    price: 42500,
    category: 'Hardware',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'prod-5',
    name: 'Designing Data-Intensive Applications',
    description: 'The definitive guide by Martin Kleppmann on storage engines, distributed consensus, transactions, and stream processing.',
    price: 1850,
    category: 'Books',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
      </svg>
    ),
  },
  {
    id: 'prod-6',
    name: 'CalDigit TS4 Thunderbolt 4 Docking Station',
    description: '18 ports of extreme connectivity with 98W charging, dual 6K display support, and 2.5 Gigabit Ethernet.',
    price: 36000,
    category: 'Hardware',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <circle cx="6" cy="12" r="1" />
        <circle cx="10" cy="12" r="1" />
        <line x1="14" y1="12" x2="18" y2="12" />
      </svg>
    ),
  },
];

const CATEGORIES = ['All', 'Peripherals', 'Audio', 'Hardware', 'Books'];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return SAMPLE_PRODUCTS;
    return SAMPLE_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleProductSelect = ({ id, name, selected }) => {
    setSelectedItems((prev) =>
      selected ? [...prev, { id, name }] : prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.heroTag}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '0.35rem' }}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Feature 1: Reusable Component Showcase
        </div>
        <h1 className={styles.title}>Developer Tech Products</h1>
        <p className={styles.subtitle}>
          Each card below is rendered using the reusable <code>&lt;ProductCard /&gt;</code> component,
          demonstrating prop contracts, dynamic list rendering, stable keys, and CSS Modules styling.
        </p>
      </header>

      {/* Selected Items Live Banner */}
      {selectedItems.length > 0 && (
        <div
          style={{
            background: 'var(--accent-dim)',
            border: '1px solid rgba(88, 166, 255, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.9rem',
          }}
        >
          <span>
            Selected Products ({selectedItems.length}):{' '}
            <strong>{selectedItems.map((i) => i.name).join(', ')}</strong>
          </span>
          <button
            onClick={() => setSelectedItems([])}
            style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.82rem' }}
          >
            Clear selection
          </button>
        </div>
      )}

      {/* Category Filter Pills */}
      <nav className={styles.filterBar} aria-label="Product Categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles.filterPill} ${selectedCategory === cat ? styles.filterActive : ''}`}
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Products Grid */}
      <section className={styles.productsGrid} aria-label="Products Collection">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            category={product.category}
            icon={product.icon}
            onSelect={handleProductSelect}
          />
        ))}
      </section>
    </div>
  );
}
