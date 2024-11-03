import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    contact: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    userRole: ''
  });
  const navigate = useNavigate(); // useNavigate hook

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // Handle signup logic here
      console.log('Signing up with:', credentials);
      // Add your signup logic, e.g., calling an API to create a new user
    } else {
      // Handle login logic here
      console.log('Logging in with:', credentials.email, credentials.password);
      // Add your login logic, e.g., calling an API to authenticate the user
    }
    
    // Redirect to the homepage after login or signup
    navigate('/home'); 
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {!isSignup ? (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </>
        ) : (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              value={credentials.contact}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address1"
              placeholder="Address Line 1"
              value={credentials.address1}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address2"
              placeholder="Address Line 2"
              value={credentials.address2}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={credentials.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={credentials.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={credentials.postcode}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={credentials.country}
              onChange={handleChange}
              required
            />
            <select
              name="userRole"
              value={credentials.userRole}
              onChange={handleChange}
              required
            >
              <option value="">Select User Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              {/* Add more roles as needed */}
            </select>
          </>
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;



