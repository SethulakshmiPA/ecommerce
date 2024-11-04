import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/App.css";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = location.state?.userId || localStorage.getItem('userId');

  useEffect(() => {
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="homepage-container">
      {/* Header */}
      <header className="navbar">
        <h1>E-COMMERCE</h1>
        <div className="search-container">
          <input type="text" placeholder="Search for products..." />
          <Button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
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
        <Button onClick={() => navigate("/women")} className="category-button">Women</Button>
        <Button onClick={() => navigate("/kids")} className="category-button">Kids</Button>
        <Button onClick={() => navigate("/men")} className="category-button">Men</Button>
      </div>

      {/* Product List */}
      <Row className="product-list">
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          products.length > 0 ? (
            products.map((product) => (
              <Col key={product.product_id} md={4} className="product-card" onClick={() => navigate(`/product/${product.product_id}`, { state: { userId } })}>
                <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="brand-description">{product.brand_name}</p>
              </Col>
            ))
          ) : (
            <p>No products available.</p>
          )
        )}
      </Row>
    </Container>
  );
};

export default HomePage;

