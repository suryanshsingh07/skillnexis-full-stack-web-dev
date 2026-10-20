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
    icon: '⌨️',
  },
  {
    id: 'prod-2',
    name: 'Logitech MX Master 3S Wireless Mouse',
    description: 'Ergonomic performance mouse with quiet clicks, 8K DPI any-surface tracking, and MagSpeed electromagnetic scrolling.',
    price: 7995,
    category: 'Peripherals',
    icon: '🖱️',
  },
  {
    id: 'prod-3',
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    description: 'Industry-leading active noise cancellation with 8 microphones, Auto NC Optimizer, and 30-hour battery life.',
    price: 26990,
    category: 'Audio',
    icon: '🎧',
  },
  {
    id: 'prod-4',
    name: 'Dell UltraSharp 27" 4K USB-C Hub Monitor',
    description: 'IPS Black technology with 2000:1 contrast ratio, 98% DCI-P3 color coverage, and 90W power delivery over USB-C.',
    price: 42500,
    category: 'Hardware',
    icon: '🖥️',
  },
  {
    id: 'prod-5',
    name: 'Designing Data-Intensive Applications',
    description: 'The definitive guide by Martin Kleppmann on storage engines, distributed consensus, transactions, and stream processing.',
    price: 1850,
    category: 'Books',
    icon: '📚',
  },
  {
    id: 'prod-6',
    name: 'CalDigit TS4 Thunderbolt 4 Docking Station',
    description: '18 ports of extreme connectivity with 98W charging, dual 6K display support, and 2.5 Gigabit Ethernet.',
    price: 36000,
    category: 'Hardware',
    icon: '⚡',
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
          <span>🛍️</span> Feature 1: Reusable Component Showcase
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
