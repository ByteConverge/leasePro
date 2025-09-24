import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../cssStyles/getSingleLand.css';

const GetSingleLand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchLandDetails();
    }
  }, [id]);

  const fetchLandDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log(`🌐 Fetching land details from: GET https://backend-lease.onrender.com/api/lands/${id}`);
      
      const response = await fetch(`https://backend-lease.onrender.com/api/lands/${id}`);
      
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response OK:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch land details`);
      }

      const data = await response.json();
      console.log('✅ Land details received:', data);
      
      setLand(data);
      
    } catch (err) {
      console.error('❌ Error fetching land details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleContactOwner = () => {
    if (land?.owner) {
      const subject = `Inquiry about ${land.title}`;
      const body = `Hello ${land.owner.name},\n\nI am interested in your land listed as "${land.title}" located in ${land.location.area}, ${land.location.lga}.\n\nPlease provide more information about availability and viewing.\n\nThank you.`;
      
      window.open(`mailto:${land.owner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
  };

  const handleCallOwner = () => {
    if (land?.owner?.phone) {
      window.open(`tel:${land.owner.phone}`, '_self');
    }
  };

  if (loading) {
    return (
      <div className="land-details-container">
        <div className="land-details-header">
          <button className="back-btn" onClick={() => navigate('/lands')}>
            ← Back to Lands
          </button>
          <h1>Land Details</h1>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading land details...</p>
        </div>
      </div>
    );
  }

  if (error || !land) {
    return (
      <div className="land-details-container">
        <div className="land-details-header">
          <button className="back-btn" onClick={() => navigate('/lands')}>
            ← Back to Lands
          </button>
          <h1>Land Details</h1>
        </div>
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Land Details</h3>
          <p>{error || 'Land not found'}</p>
          <button className="retry-btn" onClick={fetchLandDetails}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="land-details-container">
      <div className="land-details-header">
        <button className="back-btn" onClick={() => navigate('/lands')}>
          ← Back to Lands
        </button>
        <div className="header-content">
          <h1>{land.title}</h1>
          <p>{land.location.area}, {land.location.lga}</p>
        </div>
      </div>

      <div className="land-details-content">
        {/* Image Gallery */}
        <div className="land-gallery">
          {land.images && land.images.length > 0 ? (
            <>
              <div className="main-image">
                <img 
                  src={land.images[activeImageIndex].url} 
                  alt={land.title}
                />
              </div>
              {land.images.length > 1 && (
                <div className="image-thumbnails">
                  {land.images.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={image.url} alt={`${land.title} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-image-placeholder">
              <span>🌱</span>
              <p>No images available</p>
            </div>
          )}
        </div>

        {/* Land Details */}
        <div className="land-info">
          <div className="price-section">
            <h2>{formatPrice(land.price)}</h2>
            <div className="badges-container">
              <span className="lease-badge">
                {land.leaseDuration === 'long_term' ? 'Long Term Lease' : 'Short Term Lease'}
              </span>
              <span className={`availability-badge ${land.isAvailable ? 'available' : 'leased'}`}>
                {land.isAvailable ? 'Available' : 'Currently Leased'}
              </span>
            </div>
          </div>

          <div className="details-section">
            <h3>Property Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Size</span>
                <span className="detail-value">{land.size} acres</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value">{land.location.area}, {land.location.lga}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Listed On</span>
                <span className="detail-value">{formatDate(land.createdAt)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Lease Type</span>
                <span className="detail-value">
                  {land.leaseDuration === 'long_term' ? 'Long Term' : 'Short Term'}
                </span>
              </div>
            </div>
          </div>

          <div className="description-section">
            <h3>Description</h3>
            <p>{land.description}</p>
          </div>

          {land.amenities && land.amenities.length > 0 && (
            <div className="amenities-section">
              <h3>Amenities & Features</h3>
              <div className="amenities-grid">
                {land.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-tag">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Owner Information */}
          {land.owner && (
            <div className="owner-section">
              <h3>Property Owner</h3>
              <div className="owner-info">
                <div className="owner-avatar">
                  {land.owner.name.charAt(0).toUpperCase()}
                </div>
                <div className="owner-details">
                  <h4>{land.owner.name}</h4>
                  <p className="owner-email">{land.owner.email}</p>
                  {land.owner.phone && (
                    <p className="owner-phone">{land.owner.phone}</p>
                  )}
                </div>
              </div>
              <div className="owner-contact-buttons">
                <button className="contact-btn email-btn" onClick={handleContactOwner}>
                  <span className="btn-icon">✉️</span>
                  Send Email
                </button>
                {land.owner.phone && (
                  <button className="contact-btn call-btn" onClick={handleCallOwner}>
                    <span className="btn-icon">📞</span>
                    Call Owner
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="action-section">
            <button 
              className={`primary-btn ${!land.isAvailable ? 'disabled' : ''}`}
              disabled={!land.isAvailable}
            >
              {land.isAvailable ? 'Express Interest' : 'Currently Leased'}
            </button>
            <button className="secondary-btn" onClick={() => navigate('/lands')}>
              Browse Other Lands
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSingleLand;