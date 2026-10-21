import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useCart();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Nexis',
    category: 'electronics',
    price: '',
    stock: '',
    imageUrl: '',
    description: '',
    rating: '4.5',
    isFeatured: false
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/products/${id}`);
          if (res.data.success && res.data.product) {
            const p = res.data.product;
            setFormData({
              name: p.name || '',
              brand: p.brand || 'Nexis',
              category: p.category || 'electronics',
              price: p.price ?? '',
              stock: p.stock ?? '',
              imageUrl: p.imageUrl || '',
              description: p.description || '',
              rating: p.rating ?? '4.5',
              isFeatured: Boolean(p.isFeatured)
            });
          }
        } catch (err) {
          setError(err.message || 'Unable to load product for editing');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    const { name, category, price, stock, imageUrl, description } = formData;
    if (!name.trim()) {
      setError('Product title is required.');
      return;
    }
    if (isNaN(Number(price)) || Number(price) < 0) {
      setError('Please provide a valid non-negative price.');
      return;
    }
    if (isNaN(Number(stock)) || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
      setError('Please provide a valid whole non-negative stock count.');
      return;
    }
    if (!imageUrl.trim()) {
      setError('Image URL is required.');
      return;
    }
    if (!description.trim()) {
      setError('Product description is required.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating)
      };

      if (isEditing) {
        await api.put(`/products/${id}`, payload);
        showToast('Product updated successfully', 'success');
      } else {
        await api.post('/products', payload);
        showToast('Product created successfully', 'success');
      }

      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading product data..." />;
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: '820px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
          <ArrowLeft size={16} />
          <span>Back to Admin Portal</span>
        </Link>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
          {isEditing ? 'Edit Catalog Product' : 'Add New Product'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {isEditing ? 'Update specifications, pricing, and stock levels.' : 'Publish a new item to the customer catalog.'}
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
            gap: '0.6rem'
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}
        >
          <div className="form-group">
            <label className="form-label" htmlFor="name">Product Title</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              placeholder="e.g. Aura Studio Noise-Cancelling Headphones"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="brand">Brand</label>
              <input
                id="brand"
                name="brand"
                type="text"
                className="form-input"
                placeholder="e.g. AuraSound"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="electronics">Electronics & Audio</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="home">Home & Workspace</option>
                <option value="accessories">Lifestyle Accessories</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="price">Price (₹ INR)</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                className="form-input"
                placeholder="e.g. 18999"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="stock">Available Stock</label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                className="form-input"
                placeholder="e.g. 25"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rating">Rating (0 - 5)</label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="form-input"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="imageUrl">Product Image URL</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              className="form-input"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          {/* Live Image Preview */}
          {formData.imageUrl && (
            <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <img
                src={formData.imageUrl}
                alt="Preview"
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop&q=80';
                }}
              />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Image preview verified</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="description">Full Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="form-textarea"
              placeholder="Provide a comprehensive product overview, features, and specs..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <input
              id="isFeatured"
              name="isFeatured"
              type="checkbox"
              checked={formData.isFeatured}
              onChange={handleChange}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="isFeatured" style={{ fontSize: '0.95rem', cursor: 'pointer', fontWeight: 600 }}>
              Feature this product on homepage collections
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <Link to="/admin" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : isEditing ? 'Update Product' : 'Publish Product'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
