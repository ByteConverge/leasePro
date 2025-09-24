import React, { useState } from 'react';
import '../cssStyles/signIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Console log form data whenever it changes
  React.useEffect(() => {
    console.log('📝 Current Login Form Data:', JSON.parse(JSON.stringify(formData)));
  }, [formData]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return !value ? 'Password is required' : '';
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
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Console log the data that will be sent to backend
    const payload = JSON.parse(JSON.stringify(formData));
    console.log('🚀 Login Data to be sent to backend:', payload);
    console.log('📤 API Endpoint: POST https://backend-lease.onrender.com/api/auth/login');
    console.log('📦 Payload JSON:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('https://backend-lease.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Log response details
      console.log('📥 Login Response Status:', response.status);
      console.log('📥 Login Response OK:', response.ok);
      
      const responseText = await response.text();
      console.log('📥 Login Raw Response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('📥 Login Parsed Response Data:', data);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError);
        throw new Error('Invalid JSON response from server');
      }

      if (response.ok) {
        console.log('✅ Login Successful!');
        
        // Store JWT token in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('🔐 JWT Token stored in localStorage:', data.token.substring(0, 20) + '...');
        } else {
          console.warn('⚠️ No token received in login response');
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
          console.warn('⚠️ No user ID found in login response');
          console.log('🔍 Available keys in response:', Object.keys(data));
          if (data.user) {
            console.log('🔍 Available keys in user object:', Object.keys(data.user));
          }
        }

        // Verify storage
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        console.log('🔍 Login Verification - Stored Token:', storedToken ? storedToken.substring(0, 20) + '...' : 'None');
        console.log('🔍 Login Verification - Stored User ID:', storedUserId || 'None');

        setShowSuccessModal(true);
        setTimeout(() => {
          window.location.href = '/lenderLoggedInHome';
        }, 2000);
      } else {
        console.error('❌ Login failed with status:', response.status);
        console.error('❌ Login error message:', data.message || 'Unknown error');
        throw new Error(data.message || `Login failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Login Network/API error:', error);
      console.error('❌ Login error details:', {
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
    console.log('🎯 Login Component Mounted');
    console.log('📋 Initial Login Form Data:', JSON.parse(JSON.stringify(formData)));
    
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
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>
        
        <form onSubmit={handleSubmit} className="login-form">
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

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-links">
          <p>Don't have an account? <a href="/signUpLender">Sign up here</a></p>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">✓</div>
            <h3>Login Successful!</h3>
            <p>You will be redirected to the home page shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;