import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck, MapPin, Calendar, CreditCard, ShieldCheck } from 'lucide-react';
import { formatPrice, formatDate } from '../utils/formatters';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/orders/${id}`);
        if (res.data.success && res.data.order) {
          setOrder(res.data.order);
        }
      } catch (err) {
        setError(err.message || 'Unable to retrieve order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <LoadingSpinner text="Retrieving confirmed order receipt..." />;
  }

  if (error || !order) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <h2>Order Confirmation Notice</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>{error || 'Order record not found.'}</p>
        <Link to="/orders" className="btn btn-primary">
          View My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '860px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            background: 'var(--success-bg)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: 'var(--success)'
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--success)', fontWeight: 700, letterSpacing: '0.08em' }}>
          Payment & Order Confirmed
        </span>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem', marginBottom: '0.5rem' }}>
          Thank You For Your Order!
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
          Your order has been authorized and dispatched to our logistics team. We will send updates as your package moves.
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-input)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
          <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{order._id}</span>
        </div>
      </div>

      {/* Order Summary Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            <MapPin size={18} color="var(--primary)" />
            <span>Delivery Destination</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{order.shippingAddress.fullName}</div>
            <div>{order.shippingAddress.street}</div>
            <div>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</div>
            <div>Phone: {order.shippingAddress.phone}</div>
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            <CreditCard size={18} color="var(--primary)" />
            <span>Payment & Status</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <div>Method: <strong style={{ textTransform: 'capitalize', color: 'var(--text-primary)' }}>{order.paymentMethod.replace('_', ' ')}</strong></div>
            <div>Payment: <span className="badge badge-in-stock" style={{ textTransform: 'capitalize' }}>{order.paymentStatus}</span></div>
            <div>Fulfillment: <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>{order.orderStatus}</span></div>
            <div>Placed: {formatDate(order.createdAt)}</div>
          </div>
        </div>
      </div>

      {/* Ordered Items List */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          marginBottom: '2rem'
        }}
      >
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Package size={18} color="var(--primary)" />
          <span>Items Ordered ({order.orderItems.length})</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
          {order.orderItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Qty: {item.quantity} × {formatPrice(item.price)}
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: '1.25rem', maxWidth: '300px', marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>Subtotal:</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatPrice(order.subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>Shipping:</span>
            <span style={{ fontWeight: 600, color: order.shippingPrice === 0 ? 'var(--success)' : 'var(--text-primary)' }}>
              {order.shippingPrice === 0 ? 'FREE' : formatPrice(order.shippingPrice)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>Tax (GST 5%):</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatPrice(order.taxPrice)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem' }}>
            <span>Final Paid:</span>
            <span className="gradient-text">{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Next Step Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/orders" className="btn btn-secondary">
          <Package size={16} />
          <span>View All Orders</span>
        </Link>
        <Link to="/products" className="btn btn-primary">
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
