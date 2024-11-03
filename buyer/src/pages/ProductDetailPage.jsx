import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams
import "../styles/ProductPage.css"; // Import CSS for styling

const ProductDetailPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Get the product ID from the URL

  // Sample product data for Women's and Kids' products
  const products = [
    {
      id: 1,
      name: "Women's Dress",
      price: "$49",
      images: [
        "https://via.placeholder.com/350?text=Image+1",
        "https://via.placeholder.com/350?text=Image+2",
        "https://via.placeholder.com/350?text=Image+3",
      ],
      color: "Blue",
      material: "Cotton",
      sizes: ["S", "M", "L"],
    },
    {
      id: 1,
      name: "Kids T-shirt",
      price: "$20",
      images: [
        "https://via.placeholder.com/350?text=Kids+Image+1",
        "https://via.placeholder.com/350?text=Kids+Image+2",
        "https://via.placeholder.com/350?text=Kids+Image+3",
      ],
      color: "Red",
      material: "Polyester",
      sizes: ["S", "M", "L"],
    },
    // Add more kids products as needed
  ];

  // Find the product by ID
  const product = products.find((prod) => prod.id === parseInt(id));

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    // Add to wishlist logic
    console.log(`${product.name} added to wishlist!`);
  };

  // Function to handle placing an order
  const handlePlaceOrder = () => {
    navigate("/checkout"); // Redirect to the checkout page
  };

  if (!product) {
    return <p>Product not found!</p>; // Handle case where product is not found
  }

  return (
    <div className="product-detail-container">
      <div className="image-gallery">
        {product.images.map((img, index) => (
          <img key={index} src={img} alt={`Product Image ${index + 1}`} className="main-image" />
        ))}
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">{product.price}</p>
        <div className="product-details">
          <p><span className="label">Color:</span> {product.color}</p>
          <p><span className="label">brand:</span> {product.brand}</p>
          <p><span className="label">Material:</span> {product.material}</p>
          <p><span className="label">Sizes:</span> {product.sizes.join(", ")}</p>
        </div>
        <div className="size-selection">
          <label htmlFor="size">Select Size:</label>
          <select id="size">
            {product.sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        <button className="add-to-wishlist" onClick={handleAddToWishlist}>Add to Wishlist</button>
        <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;


