// ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css'; // Import your styles here

const ProfilePage = () => {
  const navigate = useNavigate();

  // Dummy user data - replace this with your actual user data logic
  const user = {
    username: 'johndoe',
    email: 'johndoe@example.com',
    contact: '1234567890',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postcode: '10001',
    country: 'USA',
    userRole: 'Customer',
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="emoji">👤</div> {/* Person-like emoji */}
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Contact Number:</strong> {user.contact}</p>
        <p><strong>Address 1:</strong> {user.address1}</p>
        <p><strong>Address 2:</strong> {user.address2}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>State:</strong> {user.state}</p>
        <p><strong>Postcode:</strong> {user.postcode}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p><strong>User Role:</strong> {user.userRole}</p>
      </div>
      <button onClick={() => navigate('/home')}>Back to Home</button>
    </div>
  );
};

export default ProfilePage;
