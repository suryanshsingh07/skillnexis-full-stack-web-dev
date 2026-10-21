import React, { useState } from 'react';
import { User, Mail, MapPin, KeyRound, Shield, CheckCircle2, AlertCircle, Save, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatDate } from '../utils/formatters';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { showToast } = useCart();

  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || '',
    country: user?.address?.country || 'India'
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAddressChange = (e) => {
    const { name: fName, value } = e.target;
    setAddress((prev) => ({ ...prev, [fName]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Full name cannot be empty.' });
      return;
    }

    try {
      setSaving(true);
      await updateProfile({
        name: name.trim(),
        address
      });
      setMessage({ type: 'success', text: 'Profile and delivery address updated successfully!' });
      showToast('Profile updated successfully', 'success');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!passwords.currentPassword) {
      setMessage({ type: 'error', text: 'Please enter your current password.' });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    try {
      setSaving(true);
      await updateProfile({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      showToast('Password changed successfully', 'success');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to change password.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: '880px' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Account Settings
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage your personal profile, shipping addresses, and account security.
          </p>
        </div>

        <button
          className="btn btn-outline btn-sm"
          onClick={logout}
          style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {message.text && (
        <div
          style={{
            padding: '1rem',
            background: message.type === 'success' ? 'var(--success-bg)' : 'var(--danger-bg)',
            color: message.type === 'success' ? 'var(--success)' : 'var(--danger)',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* User Information Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        <div className="avatar-circle" style={{ width: '64px', height: '64px', fontSize: '1.75rem' }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{user?.name}</h2>
            {user?.role === 'admin' && (
              <span className="badge badge-primary">Administrator</span>
            )}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            {user?.email}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem' }}>
            Member since: {formatDate(user?.createdAt)}
          </div>
        </div>
      </div>

      {/* Edit Profile & Address Form */}
      <form onSubmit={handleProfileSubmit} style={{ marginBottom: '2.5rem' }}>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={20} color="var(--primary)" />
            <span>Profile & Default Shipping Details</span>
          </h2>

          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address (Read-Only)</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={user?.email || ''}
              disabled
              style={{ opacity: 0.7, cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="street">Street Address</label>
            <input
              id="street"
              name="street"
              type="text"
              className="form-input"
              placeholder="e.g. 42 Gomti Nagar"
              value={address.street}
              onChange={handleAddressChange}
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
                value={address.city}
                onChange={handleAddressChange}
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
                value={address.state}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="postalCode">Postal / PIN Code</label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                className="form-input"
                placeholder="e.g. 226010"
                value={address.postalCode}
                onChange={handleAddressChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                type="text"
                className="form-input"
                value={address.country}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>

      {/* Change Password Card */}
      <form onSubmit={handlePasswordSubmit}>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <KeyRound size={20} color="var(--primary)" />
            <span>Security & Password</span>
          </h2>

          <div className="form-group">
            <label className="form-label" htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords((p) => ({ ...p, currentPassword: e.target.value }))}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">New Password (Min. 6 chars)</label>
              <input
                id="newPassword"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={passwords.newPassword}
                onChange={(e) => setPasswords((p) => ({ ...p, newPassword: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                id="confirmNewPassword"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={passwords.confirmNewPassword}
                onChange={(e) => setPasswords((p) => ({ ...p, confirmNewPassword: e.target.value }))}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-secondary" disabled={saving}>
            <Shield size={16} />
            <span>Update Password</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
