import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { PackageX } from 'lucide-react';

const ProductGrid = ({ products, loading, emptyMessage = 'No products found matching your criteria.' }) => {
  if (loading) {
    return <LoadingSpinner text="Loading catalog..." />;
  }

  if (!products || products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          marginTop: '1.5rem'
        }}
      >
        <PackageX size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
        <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>No Items Found</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
