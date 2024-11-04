import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
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
    <Container className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        
        {!isSignup ? (
          <>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </>
        ) : (
          <>
            <Form.Group controlId="formFullName">
              <Form.Control
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={credentials.fullname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Control
                type="tel"
                name="phonenumber"
                placeholder="Contact Number"
                value={credentials.phonenumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddressLine1">
              <Form.Control
                type="text"
                name="address_line_1"
                placeholder="Address Line 1"
                value={credentials.address_line_1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddressLine2">
              <Form.Control
                type="text"
                name="address_line_2"
                placeholder="Address Line 2"
                value={credentials.address_line_2}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                value={credentials.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Control
                type="text"
                name="state"
                placeholder="State"
                value={credentials.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPostalCode">
              <Form.Control
                type="text"
                name="postal_code"
                placeholder="Postcode"
                value={credentials.postal_code}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Control
                type="text"
                name="country"
                placeholder="Country"
                value={credentials.country}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUserRole">
              <Form.Control
                as="select"
                name="userrole"
                value={credentials.userrole}
                onChange={handleChange}
                required
              >
                <option value="">Select User Role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </>
        )}
        
        <Button variant="primary" type="submit">{isSignup ? 'Sign Up' : 'Login'}</Button>
        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
        </p>
      </Form>
    </Container>
  );
};

export default LoginPage;
