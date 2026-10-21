import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import api from '../services/api';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, cartCount, subtotal, shippingFee, tax, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || '',
    phone: '',
    paymentMethod: 'demo_card'
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side address validation
    const { fullName, street, city, state, postalCode, phone, paymentMethod } = formData;
    if (!fullName.trim() || !street.trim() || !city.trim() || !state.trim() || !postalCode.trim() || !phone.trim()) {
      setError('Please fill in all required shipping address fields.');
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        orderItems: cartItems.map((item) => ({
          product: item.product,
          quantity: item.quantity
        })),
        shippingAddress: {
          fullName: fullName.trim(),
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          postalCode: postalCode.trim(),
          phone: phone.trim(),
          country: 'India'
        },
        paymentMethod
      };

      const res = await api.post('/orders', payload);

      if (res.data.success && res.data.order) {
        clearCart();
        navigate(`/order-success/${res.data.order._id}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please review your cart.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
          <ArrowLeft size={16} />
          <span>Return to Cart</span>
        </Link>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
          Secure Checkout
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Please verify your shipping details and select your preferred payment option.
        </p>
      </div>

      {error && (
        <div
          style={{
            padding: '1rem',
            background: 'var(--danger-bg)',
            color: 'var(--danger)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder}>
        <div className="cart-layout">
          {/* Left Column: Shipping & Payment Forms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Step 1: Shipping Address */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem'
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Truck size={20} color="var(--primary)" />
                <span>1. Shipping Address</span>
              </h2>

              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name / Recipient</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Suryansh Singh"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="street">Street Address & Landmark</label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 42 Gomti Nagar, Near Riverside Mall"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Lucknow"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Uttar Pradesh"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="postalCode">PIN / Postal Code</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    className="form-input"
                    placeholder="e.g. 226010"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem'
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CreditCard size={20} color="var(--primary)" />
                <span>2. Payment Option</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                All transactions are verified server-side with zero exposure of mock secrets.
              </p>

              <div className="payment-methods-grid">
                <div
                  className={`payment-card ${formData.paymentMethod === 'demo_card' ? 'selected' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'demo_card' }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                      <CreditCard size={18} color="var(--primary)" />
                      <span>Demo Instant Payment</span>
                    </div>
                    {formData.paymentMethod === 'demo_card' && <CheckCircle2 size={16} color="var(--primary)" />}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Simulated card / UPI payment with instant order clearance.
                  </span>
                </div>

                <div
                  className={`payment-card ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                      <Truck size={18} color="var(--warning)" />
                      <span>Cash on Delivery</span>
                    </div>
                    {formData.paymentMethod === 'cod' && <CheckCircle2 size={16} color="var(--primary)" />}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Pay with cash or UPI upon delivery at your doorstep.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Submit */}
          <div className="order-summary-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Review Items ({cartCount})
            </h3>

            {/* Cart Preview list */}
            <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '0.5rem' }}>
              {cartItems.map((item) => (
                <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatPrice(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span style={{ fontWeight: 600, color: shippingFee === 0 ? 'var(--success)' : 'var(--text-primary)' }}>
                {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
              </span>
            </div>

            <div className="summary-row">
              <span>GST (5%)</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatPrice(tax)}</span>
            </div>

            <div className="summary-row total">
              <span>Grand Total</span>
              <span className="gradient-text">{formatPrice(total)}</span>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
                disabled={submitting}
              >
                {submitting ? (
                  <span>Authorizing Order...</span>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Confirm & Place Order</span>
                  </>
                )}
              </button>
            </div>

            <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} color="var(--success)" />
              <span>Prices and stock authoritative verification by MongoDB</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
