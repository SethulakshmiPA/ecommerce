import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Import Spinner component
import './signup.css'; // Ensure the CSS file is imported

const Signup = () => {
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address_line_1, setAddressLine1] = useState('');
  const [address_line_2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [userrole, setUserrole] = useState('');
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (
      fullname &&
      email &&
      password &&
      phonenumber &&
      address_line_1 &&
      city &&
      state &&
      postal_code &&
      country &&
      userrole
    ) {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname,
            email,
            password,
            phonenumber,
            address_line_1,
            address_line_2,
            city,
            state,
            postal_code,
            country,
            userrole,
          }),
        });

        const data = await response.json(); // Parse the response as JSON

        if (response.ok) { // Check if the response status is OK
          alert('Signup successful');
          localStorage.setItem('isLoggedIn', true);
          
          // Store the user ID in local storage without attaching it to the URL
          if (data.userId) {
            localStorage.setItem('userId', data.userId); // Store the user ID in local storage
            navigate('/admin'); // Navigate to the admin page without user ID in the URL
          } else {
            setError('User ID not found in response');
          }
        } else {
          setError(data.message || 'Failed to insert data into database'); // Use the message from the backend if available
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred during signup');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please fill out all fields');
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="signup-container">
        <div className="signup-form">
          <h2>Sign up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address Line 1"
              value={address_line_1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={address_line_2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={postal_code}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <select value={userrole} onChange={(e) => setUserrole(e.target.value)}>
              <option value="">Select User Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <button type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Sign up'}
            </button>
          </form>
          {error && <p className="error">{error}</p>}
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
