import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto auto',
        gap: '1.25rem',
        alignItems: 'center',
        padding: '1.25rem 0',
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-input)'
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop&q=80';
        }}
      />

      <div>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
          {item.brand}
        </div>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          {item.name}
        </h4>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {formatPrice(item.price)} each
        </div>
      </div>

      {/* Quantity Stepper */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--bg-input)',
          padding: '0.25rem 0.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}
      >
        <button
          className="btn-icon"
          style={{ width: '28px', height: '28px' }}
          onClick={() => updateQuantity(item.product, item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
          {item.quantity}
        </span>
        <button
          className="btn-icon"
          style={{ width: '28px', height: '28px' }}
          onClick={() => updateQuantity(item.product, item.quantity + 1)}
          disabled={item.quantity >= item.stock}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Item Total & Remove */}
      <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', minWidth: '90px' }}>
          {formatPrice(item.price * item.quantity)}
        </div>
        <button
          className="btn-icon"
          style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
          onClick={() => removeFromCart(item.product)}
          aria-label={`Remove ${item.name} from cart`}
          title="Remove item"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
