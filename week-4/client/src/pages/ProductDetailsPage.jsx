import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, getStockStatus } from '../utils/formatters';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError('');
        setQuantity(1);

        const res = await api.get(`/products/${id}`);
        if (res.data.success && res.data.product) {
          const currentProd = res.data.product;
          setProduct(currentProd);

          // Fetch related products in the same category
          try {
            const relRes = await api.get(`/products?category=${currentProd.category}&limit=4`);
            if (relRes.data.success) {
              setRelatedProducts(
                (relRes.data.products || []).filter((p) => p._id !== currentProd._id).slice(0, 3)
              );
            }
          } catch {
            // Non-critical
          }
        }
      } catch (err) {
        setError(err.message || 'Product not found or unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner text="Fetching product details..." />;
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <AlertCircle size={48} color="var(--danger)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Product Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error || 'The requested product is no longer available.'}</p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const stockInfo = getStockStatus(product.stock);

  const handleAddToCart = () => {
    if (stockInfo.available) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (stockInfo.available) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Breadcrumb / Back Navigation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Main Product Layout */}
      <div className="product-detail-layout">
        {/* Left Column: Image Showcase */}
        <div className="detail-gallery">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="detail-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Right Column: Information & Purchase Controls */}
        <div className="detail-info">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em' }}>
                {product.brand} · {product.category}
              </span>
              <span className={`badge badge-${stockInfo.type}`}>{stockInfo.label}</span>
            </div>

            <h1 className="detail-title">{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--warning)' }}>
                <Star size={16} fill="#f59e0b" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{product.rating?.toFixed(1) || '4.5'}</span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>·</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {product.numReviews || 0} Customer Reviews
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="detail-price-box">
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                Special Price (Incl. All Taxes)
              </span>
              <div className="detail-price">{formatPrice(product.price)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
                Available Stock: {product.stock} units
              </span>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Overview</h3>
            <p className="detail-description">{product.description}</p>
          </div>

          {/* Actions & Stepper */}
          {stockInfo.available ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Quantity:</span>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--bg-card)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <button
                    className="btn-icon"
                    style={{ width: '30px', height: '30px' }}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 700 }}>
                    {quantity}
                  </span>
                  <button
                    className="btn-icon"
                    style={{ width: '30px', height: '30px' }}
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  className="btn btn-secondary"
                  onClick={handleAddToCart}
                  style={{ padding: '0.9rem 1.5rem', fontSize: '1rem' }}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleBuyNow}
                  style={{ padding: '0.9rem 1.5rem', fontSize: '1rem' }}
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '1rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
              This item is currently sold out. Check back soon for stock replenishment.
            </div>
          )}

          {/* Guarantees Box */}
          <div
            style={{
              padding: '1.25rem',
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginTop: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Truck size={16} color="var(--primary)" />
              <span>Free standard delivery on orders above ₹999</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--success)" />
              <span>100% Guaranteed authentic & certified genuine</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <RotateCcw size={16} color="var(--warning)" />
              <span>14-day hassle-free replacement policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Similar Items in {product.category.toUpperCase()}
          </h2>
          <div className="product-grid">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
