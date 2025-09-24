import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssStyles/getEquipment.css';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🌐 Fetching equipment from: GET https://backend-lease.onrender.com/api/equipment');
      
      const response = await fetch('https://backend-lease.onrender.com/api/equipment');
      
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response OK:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch equipment`);
      }

      const data = await response.json();
      console.log('✅ Equipment data received:', data);
      
      setEquipment(data.equipment || []);
      
    } catch (err) {
      console.error('❌ Error fetching equipment:', err);
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

  if (loading) {
    return (
      <div className="equipment-list-container">
        <div className="equipment-list-header">
          <button className="back-btn" onClick={() => navigate('/lenderLoggedInHome')}>
            ← Back to Dashboard
          </button>
          <h1>Available Equipment</h1>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading available equipment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="equipment-list-container">
        <div className="equipment-list-header">
          <button className="back-btn" onClick={() => navigate('/lenderLoggedInHome')}>
            ← Back to Dashboard
          </button>
          <h1>Available Equipment</h1>
        </div>
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Equipment</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchEquipment}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="equipment-list-container">
      <div className="equipment-list-header">
        <button className="back-btn" onClick={() => navigate('/lenderLoggedInHome')}>
          ← Back to Dashboard
        </button>
        <h1>Available Equipment</h1>
        <p>Browse through our collection of available equipment for rental</p>
      </div>

      <div className="equipment-stats">
        <div className="stat-card">
          <span className="stat-number">{equipment.length}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {equipment.filter(item => item.isAvailable).length}
          </span>
          <span className="stat-label">Available</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {[...new Set(equipment.map(item => item.category))].length}
          </span>
          <span className="stat-label">Categories</span>
        </div>
      </div>

      <div className="equipment-grid">
        {equipment.length === 0 ? (
          <div className="no-equipment">
            <div className="no-equipment-icon">⚙️</div>
            <h3>No Equipment Available</h3>
            <p>There are currently no equipment items listed for rental.</p>
          </div>
        ) : (
          equipment.map(item => (
            <div 
              key={item._id} 
              className="equipment-card"
              onClick={() => navigate(`/equipment/${item._id}`)}
            >
              <div className="equipment-card-image">
                {item.images && item.images.length > 0 ? (
                  <img 
                    src={item.images[0].url} 
                    alt={item.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="equipment-card-placeholder">
                    <span>⚙️</span>
                  </div>
                )}
              </div>
              
              <div className="equipment-card-content">
                <h3 className="equipment-card-title">{item.name}</h3>
                <p className="equipment-card-category">{item.category}</p>
                
                <div className="equipment-card-details">
                  <div className="detail-item">
                    <span className="detail-label">Brand:</span>
                    <span className="detail-value">{item.brand}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Model:</span>
                    <span className="detail-value">{item.model}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value price">{formatPrice(item.price)}/{formatRentalPeriod(item.rentalPeriod)}</span>
                  </div>
                </div>
                
                <div className="equipment-card-footer">
                  <button className="view-details-btn">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EquipmentList;