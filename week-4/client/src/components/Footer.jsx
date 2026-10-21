import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Value Proposition Banners */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '2.5rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="btn-icon" style={{ background: 'var(--primary-light)', borderColor: 'transparent', color: 'var(--primary)' }}>
              <Truck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Free Express Shipping</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>On all orders above ₹999</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="btn-icon" style={{ background: 'var(--success-bg)', borderColor: 'transparent', color: 'var(--success)' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>100% Authentic Products</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct from verified creators</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="btn-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', borderColor: 'transparent', color: '#ec4899' }}>
              <RefreshCw size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Hassle-Free Returns</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>14-day replacement guarantee</div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="brand-icon">
                <ShoppingBag size={18} />
              </div>
              <span>Nexis<span className="gradient-text">Store</span></span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
              SkillNexis Full Stack Web Development Internship Capstone Project. Built with React 19, Node.js, Express, and MongoDB Atlas.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Shop Catalog</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=electronics" className="footer-link">Electronics & Audio</Link></li>
              <li><Link to="/products?category=fashion" className="footer-link">Fashion & Apparel</Link></li>
              <li><Link to="/products?category=home" className="footer-link">Home & Workspace</Link></li>
              <li><Link to="/products?category=accessories" className="footer-link">Lifestyle Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Account & Orders</h4>
            <ul className="footer-links">
              <li><Link to="/profile" className="footer-link">My Profile</Link></li>
              <li><Link to="/orders" className="footer-link">Order History</Link></li>
              <li><Link to="/cart" className="footer-link">Shopping Cart</Link></li>
              <li><Link to="/login" className="footer-link">Customer Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Internship Info</h4>
            <ul className="footer-links">
              <li><span className="footer-link">Author: Suryansh Singh</span></li>
              <li><span className="footer-link">SkillNexis MERN Capstone</span></li>
              <li><span className="footer-link">Version: 1.0.0 Production</span></li>
              <li><span className="footer-link">Vercel & Render Hosted</span></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} NexisStore — SkillNexis Full Stack Web Development Capstone.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Crafted with</span>
            <Heart size={14} fill="#ec4899" color="#ec4899" />
            <span>by Suryansh Singh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
