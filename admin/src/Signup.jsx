import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
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
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (
      fullname &&
      email &&
      phonenumber &&
      address_line_1 &&
      city &&
      state &&
      postal_code &&
      country &&
      userrole
    ) {
      // Temporary signup functionality
      localStorage.setItem('isLoggedIn', true);
      navigate('/admin');
    } else {
      alert('Please fill out all fields');
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
             <button type="submit">Sign up</button>
           </form>
           <p>
             Already have an account? <a href="/">Login</a>
           </p>
         </div>
       </div>
     </div>
   );
 };
 
 export default Signup;
 
