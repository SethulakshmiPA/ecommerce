import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const navigate = useNavigate();

  const product = {
    name: "Sample Product",
    price: "$45",
    color: "Red",
    material: "Cotton",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300"
    ],
  };

  const handlePlaceOrder = () => {
    // Implement place order functionality
    console.log("Order placed!");
    navigate('/order-confirmation'); // Redirect to an order confirmation or summary page
  };

  return (
    <div className="product-detail-container">
      <div className="image-gallery">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} />
        ))}
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Color:</strong> {product.color}</p>
        <p><strong>Material:</strong> {product.material}</p>
        <div className="size-selection">
          <label><strong>Size:</strong></label>
          <select>
            {product.sizes.map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
