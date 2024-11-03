import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KidsPage from './pages/KidsPage';
import WomenPage from './pages/WomenPage'; 
import LoginPage from './pages/LoginPage';
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from './pages/ProfilePage'; 
import CheckoutPage from "./pages/CheckoutPage"; // Ensure this is the correct path to your Checkout component
import WishlistPage from "./pages/WishlistPage"; 
import Cartpage from "./pages/Cartpage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/women" element={<WomenPage />} /> {/* Route for WomenPage */}
      <Route path="/kids" element={<KidsPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Product detail route */}
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/wishlist" element={<WishlistPage />} /> {/* Route for Wishlist page */}
      <Route path="/profile" element={<ProfilePage />} /> {/* Add route for ProfilePage */}
      <Route path="/cart" element={<Cartpage/>}/>
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown paths to login */}
    </Routes>
  );
};

export default App;


