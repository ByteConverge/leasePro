import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssStyles/EquipmentList.css';

const EquipmentList = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    model: '',
    year: '',
    condition: 'good',
    price: '',
    rentalPeriod: 'daily',
    location: {
      lga: '',
      area: ''
    }
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

  const categoryOptions = [
    'tractor', 'plow', 'harvester', 'irrigation', 'tools', 'other'
  ];

  const conditionOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ];

  const rentalPeriodOptions = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('model', formData.model);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('condition', formData.condition);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('rentalPeriod', formData.rentalPeriod);
      formDataToSend.append('location[lga]', formData.location.lga);
      formDataToSend.append('location[area]', formData.location.area);

      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await fetch('https://backend-lease.onrender.com/api/equipment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create equipment listing');
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

  const currentYear = new Date().getFullYear();

  return (
    <div className="equipment-list-container">
      <div className="equipment-list-form">
        <div className="form-header">
          <h2>List Your Equipment</h2>
          <p>Fill in the details below to list your equipment for rental</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="equipment-form">
          <div className="form-group">
            <label htmlFor="name">Equipment Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g., John Deere Tractor"
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
              placeholder="Describe the equipment features, condition, and specifications"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categoryOptions.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand *</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
                placeholder="e.g., John Deere"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="model">Model *</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
                placeholder="e.g., 5050E"
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                min="1900"
                max={currentYear}
                placeholder={`e.g., ${currentYear}`}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="condition">Condition *</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                required
              >
                {conditionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rentalPeriod">Rental Period *</label>
              <select
                id="rentalPeriod"
                name="rentalPeriod"
                value={formData.rentalPeriod}
                onChange={handleInputChange}
                required
              >
                {rentalPeriodOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
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
              placeholder="e.g., 25000"
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
                placeholder="e.g., GRA"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="images">Equipment Images</label>
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
            {loading ? 'Creating Listing...' : 'List Equipment'}
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
            <h3>Equipment Listed Successfully!</h3>
            <p>Your equipment has been listed and is now available for rental.</p>
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

export default EquipmentList;