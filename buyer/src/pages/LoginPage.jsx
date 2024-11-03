import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
    contact: '',
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
      console.log('Logging in with:', credentials.username, credentials.password);
      // Add your login logic, e.g., calling an API to authenticate the user
    }
    
    // Redirect to the homepage after login or signup
    navigate('/home'); 
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
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
        {isSignup && (
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
              type="tel"
              name="contact"
              placeholder="Contact Number"
              value={credentials.contact}
              onChange={handleChange}
              required
            />
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


