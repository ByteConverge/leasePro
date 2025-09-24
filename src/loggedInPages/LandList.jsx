import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssStyles/LandList.css';

const LandList = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: {
      lga: '',
      area: ''
    },
    size: '',
    price: '',
    leaseDuration: '',
    amenities: []
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const lgaOptions = [
    'Bauchi', 'Tafawa Balewa', 'Dass', 'Torro', 'Bogoro', 'Ningi', 'Warji', 
    'Ganjuwa', 'Kirfi', 'Alkaleri', 'Darazo', 'Misau', 'Giade', 'Shira', 
    'Jamaare', 'Katagum', 'Itas/Gadau', 'Zaki', 'Dambam', 'Gamawa'
  ];

  const leaseDurationOptions = [
    { value: 'short_term', label: 'Short Term' },
    { value: 'long_term', label: 'Long Term' }
  ];

  const amenitiesOptions = [
    'Water Access',
    'Fencing',
    'Electricity',
    'Road Access',
    'Irrigation',
    'Storage Facilities'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location[lga]', formData.location.lga);
      formDataToSend.append('location[area]', formData.location.area);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('leaseDuration', formData.leaseDuration);
      
      formData.amenities.forEach(amenity => {
        formDataToSend.append('amenities', amenity);
      });

      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await fetch('https://backend-lease.onrender.com/api/lands', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create land listing');
      }

      const result = await response.json();
      setShowSuccessModal(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/lenderLoggedInHome');
      }, 3000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/lenderLoggedInHome');
  };

  return (
    <div className="land-list-container">
      <div className="land-list-form">
        <div className="form-header">
          <h2>List Your Land</h2>
          <p>Fill in the details below to list your land for lease</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="land-form">
          <div className="form-group">
            <label htmlFor="title">Land Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g., Beautiful Farmland in Bauchi"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Describe the land features, soil type, accessibility, etc."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location.lga">LGA *</label>
              <select
                id="location.lga"
                name="location.lga"
                value={formData.location.lga}
                onChange={handleInputChange}
                required
              >
                <option value="">Select LGA</option>
                {lgaOptions.map(lga => (
                  <option key={lga} value={lga}>{lga}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location.area">Area *</label>
              <input
                type="text"
                id="location.area"
                name="location.area"
                value={formData.location.area}
                onChange={handleInputChange}
                required
                placeholder="e.g., Gwallaga"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="size">Size (acres) *</label>
              <input
                type="number"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="e.g., 50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (₦) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="e.g., 250000"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="leaseDuration">Lease Duration *</label>
            <select
              id="leaseDuration"
              name="leaseDuration"
              value={formData.leaseDuration}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Duration</option>
              {leaseDurationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Amenities</label>
            <div className="amenities-grid">
              {amenitiesOptions.map(amenity => (
                <label key={amenity} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />
                  <span className="checkmark"></span>
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="images">Land Images</label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <div className="file-info">
              {images.length > 0 ? `${images.length} image(s) selected` : 'No images selected'}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating Listing...' : 'List Land'}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal-content">
            <div className="success-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Land Listed Successfully!</h3>
            <p>Your land has been listed and is now available for leasing.</p>
            <div className="success-modal-countdown">
              <p>Redirecting to dashboard in <span className="countdown-number">3</span> seconds...</p>
            </div>
            <button className="success-modal-btn" onClick={handleCloseSuccessModal}>
              Go to Dashboard Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandList;