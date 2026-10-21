import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cartItems, cartCount, subtotal, shippingFee, tax, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 2rem'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              background: 'var(--primary-light)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--primary)'
            }}
          >
            <ShoppingBag size={32} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Looks like you haven't added anything to your cart yet. Explore our curated collections
            of premium tech, apparel, and workspace essentials.
          </p>

          <Link to="/products" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
            <span>Explore Catalog</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Title & Clear Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Shopping Cart
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart.
          </p>
        </div>

        <button
          className="btn btn-outline btn-sm"
          onClick={clearCart}
          style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
        >
          <Trash2 size={15} />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Cart Layout */}
      <div className="cart-layout">
        {/* Left Column: Cart Items List */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem 2rem'
          }}
        >
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Product Details</span>
            <span>Total</span>
          </div>

          <div>
            {cartItems.map((item) => (
              <CartItem key={item.product} item={item} />
            ))}
          </div>

          <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
              to="/products"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}
            >
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="order-summary-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Order Summary
          </h3>

          <div className="summary-row">
            <span>Subtotal ({cartCount} items)</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatPrice(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Delivery</span>
            <span style={{ fontWeight: 600, color: shippingFee === 0 ? 'var(--success)' : 'var(--text-primary)' }}>
              {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
            </span>
          </div>

          <div className="summary-row">
            <span>Applicable GST (5%)</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatPrice(tax)}</span>
          </div>

          <div className="summary-row total">
            <span>Order Total</span>
            <span className="gradient-text">{formatPrice(total)}</span>
          </div>

          {shippingFee > 0 && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', marginTop: '1rem' }}>
              Add ₹{999 - subtotal} more to qualify for <strong>FREE Delivery</strong>!
            </div>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              onClick={() => navigate('/checkout')}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--success)" />
              <span>Safe & Encrypted 256-bit SSL Checkout</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={16} color="var(--primary)" />
              <span>Real-time dispatch from certified hubs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
