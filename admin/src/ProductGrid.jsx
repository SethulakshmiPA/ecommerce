import React, { useState, useEffect } from 'react';
import './Admin.css';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductGrid = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Resolve userId from props or from location state
  const resolvedUserId = userId || location.state?.userId;

  // Fetch products when component mounts or userId changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/admin/${resolvedUserId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        if (!data.success || !Array.isArray(data.productList)) {
          throw new Error("Unexpected data format");
        }

        setProducts(data.productList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (resolvedUserId) {
      fetchProducts();
    }
  }, [resolvedUserId]);

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

  const handleEdit = (product) => {
    navigate('/product-form', { state: product });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Products Grid</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div 
            key={product.product_id} 
            className="product-card" 
            onClick={() => handleShowDetails(product)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={product.photo} 
              alt="Product" 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <p>{product.name}</p>
            <p>{product.brand_name} | ${product.price}</p>
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
      {showDetails && selectedProduct && (
        <div className="product-details">
          <h2>Product Details</h2>
          <p>Product ID: {selectedProduct.product_id}</p>
          <p>Name: {selectedProduct.name}</p>
          <p>Price: ${selectedProduct.price}</p>
          <p>Brand: {selectedProduct.brand_name}</p>
          <div className="image-slider">
            <img 
              src={selectedProduct.photo} 
              alt="Selected Product" 
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;





