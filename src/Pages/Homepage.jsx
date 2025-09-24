import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssStyles/homePage.css';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCardClick = () => {
    navigate('/signIn');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <h2>LeasePro</h2>
          </Link>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              About
            </Link>
            <Link to="/faq" className="nav-link" onClick={closeMenu}>
              FAQ
            </Link>
            <Link to="/signIn" className="nav-link" onClick={closeMenu}>
              Sign In
            </Link>
            <Link to="/signUpLender" className="nav-link nav-signup" onClick={closeMenu}>
              Sign Up
            </Link>
          </div>

          <div className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div className={`mobile-side-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button className="close-menu-btn" onClick={closeMenu}>
              ×
            </button>
          </div>
          
          <div className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
              <span className="mobile-nav-icon">🏠</span>
              <span className="mobile-nav-text">Home</span>
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={closeMenu}>
              <span className="mobile-nav-icon">ℹ️</span>
              <span className="mobile-nav-text">About</span>
            </Link>
            <Link to="/faq" className="mobile-nav-link" onClick={closeMenu}>
              <span className="mobile-nav-icon">❓</span>
              <span className="mobile-nav-text">FAQ</span>
            </Link>
            <Link to="/signIn" className="mobile-nav-link" onClick={closeMenu}>
              <span className="mobile-nav-icon">🔑</span>
              <span className="mobile-nav-text">Sign In</span>
            </Link>
            <Link to="/signUpLender" className="mobile-nav-link nav-signup-mobile" onClick={closeMenu}>
              <span className="mobile-nav-icon">📝</span>
              <span className="mobile-nav-text">Sign Up</span>
            </Link>
          </div>
        </div>
        
        {/* Overlay to close menu when clicking outside */}
        <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to LeasePro
            </h1>
            <p className="hero-subtitle">
              Discover amazing lands and equipment for your leasing needs
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Available Listings</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Equipment Items</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">₦1.2M</span>
                <span className="stat-label">Potential Savings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <h2 className="section-title">
            What would you like to browse today?
          </h2>
          
          <div className="cards-grid">
            {/* Browse Lands Card */}
            <div className="management-card lands-card" onClick={handleCardClick}>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                  <path d="M2 17L12 22L22 17"/>
                  <path d="M2 12L12 17L22 12"/>
                </svg>
              </div>
              <h3 className="card-title">Browse Lands</h3>
              <p className="card-description">
                Explore available lands for lease. Find the perfect property for your needs.
                Sign in to access all features.
              </p>
              <div className="card-stats">
                <span className="card-stat">Premium Listings</span>
                <span className="card-stat">Verified Owners</span>
              </div>
              <button className="card-action-btn">
                Browse Lands
              </button>
            </div>

            {/* Browse Equipment Card */}
            <div className="management-card equipment-card" onClick={handleCardClick}>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 20V14C10 13.4696 10.2107 12.9609 10.5858 12.5858C10.9609 12.2107 11.4696 12 12 12C12.5304 12 13.0391 12.2107 13.4142 12.5858C13.7893 12.9609 14 13.4696 14 14V20"/>
                  <path d="M18 20V14C18 12.1435 17.2625 10.363 15.9497 9.05025C14.637 7.7375 12.8565 7 11 7C9.14348 7 7.36301 7.7375 6.05025 9.05025C4.7375 10.363 4 12.1435 4 14V20"/>
                  <rect x="2" y="20" width="20" height="2"/>
                </svg>
              </div>
              <h3 className="card-title">Browse Equipment</h3>
              <p className="card-description">
                Discover available equipment for rent. Find tools and machinery for your projects.
                Sign in to get started.
              </p>
              <div className="card-stats">
                <span className="card-stat">Quality Tools</span>
                <span className="card-stat">Daily Rates</span>
              </div>
              <button className="card-action-btn">
                Browse Equipment
              </button>
            </div>

            {/* List Property Card */}
            <div className="management-card list-card" onClick={handleCardClick}>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5V19M5 12H19"/>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                </svg>
              </div>
              <h3 className="card-title">List Your Property</h3>
              <p className="card-description">
                Add your property or equipment to our platform. Start earning from your assets today.
                Sign in to list.
              </p>
              <div className="card-stats">
                <span className="card-stat">Easy Listing</span>
                <span className="card-stat">Quick Setup</span>
              </div>
              <button className="card-action-btn">List Now</button>
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
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/faq">FAQ</Link>
            </div>
            <div className="footer-section">
              <h5>Contact</h5>
              <p>support@leasepro.com</p>
              <p>+234 800 000 0000</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 LeasePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;