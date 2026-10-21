import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, ShoppingCart, DollarSign, CheckCircle2, Clock, Trash2, Edit, AlertTriangle, ShieldCheck, Star } from 'lucide-react';
import { formatPrice, formatDate } from '../utils/formatters';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const AdminDashboardPage = () => {
  const { showToast } = useCart();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'

  // Products state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Delete modal state
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await api.get('/products?limit=100');
      if (res.data.success) {
        setProducts(res.data.products || []);
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch product inventory', 'error');
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await api.get('/orders?limit=100');
      if (res.data.success) {
        setOrders(res.data.orders || []);
        setAnalytics(res.data.analytics || null);
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch customer orders', 'error');
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      setDeleting(true);
      const res = await api.delete(`/products/${productToDelete._id}`);
      if (res.data.success) {
        showToast('Product deleted successfully', 'success');
        setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
        setProductToDelete(null);
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete product', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await api.put(`/orders/${orderId}/status`, { status: newStatus });
      if (res.data.success) {
        showToast(`Order status updated to "${newStatus}"`, 'success');
        setOrders((prev) =>
          prev.map((ord) => (ord._id === orderId ? { ...ord, orderStatus: newStatus } : ord))
        );
        // Refresh analytics
        fetchOrders();
      }
    } catch (err) {
      showToast(err.message || 'Failed to update order status', 'error');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Dashboard Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-primary">Admin Control Center</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Store Management Portal
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Authoritative inventory CRUD, live order processing, and executive financial metrics.
          </p>
        </div>

        <Link to="/admin/products/new" className="btn btn-primary">
          <Plus size={18} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Paid Revenue
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
              {formatPrice(analytics?.totalRevenue || 0)}
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <ShoppingCart size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Total Orders
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
              {analytics?.totalOrders || orders.length}
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Pending Fulfillment
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
              {analytics?.pendingCount || 0}
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <Package size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Catalog Products
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
              {products.length}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Product Catalog ({products.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Customer Orders ({orders.length})
        </button>
      </div>

      {/* Tab 1: Products Management */}
      {activeTab === 'products' && (
        <div>
          {loadingProducts ? (
            <LoadingSpinner text="Loading product inventory..." />
          ) : (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th>Featured</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)' }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{p.category}</td>
                      <td style={{ fontWeight: 700 }}>{formatPrice(p.price)}</td>
                      <td>
                        <span className={`badge ${p.stock > 5 ? 'badge-in-stock' : p.stock > 0 ? 'badge-low-stock' : 'badge-out-of-stock'}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          <span>{p.rating?.toFixed(1) || '4.5'}</span>
                        </span>
                      </td>
                      <td>
                        {p.isFeatured ? (
                          <span className="badge badge-primary">Yes</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <Link
                            to={`/admin/products/${p._id}/edit`}
                            className="btn-icon"
                            style={{ width: '32px', height: '32px' }}
                            title="Edit Product"
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            className="btn-icon"
                            style={{ width: '32px', height: '32px', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                            onClick={() => setProductToDelete(p)}
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Orders Fulfillment Management */}
      {activeTab === 'orders' && (
        <div>
          {loadingOrders ? (
            <LoadingSpinner text="Loading orders..." />
          ) : (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                        #{o._id.substring(o._id.length - 8)}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{o.user?.name || o.shippingAddress?.fullName || 'Customer'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.user?.email || 'N/A'}</div>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {formatDate(o.createdAt)}
                      </td>
                      <td style={{ fontWeight: 700 }}>{formatPrice(o.totalPrice)}</td>
                      <td>
                        <span className="badge badge-in-stock" style={{ textTransform: 'capitalize' }}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.85rem', width: 'auto' }}
                          value={o.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Product Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!productToDelete}
        title="Confirm Product Deletion"
        message={`Are you sure you want to permanently delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        confirmVariant="danger"
        loading={deleting}
        onConfirm={handleDeleteProduct}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
};

export default AdminDashboardPage;
