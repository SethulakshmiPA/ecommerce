import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Admin from './Admin';
import ProductForm from './ProductForm';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product-form" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;