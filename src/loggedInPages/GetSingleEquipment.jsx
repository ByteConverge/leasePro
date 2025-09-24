import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../cssStyles/getSingleEquipment.css';

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchEquipmentDetails();
    }
  }, [id]);

  const fetchEquipmentDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log(`🌐 Fetching equipment details from: GET https://backend-lease.onrender.com/api/equipment/${id}`);
      
      const response = await fetch(`https://backend-lease.onrender.com/api/equipment/${id}`);
      
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response OK:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch equipment details`);
      }

      const data = await response.json();
      console.log('✅ Equipment details received:', data);
      
      setEquipment(data);
      
    } catch (err) {
      console.error('❌ Error fetching equipment details:', err);
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

  const formatRentalPeriod = (period) => {
    const periods = {
      'hourly': 'Hourly',
      'daily': 'Daily',
      'weekly': 'Weekly',
      'monthly': 'Monthly'
    };
    return periods[period] || period;
  };

  const formatCondition = (condition) => {
    const conditions = {
      'excellent': 'Excellent',
      'good': 'Good',
      'fair': 'Fair',
      'poor': 'Poor'
    };
    return conditions[condition] || condition;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleContactOwner = () => {
    if (equipment?.owner) {
      const subject = `Inquiry about ${equipment.name}`;
      const body = `Hello ${equipment.owner.name},\n\nI am interested in your equipment "${equipment.name}" (${equipment.brand} ${equipment.model}).\n\nPlease provide more information about availability and rental terms.\n\nThank you.`;
      
      window.open(`mailto:${equipment.owner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
  };

  const handleCallOwner = () => {
    if (equipment?.owner?.phone) {
      window.open(`tel:${equipment.owner.phone}`, '_self');
    }
  };

  if (loading) {
    return (
      <div className="equipment-details-container">
        <div className="equipment-details-header">
          <button className="back-btn" onClick={() => navigate('/equipment')}>
            ← Back to Equipment
          </button>
          <h1>Equipment Details</h1>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading equipment details...</p>
        </div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="equipment-details-container">
        <div className="equipment-details-header">
          <button className="back-btn" onClick={() => navigate('/equipment')}>
            ← Back to Equipment
          </button>
          <h1>Equipment Details</h1>
        </div>
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Equipment Details</h3>
          <p>{error || 'Equipment not found'}</p>
          <button className="retry-btn" onClick={fetchEquipmentDetails}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="equipment-details-container">
      <div className="equipment-details-header">
        <button className="back-btn" onClick={() => navigate('/equipment')}>
          ← Back to Equipment
        </button>
        <div className="header-content">
          <h1>{equipment.name}</h1>
          <p>{equipment.brand} {equipment.model} • {equipment.location.area}, {equipment.location.lga}</p>
        </div>
      </div>

      <div className="equipment-details-content">
        {/* Image Gallery */}
        <div className="equipment-gallery">
          {equipment.images && equipment.images.length > 0 ? (
            <>
              <div className="main-image">
                <img 
                  src={equipment.images[activeImageIndex].url} 
                  alt={equipment.name}
                />
              </div>
              {equipment.images.length > 1 && (
                <div className="image-thumbnails">
                  {equipment.images.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={image.url} alt={`${equipment.name} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-image-placeholder">
              <span>⚙️</span>
              <p>No images available</p>
            </div>
          )}
        </div>

        {/* Equipment Details */}
        <div className="equipment-info">
          <div className="price-section">
            <h2>{formatPrice(equipment.price)}/{formatRentalPeriod(equipment.rentalPeriod)}</h2>
            <div className="badges-container">
              <span className="category-badge">
                {equipment.category}
              </span>
              <span className={`availability-badge ${equipment.isAvailable ? 'available' : 'rented'}`}>
                {equipment.isAvailable ? 'Available' : 'Currently Rented'}
              </span>
            </div>
          </div>

          <div className="details-section">
            <h3>Equipment Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Brand</span>
                <span className="detail-value">{equipment.brand}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Model</span>
                <span className="detail-value">{equipment.model}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Year</span>
                <span className="detail-value">{equipment.year}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Condition</span>
                <span className="detail-value">{formatCondition(equipment.condition)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Rental Period</span>
                <span className="detail-value">{formatRentalPeriod(equipment.rentalPeriod)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value">{equipment.location.area}, {equipment.location.lga}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Listed On</span>
                <span className="detail-value">{formatDate(equipment.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="description-section">
            <h3>Description</h3>
            <p>{equipment.description}</p>
          </div>

          {/* Owner Information */}
          {equipment.owner && (
            <div className="owner-section">
              <h3>Equipment Owner</h3>
              <div className="owner-info">
                <div className="owner-avatar">
                  {equipment.owner.name.charAt(0).toUpperCase()}
                </div>
                <div className="owner-details">
                  <h4>{equipment.owner.name}</h4>
                  <p className="owner-email">{equipment.owner.email}</p>
                  {equipment.owner.phone && (
                    <p className="owner-phone">{equipment.owner.phone}</p>
                  )}
                </div>
              </div>
              <div className="owner-contact-buttons">
                <button className="contact-btn email-btn" onClick={handleContactOwner}>
                  <span className="btn-icon">✉️</span>
                  Send Email
                </button>
                {equipment.owner.phone && (
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
              className={`primary-btn ${!equipment.isAvailable ? 'disabled' : ''}`}
              disabled={!equipment.isAvailable}
            >
              {equipment.isAvailable ? 'Rent Equipment' : 'Currently Rented'}
            </button>
            <button className="secondary-btn" onClick={() => navigate('/equipment')}>
              Browse Other Equipment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;