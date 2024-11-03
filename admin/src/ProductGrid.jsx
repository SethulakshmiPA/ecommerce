import React, { useState } from 'react';
import './Admin.css';
import p1_img from './assets/Scr.png';
import p2_img from './assets/joyal.png';
import { Link, useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';

const ProductGrid = () => {
  // Hardcoded products for display. You can replace this with real data from an API later.
  const [products, setProducts] = useState([
    {
      product_id: 1,
      name: 'T-shirt for Men',
      price: 19.00,
      description: 'Casual T-shirt for men',
      brand: 'Nike',
      category: 'Clothing',
      images: [p1_img, p2_img],
    },
    {
      product_id: 2,
      name: 'Travel Bag Jeans',
      price: 37.00,
      description: 'Travel bag jeans for men',
      brand: 'Levis',
      category: 'Clothing',
      images: [p1_img, p2_img],
    },
    {
      product_id: 3,
      name: 'Sofa for Living Room',
      price: 275.00,
      description: 'Sofa for living room',
      brand: 'IKEA',
      category: 'Furniture',
      images: [p1_img, p2_img],
    },
    // add more products as needed
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const navigate = useNavigate();

  const handleDelete = (product_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      setProducts(products.filter((product) => product.product_id !== product_id));
    }
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0); // Reset to first image
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProduct(null);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length);
  };

  const handleEdit = (product) => {
    navigate('/product-form', { state: product });
  };

  return (
    <div className="container">
      <h1>Products Grid</h1>
      <ul>
      <div className="products-grid">
  {products.map((product) => (
    <div 
      key={product.product_id} 
      className="product-card" 
      onClick={() => handleShowDetails(product)}
      style={{ cursor: 'pointer' }}
    >
      <img 
        src={product.images[0]} 
        alt="Product image" 
      />
      <p>{product.name}</p>
      <p>{product.brand} | ${product.price}</p>
      <button onClick={(e) => {
        e.stopPropagation();
        handleEdit(product);
      }}>Edit</button>
      <button onClick={(e) => {
        e.stopPropagation();
        handleDelete(product.product_id);
      }}>Delete</button>
    </div>
  ))}
</div>
      </ul>
      {showDetails && selectedProduct && (
        <div className="product-details">
          <h2>Product Details</h2>
          <p>Product_id: {selectedProduct.product_id}</p>
          <p>Name: {selectedProduct.name}</p>
          <p>Description: {selectedProduct.description}</p>
          <p>Price: ${selectedProduct.price}</p>
          <p>Brand Name: {selectedProduct.brand}</p>
          <p>Category: {selectedProduct.category}</p>
          <div className="image-slider">
            <button onClick={handlePrevImage}>←</button>
            <img src={selectedProduct.images[currentImageIndex]} alt={`Product image ${currentImageIndex + 1}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            <button onClick={handleNextImage}>→</button>
          </div>
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

