import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"; // Import faUser for profile icon
import "../styles/App.css";

const HomePage = () => {
  const navigate = useNavigate();

  // Sample product data
  const products = [
    { id: 1, name: "Women's Dress", price: "$49", img: "https://via.placeholder.com/150", category: "women" },
    { id: 2, name: "Kids' T-Shirt", price: "$19", img: "https://via.placeholder.com/150", category: "kids" },
    { id: 3, name: "Men's Jacket", price: "$89", img: "https://via.placeholder.com/150", category: "men" },
    { id: 4, name: "Women's Shoes", price: "$59", img: "https://via.placeholder.com/150", category: "women" },
  ];

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
          <Link to="/profile"> {/* Link for profile page */}
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
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card" 
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <p className="brand-description">High quality and stylish!</p> {/* Brand description */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;




