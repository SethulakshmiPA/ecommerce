import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductGrid from './ProductGrid';
import './Admin.css';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <div className="sidebar-content">
          <ul>
            <li onClick={() => setCurrentPage('home')}>Home</li>
            <li onClick={() => setCurrentPage('grid')}>Products</li>
            <li onClick={() => setCurrentPage('form')}>Add Product</li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="top-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
        {currentPage === 'home' ? (
          <div>
            <h1>Orders</h1>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Order Status</th>
                  <th>Total Amount</th>
                  <th>Shipping Fee</th>
                  <th>Product ID</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1234567890</td>
                  <td>user123</td>
                  <td>pending</td>
                  <td>$100.00</td>
                  <td>$10.00</td>
                  <td>product123</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>9876543210</td>
                  <td>user456</td>
                  <td>shipped</td>
                  <td>$200.00</td>
                  <td>$20.00</td>
                  <td>product456</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>1111111111</td>
                  <td>user789</td>
                  <td>delivered</td>
                  <td>$50.00</td>
                  <td>$5.00</td>
                  <td>product789</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : currentPage === 'grid' ? (
          <ProductGrid />
        ) : (
          <ProductForm />
        )}
      </div>
    </div>
  );
};

export default Admin;
