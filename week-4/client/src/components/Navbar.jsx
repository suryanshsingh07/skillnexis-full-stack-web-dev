import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, ShieldCheck, LogOut, Package, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="container navbar-inner">
        {/* Brand */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon">
            <ShoppingBag size={18} />
          </div>
          <span>Nexis<span className="gradient-text">Store</span></span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Catalog
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="/orders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                My Orders
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ color: '#818cf8' }}>
                Admin Portal
              </NavLink>
            </li>
          )}
        </ul>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Cart Icon */}
          <Link to="/cart" className="cart-button" aria-label={`Shopping cart with ${cartCount} items`}>
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* User Account / Dropdown */}
          {isAuthenticated ? (
            <div className="user-menu-wrapper">
              <button
                className="user-menu-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <div className="avatar-circle">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span>{user?.name?.split(' ')[0]}</span>
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu" onMouseLeave={() => setDropdownOpen(false)}>
                  <div style={{ padding: '0.65rem 1.25rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    {isAdmin && (
                      <span className="badge badge-primary" style={{ marginTop: '0.35rem' }}>
                        Admin
                      </span>
                    )}
                  </div>

                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/orders"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Package size={16} />
                    <span>Order History</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                      style={{ color: '#818cf8' }}
                    >
                      <ShieldCheck size={16} />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <div className="dropdown-divider"></div>

                  <button className="dropdown-item" onClick={handleLogout} style={{ color: 'var(--danger)' }}>
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="btn-icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none' }}
            id="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0' }}>
            Home
          </Link>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0' }}>
            Catalog
          </Link>
          {isAuthenticated && (
            <Link to="/orders" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0' }}>
              My Orders
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', color: '#818cf8' }}>
              Admin Portal
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
