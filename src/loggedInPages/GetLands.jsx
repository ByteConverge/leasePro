import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssStyles/getLands.css';

const GetLands = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🌐 Fetching lands from: GET https://backend-lease.onrender.com/api/lands');
      
      const response = await fetch('https://backend-lease.onrender.com/api/lands');
      
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response OK:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch lands`);
      }

      const data = await response.json();
      console.log('✅ Lands data received:', data);
      
      setLands(data.lands || []);
      
    } catch (err) {
      console.error('❌ Error fetching lands:', err);
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

  if (loading) {
    return (
      <div className="lands-list-container">
        <div className="lands-list-header">
          <button className="back-btn" onClick={() => navigate('/lenderLoggedInHome')}>
            ← Back to Dashboard
          </button>
          <h1>Available Lands</h1>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading available lands...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lands-list-container">
        <div className="lands-list-header">
          <button className="back-btn" onClick={() => navigate('/lenderLoggedInHome')}>
            ← Back to Dashboard
          </button>
          <h1>Available Lands</h1>
        </div>
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Lands</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchLands}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lands-list-container">
      <div className="lands-list-header">
        <button className="back-btn" onClick={() => navigate('/lenderLoggedInHome')}>
          ← Back to Dashboard
        </button>
        <h1>Available Lands</h1>
        <p>Browse through our collection of available lands for lease</p>
      </div>

      <div className="lands-stats">
        <div className="stat-card">
          <span className="stat-number">{lands.length}</span>
          <span className="stat-label">Total Lands</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {lands.filter(land => land.isAvailable).length}
          </span>
          <span className="stat-label">Available</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {lands.reduce((total, land) => total + land.size, 0)}
          </span>
          <span className="stat-label">Total Acres</span>
        </div>
      </div>

      <div className="lands-grid">
        {lands.length === 0 ? (
          <div className="no-lands">
            <div className="no-lands-icon">🏞️</div>
            <h3>No Lands Available</h3>
            <p>There are currently no lands listed for lease.</p>
          </div>
        ) : (
          lands.map(land => (
            <div 
              key={land._id} 
              className="land-card"
              onClick={() => navigate(`/lands/${land._id}`)}
            >
              <div className="land-card-image">
                {land.images && land.images.length > 0 ? (
                  <img 
                    src={land.images[0].url} 
                    alt={land.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="land-card-placeholder">
                    <span>🌱</span>
                  </div>
                )}
              </div>
              
              <div className="land-card-content">
                <h3 className="land-card-title">{land.title}</h3>
                
                <div className="land-card-details">
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">
                      {land.location.area}, {land.location.lga}
                    </span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Size:</span>
                    <span className="detail-value">{land.size} acres</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value price">{formatPrice(land.price)}</span>
                  </div>
                </div>
                
                <div className="land-card-footer">
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

export default GetLands;