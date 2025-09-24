import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../cssStyles/loggedInOwner.css';

const LoggedInOwner = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showListModal, setShowListModal] = useState(false);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('🔐 Fetching user profile with token:', token.substring(0, 20) + '...');
        console.log('🌐 API Endpoint: GET https://backend-lease.onrender.com/api/auth/me');

        const response = await fetch('https://backend-lease.onrender.com/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('📥 Response Status:', response.status);
        console.log('📥 Response OK:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('✅ User profile data received:', data);
        console.log('👤 User role:', data.role);

        setUserData(data);
        
      } catch (err) {
        console.error('❌ Error fetching user profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    console.log('🚪 User logged out, localStorage cleared');
    window.location.href = '/';
  };
   const handleLogIn = () => {
  
    window.location.href = '/signIn';
  };

  const handleListCardClick = () => {
    setShowListModal(true);
  };

  const closeListModal = () => {
    setShowListModal(false);
  };

  // Check if user is leaser (hide list card for leasers)
  const isLeaser = userData?.role === 'leaser';
  console.log('🔍 User is leaser:', isLeaser);

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Loading your dashboard...</h2>
        <p>Please wait while we fetch your information</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
        <button 
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
        <button 
          className="logout-btn-error"
          onClick={handleLogIn}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="loggedin-owner">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>LeasePro</h2>
          </div>

          <div className="nav-menu">
            <div className="nav-links">
              <a href="#profile" className="nav-link">Profile</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#faq" className="nav-link">FAQ</a>
            </div>
            
            <div className="nav-user">
              <div className="user-info">
                <span className="user-name">{userData?.name || 'User'}</span>
                <span className="user-role">{userData?.role || 'User'}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="nav-hamburger">
            <button 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <h3>Menu</h3>
              <button className="close-menu-btn" onClick={closeMenu}>
                ×
              </button>
            </div>
            
            <div className="mobile-nav-links">
              <a href="#profile" className="mobile-nav-link" onClick={closeMenu}>
                <span className="mobile-nav-icon">👤</span>
                <span className="mobile-nav-text">Profile</span>
              </a>
              <a href="#about" className="mobile-nav-link" onClick={closeMenu}>
                <span className="mobile-nav-icon">ℹ️</span>
                <span className="mobile-nav-text">About</span>
              </a>
              <a href="#faq" className="mobile-nav-link" onClick={closeMenu}>
                <span className="mobile-nav-icon">❓</span>
                <span className="mobile-nav-text">FAQ</span>
              </a>
            </div>
            
            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <div className="mobile-user-avatar">
                  {userData?.name?.charAt(0) || 'U'}
                </div>
                <div className="mobile-user-details">
                  <span className="mobile-user-name">{userData?.name || 'User'}</span>
                  <span className="mobile-user-role">{userData?.role || 'User'}</span>
                </div>
              </div>
              <button className="mobile-logout-btn" onClick={() => { handleLogout(); closeMenu(); }}>
                <span className="mobile-logout-icon">🚪</span>
                <span className="mobile-logout-text">Logout</span>
              </button>
            </div>
          </div>
          
          {/* Overlay to close menu when clicking outside */}
          <div className="mobile-menu-overlay" onClick={closeMenu}></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome Back, {userData?.name || 'User'}!
            </h1>
            <p className="hero-subtitle">
              {isLeaser 
                ? 'Browse available lands and equipment for your leasing needs.' 
                : 'Manage your properties and equipment with ease. Everything you need is right here.'
              }
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{isLeaser ? '' : ''}</span>
                <span className="stat-label">
                  {isLeaser ? '' : ''}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{isLeaser ? '' : ''}</span>
                <span className="stat-label">
                  {isLeaser ? '' : (userData?.role === '' ? '' : '')}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{isLeaser ? '' : ''}</span>
                <span className="stat-label">
                  {isLeaser ? '' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <h2 className="section-title">
            {isLeaser 
              ? 'What would you like to browse today?' 
              : 'What would you like to manage today?'
            }
          </h2>
          
          <div className="cards-grid">
            {/* View Lands Card */}
            <div className="management-card lands-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                  <path d="M2 17L12 22L22 17"/>
                  <path d="M2 12L12 17L22 12"/>
                </svg>
              </div>
              <h3 className="card-title">
                {isLeaser ? 'Browse Lands' : 'View Lands'}
              </h3>
              <p className="card-description">
                {isLeaser 
                  ? 'Explore available lands for lease. Find the perfect property for your needs.'
                  : 'Manage your land listings, view current leases, and add new properties.'
                }
              </p>
              <div className="card-stats">
                <span className="card-stat">
                  {isLeaser ? '' : ''}
                </span>
                <span className="card-stat">
                  {isLeaser ? '' : ''}
                </span>
              </div>
              <Link to="/lands">
               <button className="card-action-btn">
                {isLeaser ? 'Browse Lands' : 'View Lands'}
              </button>
              </Link>
             
            </div>

            {/* View Equipment Card */}
            <div className="management-card equipment-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 20V14C10 13.4696 10.2107 12.9609 10.5858 12.5858C10.9609 12.2107 11.4696 12 12 12C12.5304 12 13.0391 12.2107 13.4142 12.5858C13.7893 12.9609 14 13.4696 14 14V20"/>
                  <path d="M18 20V14C18 12.1435 17.2625 10.363 15.9497 9.05025C14.637 7.7375 12.8565 7 11 7C9.14348 7 7.36301 7.7375 6.05025 9.05025C4.7375 10.363 4 12.1435 4 14V20"/>
                  <rect x="2" y="20" width="20" height="2"/>
                </svg>
              </div>
              <h3 className="card-title">
                {isLeaser ? 'Browse Equipment' : 'View Equipment'}
              </h3>
              <p className="card-description">
                {isLeaser 
                  ? 'Discover available equipment for rent. Find tools and machinery for your projects.'
                  : 'Handle your equipment rentals, track usage, and manage maintenance schedules.'
                }
              </p>
              <div className="card-stats">
                <span className="card-stat">
                  {isLeaser ? '' : ''}
                </span>
                <span className="card-stat">
                  {isLeaser ? '' : ''}
                </span>
              </div>
              <Link to="/equipment">
 <button className="card-action-btn">
                {isLeaser ? 'Browse Equipment' : 'View Equipment'}
              </button>
              </Link>
             
            </div>

            {/* List Land or Equipment Card - Hidden for Leasers */}
            {!isLeaser && (
              <div className="management-card list-card" onClick={handleListCardClick}>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5V19M5 12H19"/>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                </div>
                <h3 className="card-title">List Land or Equipment</h3>
                <p className="card-description">
                  Add your property or equipment to our platform. Start earning from your assets today.
                </p>
                <div className="card-stats">
                  <span className="card-stat">Easy Listing</span>
                  <span className="card-stat">Quick Setup</span>
                </div>
                <button className="card-action-btn">List Now</button>
              </div>
            )}
          </div>

          {/* User Profile Info Section */}
          <div className="profile-info-section">
            <h3>Your Profile Information</h3>
            <div className="profile-details">
              <div className="profile-detail">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{userData?.name || 'N/A'}</span>
              </div>
              <div className="profile-detail">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{userData?.email || 'N/A'}</span>
              </div>
              <div className="profile-detail">
                <span className="detail-label">Role:</span>
                <span className="detail-value">{userData?.role || 'N/A'}</span>
              </div>
              <div className="profile-detail">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{userData?.phone || 'N/A'}</span>
              </div>
              {userData?.address && (
                <div className="profile-detail">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">
                    {userData.address.street}, {userData.address.area}, {userData.address.lga}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>LeasePro</h4>
              <p>Simplifying land and equipment leasing for modern businesses.</p>
            </div>
            <div className="footer-section">
              <h5>Quick Links</h5>
              <a href="#profile">Profile</a>
              <a href="#about">About</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-section">
              <h5>Contact</h5>
              <p>support@leasepro.com</p>
              <p>08101523947</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 LeasePro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* List Selection Modal - Only show for non-leasers */}
      {!isLeaser && showListModal && (
        <div className="modal-overlay list-modal-overlay" onClick={closeListModal}>
          <div className="list-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="list-modal-header">
              <h3>What would you like to list?</h3>
              <button className="close-modal-btn" onClick={closeListModal}>
                ×
              </button>
            </div>
            <div className="list-options">
              <Link to="/list-land" className="list-option land-option" onClick={closeListModal}>
                <div className="option-icon">🌱</div>
                <div className="option-content">
                  <h4>List Land</h4>
                  <p>Add agricultural or commercial land for lease</p>
                </div>
                <div className="option-arrow">→</div>
              </Link>
              
              <Link to="/list-equipment" className="list-option equipment-option" onClick={closeListModal}>
                <div className="option-icon">⚙️</div>
                <div className="option-content">
                  <h4>List Equipment</h4>
                  <p>Add machinery or tools for rental</p>
                </div>
                <div className="option-arrow">→</div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInOwner;