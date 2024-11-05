import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Alert, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "../styles/ProductPage.css";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem('userId'); // Get userId from location or localStorage
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details by userId and product ID
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch product details.");

        const data = await response.json();
        if (data.success) {
          setProduct(data.product[0]);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, userId]);

  const handleAddToCart = () => {
    console.log(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    console.log(`${product.name} added to wishlist!`);
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      userId,
      total_amount: product.price,
      shipping_fee: 50, // Assuming a fixed shipping fee
      admin_id: "b199239b-7916-425e-87b2-12bc19c442ab" // Assuming a fixed admin ID
    };
    navigate("/checkout", { state: { ...orderDetails, product_id: product.id } });
  };

  const handleImageError = (e) => {
    e.target.src = "";
    e.target.alt = "Image not available";
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "block";
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="product-detail-container" style={{ padding: '20px' }}>
      <Row>
        <Col md={6} className="image-gallery" style={{ marginBottom: '20px' }}>
          {product.images && product.images.length > 0 ? (
            <Carousel>
              {product.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <div style={{ position: 'relative', textAlign: 'center' }}>
                    <img 
                      src={img || "https://via.placeholder.com/350"} 
                      alt={`Product Image ${index + 1}`} 
                      className="main-image" 
                      style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} 
                      onError={handleImageError}
                    />
                    <FontAwesomeIcon 
                      icon={faImage} 
                      style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        fontSize: '2rem', 
                        color: '#ccc', 
                        display: 'none' 
                      }} 
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <img src="https://via.placeholder.com/350" alt="Placeholder" className="main-image" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
          )}
        </Col>
        <Col md={6} className="product-info" style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>{product.name}</h2>
          <p className="price" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e63946', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>${product.price}</p>
          <div className="product-details" style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
            <p><span className="label" style={{ fontWeight: 'bold' }}>Color:</span> {product.color}</p>
            <p><span className="label" style={{ fontWeight: 'bold' }}>Brand:</span> {product.brand_name}</p>
            <p><span className="label" style={{ fontWeight: 'bold' }}>Material:</span> {product.material}</p>
            <p><span className="label" style={{ fontWeight: 'bold' }}>Size:</span> {product.size}</p>
            <p><span className="label" style={{ fontWeight: 'bold' }}>Stock Quantity:</span> {product.stock_quantity}</p>
            <p><span className="label" style={{ fontWeight: 'bold' }}>Description:</span> {product.description}</p>
          </div>
          <Button variant="primary" className="add-to-cart" onClick={handleAddToCart} style={{ marginBottom: '10px', width: '100%', borderRadius: '5px' }}>Add to Cart</Button>
          <Button variant="secondary" className="add-to-wishlist" onClick={handleAddToWishlist} style={{ marginBottom: '10px', width: '100%', borderRadius: '5px' }}>Add to Wishlist</Button>
          <Button variant="success" className="place-order" onClick={handlePlaceOrder} style={{ width: '100%', borderRadius: '5px' }}>Place Order</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;

