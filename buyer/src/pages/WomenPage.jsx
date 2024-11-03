import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/ProductPage.css"; // Import CSS for styling

const WomenPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Sample product data for women
  const womenProducts = [
    { id: 1, name: "Women's Dress", price: "$49", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Women’s Top", price: "$29", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Women's Skirt", price: "$39", img: "https://via.placeholder.com/150" },
    { id: 4, name: "Women's Shoes", price: "$59", img: "https://via.placeholder.com/150" },
    { id: 5, name: "Women's Dress", price: "$49", img: "https://via.placeholder.com/150" },
    { id: 6, name: "Women’s Top", price: "$29", img: "https://via.placeholder.com/150" },
    { id: 7, name: "Women's Skirt", price: "$39", img: "https://via.placeholder.com/150" },
    { id: 8, name: "Women's Shoes", price: "$59", img: "https://via.placeholder.com/150" },
  ];

  const handleBuyNow = (id) => {
    navigate(`/product/${id}`); // Redirect to product detail page
  };

  return (
    <div className="women-page-container">
      <h2>Women's Products</h2>
      <div className="product-list">
        {womenProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <button className="buy-now" onClick={() => handleBuyNow(product.id)}>Buy Now</button> {/* Buy Now button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenPage;
