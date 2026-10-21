import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Award, ShoppingBag, Star, RefreshCw } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import api from '../services/api';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await api.get('/products/featured');
        if (res.data.success) {
          setFeaturedProducts(res.data.products || []);
        }
      } catch (err) {
        setError(err.message || 'Unable to load featured products.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const categories = [
    {
      name: 'Electronics & Audio',
      slug: 'electronics',
      count: 'Flagship Gear',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Fashion & Apparel',
      slug: 'fashion',
      count: 'Tailored Essentials',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Home & Workspace',
      slug: 'home',
      count: 'Minimalist Living',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Lifestyle Accessories',
      slug: 'accessories',
      count: 'Daily Carry',
      image: 'https://images.unsplash.com/photo-1616353071855-2c045c4458ae?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Next-Gen MERN E-Commerce Experience</span>
          </div>

          <h1 className="hero-title">
            Curated Essentials for <br />
            <span className="gradient-text">Modern Living & Workspaces.</span>
          </h1>

          <p className="hero-subtitle">
            Experience lightning-fast browsing, verified stock, bank-grade authentication,
            and authoritative checkout backed by MongoDB Atlas and Express.js.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              <span>Explore Full Catalog</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/products?category=electronics" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              <Zap size={18} color="var(--primary)" />
              <span>Electronics Special</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section style={{ padding: '2rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="btn-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                <Zap size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Instant Express Delivery</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Free shipping on orders over ₹999</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="btn-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Authoritative Security</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>JWT + bcrypt encrypted transactions</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="btn-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>100% Certified Original</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Directly sourced from verified creators</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="btn-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
                <RefreshCw size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>14-Day Easy Returns</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Prompt replacement or refund</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.08em' }}>
                Editor's Choice
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                Featured Collections
              </h2>
            </div>
            <Link to="/products" className="btn btn-outline btn-sm">
              <span>View All Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {error && (
            <div style={{ padding: '1rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      {/* Explore by Categories */}
      <section style={{ padding: '3.5rem 0 5rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.08em' }}>
              Shop By Department
            </div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.35rem' }}>
              Explore Curated Categories
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0.5rem auto 0' }}>
              Handpicked designs and premium craftsmanship built to elevate your daily productivity and style.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.75rem',
                  textDecoration: 'none',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition)'
                }}
                className="category-card"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1,
                    filter: 'brightness(0.65)',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 14, 23, 0.95) 0%, rgba(10, 14, 23, 0.2) 60%)',
                    zIndex: 2
                  }}
                />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                    {cat.count}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: '0.25rem 0 0.5rem' }}>
                    {cat.name}
                  </h3>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span>Browse department</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & Internship CTA Banner */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '3.5rem 2rem',
              textAlign: 'center'
            }}
          >
            <div className="brand-icon" style={{ margin: '0 auto 1.25rem', width: '48px', height: '48px' }}>
              <ShoppingBag size={24} />
            </div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Ready to Upgrade Your Lifestyle?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
              Join thousands of customers who trust NexisStore for top-tier electronics, designer apparel, and workspace gear.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
                <span>Start Shopping Now</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/signup" className="btn btn-secondary" style={{ padding: '0.85rem 2rem' }}>
                <span>Create Free Account</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
