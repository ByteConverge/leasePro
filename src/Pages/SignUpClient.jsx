import React, { useState } from 'react';
import '../cssStyles/signUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    address: {
      street: '',
      lga: '',
      area: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const lgaOptions = [
    'Bauchi', 'Tafawa Balewa', 'Dass', 'Torro', 'Bogoro', 'Ningi', 'Warji', 
    'Ganjuwa', 'Kirfi', 'Alkaleri', 'Darazo', 'Misau', 'Giade', 'Shira', 
    'Jamaare', 'Katagum', 'Itas/Gadau', 'Zaki', 'Dambam', 'Gamawa'
  ];

  const roleOptions = ['admin', 'owner', 'leaser'];

  // Console log form data whenever it changes
  React.useEffect(() => {
    console.log('📝 Current Form Data:', JSON.parse(JSON.stringify(formData)));
  }, [formData]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;
    const cleanPhone = phone.replace(/-/g, '');
    if (!phone) return 'Phone number is required';
    if (!phoneRegex.test(cleanPhone)) return 'Please enter a valid Nigerian phone number';
    return '';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'name':
        return !value ? 'Name is required' : '';
      case 'password':
        return !value ? 'Password is required' : value.length < 6 ? 'Password must be at least 6 characters' : '';
      case 'role':
        return !value ? 'Role is required' : '';
      case 'address.street':
        return !value ? 'Street address is required' : '';
      case 'address.lga':
        return !value ? 'LGA is required' : '';
      case 'address.area':
        return !value ? 'Area is required' : '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'address') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    Object.keys(formData.address).forEach(key => {
      const error = validateField(`address.${key}`, formData.address[key]);
      if (error) newErrors[`address.${key}`] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Console log the data that will be sent to backend
    const payload = JSON.parse(JSON.stringify(formData));
    console.log('🚀 Data to be sent to backend:', payload);
    console.log('📤 API Endpoint: POST https://backend-lease.onrender.com/api/auth/register');
    console.log('📦 Payload JSON:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('https://backend-lease.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Log response details
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response OK:', response.ok);
      
      const responseText = await response.text();
      console.log('📥 Raw Response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('📥 Parsed Response Data:', data);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError);
        throw new Error('Invalid JSON response from server');
      }

      if (response.ok) {
        console.log('✅ Registration Successful!');
        
        // Store JWT token in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('🔐 JWT Token stored in localStorage:', data.token.substring(0, 20) + '...');
        } else {
          console.warn('⚠️ No token received in response');
        }

        // Store user ID in localStorage - check multiple possible locations
        let userId = null;
        if (data.userId) {
          userId = data.userId;
        } else if (data.user && data.user.id) {
          userId = data.user.id;
        } else if (data.user && data.user._id) {
          userId = data.user._id;
        } else if (data.id) {
          userId = data.id;
        }

        if (userId) {
          localStorage.setItem('userId', userId);
          console.log('👤 User ID stored in localStorage:', userId);
        } else {
          console.warn('⚠️ No user ID found in response');
          console.log('🔍 Available keys in response:', Object.keys(data));
          if (data.user) {
            console.log('🔍 Available keys in user object:', Object.keys(data.user));
          }
        }

        // Verify storage
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        console.log('🔍 Verification - Stored Token:', storedToken ? storedToken.substring(0, 20) + '...' : 'None');
        console.log('🔍 Verification - Stored User ID:', storedUserId || 'None');

        setShowSuccessModal(true);
        setTimeout(() => {
          window.location.href = '/lenderLoggedInHome';
        }, 2000);
      } else {
        console.error('❌ Registration failed with status:', response.status);
        console.error('❌ Error message:', data.message || 'Unknown error');
        throw new Error(data.message || `Registration failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Network/API error:', error);
      console.error('❌ Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Console log initial form data on component mount
  React.useEffect(() => {
    console.log('🎯 SignUp Component Mounted');
    console.log('📋 Initial Form Data:', JSON.parse(JSON.stringify(formData)));
    
    // Check if there are existing tokens/user IDs in localStorage
    const existingToken = localStorage.getItem('token');
    const existingUserId = localStorage.getItem('userId');
    if (existingToken || existingUserId) {
      console.log('🔍 Existing localStorage data:');
      console.log('   Token:', existingToken ? existingToken.substring(0, 20) + '...' : 'None');
      console.log('   User ID:', existingUserId || 'None');
    }
  }, []);

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phone ? 'error' : ''}
              placeholder="e.g., 08012345678 or +2348012345678"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          {/* Role Field */}
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.role ? 'error' : ''}
            >
              <option value="">Select your role</option>
              {roleOptions.map(role => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>

          {/* Address Fields */}
          <div className="address-section">
            <h3>Address Information</h3>
            
            {/* Street Address */}
            <div className="form-group">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors['address.street'] ? 'error' : ''}
                placeholder="Enter your street address"
              />
              {errors['address.street'] && <span className="error-message">{errors['address.street']}</span>}
            </div>

            {/* LGA Select */}
            <div className="form-group">
              <label htmlFor="lga">Local Government Area (LGA)</label>
              <select
                id="lga"
                name="address.lga"
                value={formData.address.lga}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors['address.lga'] ? 'error' : ''}
              >
                <option value="">Select your LGA</option>
                {lgaOptions.map(lga => (
                  <option key={lga} value={lga}>{lga}</option>
                ))}
              </select>
              {errors['address.lga'] && <span className="error-message">{errors['address.lga']}</span>}
            </div>

            {/* Area Field */}
            <div className="form-group">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                name="address.area"
                value={formData.address.area}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors['address.area'] ? 'error' : ''}
                placeholder="Enter your area"
              />
              {errors['address.area'] && <span className="error-message">{errors['address.area']}</span>}
            </div>
          </div>

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">✓</div>
            <h3>Registered Successfully!</h3>
            <p>You will be redirected to the home page shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;