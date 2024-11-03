import React from "react";
import "../styles/kidss.css";
import { Link } from "react-router-dom"; 

const KidsPage = () => {
  const kidsProducts = [
    { id: 1, name: "Kids T-shirt", price: "$20", brand: "Brand A", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Kids Shorts", price: "$25", brand: "Brand B", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Kids Dress", price: "$30", brand: "Brand C", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Kids Shoes", price: "$35", brand: "Brand D", image: "https://via.placeholder.com/150" },
    // Add more products as needed
  ];

  return (
    <div className="kids-page">
      <h2>Kids Products</h2>
      <div className="product-grid">
        {kidsProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="brand">{product.brand}</p>
            <p className="price">{product.price}</p>
            <button className="buy-now">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KidsPage;
