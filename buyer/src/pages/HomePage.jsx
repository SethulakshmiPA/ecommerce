import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/App.css";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const userId = location.state?.userId || localStorage.getItem('userId');

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        
        if (!response.ok) throw new Error("Failed to fetch products.");

        const data = await response.json();
        if (data.success) {
          setProducts(data.productList);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="navbar">
        <h1>E-COMMERCE</h1>
        <div className="search-container">
          <input type="text" placeholder="Search for products..." />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="icons">
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeart} className="icon" />
          </Link>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
          </Link>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </Link>
        </div>
      </header>

      {/* Category Buttons */}
      <div className="categories">
        <button onClick={() => navigate("/women")} className="category-button">Women</button>
        <button onClick={() => navigate("/kids")} className="category-button">Kids</button>
        <button onClick={() => navigate("/men")} className="category-button">Men</button>
      </div>

      {/* Product List */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.product_id}
              className="product-card"
              onClick={() => navigate(`/product/${product.product_id}`, { state: { userId } })}
            >
              <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <p className="brand-description">{product.brand_name}</p>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;





