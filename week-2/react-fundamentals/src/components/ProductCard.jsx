import { useState } from 'react';
import styles from './ProductCard.module.css';

/**
 * ProductCard — Reusable component displaying product information
 *
 * Props:
 *   id          - Unique product identifier
 *   name        - Product name
 *   description - Product description
 *   price       - Number (price in USD / INR)
 *   category    - Category string
 *   icon        - Emoji icon or placeholder
 *   onSelect    - Optional selection callback
 */
export default function ProductCard({
  id,
  name,
  description,
  price,
  category = 'Hardware',
  icon = '📦',
  onSelect,
}) {
  const [selected, setSelected] = useState(false);

  const handleAction = () => {
    setSelected((prev) => !prev);
    onSelect?.({ id, name, price, selected: !selected });
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <article className={styles.card} aria-labelledby={`product-title-${id}`}>
      <div className={styles.imageContainer}>
        <span aria-hidden="true">{icon}</span>
        <span className={styles.categoryBadge}>{category}</span>
      </div>

      <div className={styles.content}>
        <h3 id={`product-title-${id}`} className={styles.title}>
          {name}
        </h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>{formattedPrice}</span>
          <button
            type="button"
            className={`${styles.button} ${selected ? styles.buttonSelected : ''}`}
            onClick={handleAction}
            aria-pressed={selected}
          >
            {selected ? '✓ Selected' : 'View / Select'}
          </button>
        </div>
      </div>
    </article>
  );
}
