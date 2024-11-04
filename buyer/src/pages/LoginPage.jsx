import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({
    fullname: '',
    email: '',
    password: '',
    phonenumber: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    userrole: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const url = isSignup 
      ? 'http://localhost:5000/api/users/signup'
      : 'http://localhost:5000/api/auth/login';

    // Create a request payload with only required fields for login or signup
    const payload = isSignup 
      ? credentials 
      : { email: credentials.email, password: credentials.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(isSignup ? 'Signup failed. Please try again.' : 'Login failed. Please check your email and password.');
      }

      const data = await response.json();

      // Store user ID and token in localStorage if login was successful
      if (!isSignup) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('userId', data.user_id);
        navigate('/home', { state: { userId: data.user_id } });
      } else {
        const userId = data.userId;
        navigate('/home', { state: { userId } });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        
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
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={credentials.fullname}
              onChange={handleChange}
              required
            />
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
              name="phonenumber"
              placeholder="Contact Number"
              value={credentials.phonenumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address_line_1"
              placeholder="Address Line 1"
              value={credentials.address_line_1}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address_line_2"
              placeholder="Address Line 2"
              value={credentials.address_line_2}
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
              name="postal_code"
              placeholder="Postcode"
              value={credentials.postal_code}
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
              name="userrole"
              value={credentials.userrole}
              onChange={handleChange}
              required
            >
              <option value="">Select User Role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
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
