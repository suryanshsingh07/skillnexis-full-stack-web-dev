import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Calendar, MapPin, CreditCard, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatPrice, formatDate } from '../utils/formatters';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get('/orders/myorders');
        if (res.data.success) {
          setOrders(res.data.orders || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to retrieve your order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Retrieving your orders..." />;
  }

  const getStatusBadge = (status) => {
    const map = {
      pending: { label: 'Pending Payment', cls: 'badge-low-stock' },
      processing: { label: 'Processing', cls: 'badge-primary' },
      shipped: { label: 'Dispatched & In Transit', cls: 'badge-primary' },
      delivered: { label: 'Delivered', cls: 'badge-in-stock' },
      cancelled: { label: 'Cancelled', cls: 'badge-out-of-stock' }
    };
    const s = map[status] || { label: status, cls: 'badge-primary' };
    return <span className={`badge ${s.cls}`}>{s.label}</span>;
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
          My Order History
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Track past purchases, fulfillment states, and payment receipts.
        </p>
      </div>

      {error && (
        <div style={{ padding: '1rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 2rem',
            textAlign: 'center'
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
              margin: '0 auto 1.25rem',
              color: 'var(--primary)'
            }}
          >
            <Package size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Orders Placed Yet
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            When you complete a checkout on NexisStore, your orders and tracking records will appear right here.
          </p>
          <Link to="/products" className="btn btn-primary">
            <span>Browse Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Order Identifier
                  </div>
                  <div style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    #{order._id}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Placed On
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {formatDate(order.createdAt)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Total Amount
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {formatPrice(order.totalPrice)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.2rem' }}>
                    Status
                  </div>
                  {getStatusBadge(order.orderStatus)}
                </div>
              </div>

              {/* Order Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', margin: '1rem 0' }}>
                {order.orderItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Quantity: {item.quantity} · {formatPrice(item.price)} each
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer details */}
              <div
                style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <div>
                  Shipped to: <strong>{order.shippingAddress.fullName}</strong> ({order.shippingAddress.city}, {order.shippingAddress.state})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Payment:</span>
                  <span className="badge badge-in-stock" style={{ textTransform: 'capitalize' }}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
