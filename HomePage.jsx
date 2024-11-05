import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Alert, Form, InputGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
//import "../styles/App.css";

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
    <Container fluid className="p-4">
      {/* Header */}
      <header className="navbar mb-4 p-3 shadow-sm rounded">
        <h1 className="text-primary">E-COMMERCE</h1>
        <InputGroup className="search-container mb-3">
          <Form.Control type="text" placeholder="Search for products..." />
          <Button variant="outline-primary" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup>
        <div className="icons">
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeart} className="icon mx-2" />
          </Link>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} className="icon mx-2" />
          </Link>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="icon mx-2" />
          </Link>
        </div>
      </header>

      {/* Category Buttons */}
      <div className="categories mb-4">
        <Button onClick={() => navigate("/women")} className="category-button mx-2">Women</Button>
        <Button onClick={() => navigate("/kids")} className="category-button mx-2">Kids</Button>
        <Button onClick={() => navigate("/men")} className="category-button mx-2">Men</Button>
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
              <Col key={product.product_id} md={4} className="mb-4">
                <Card className="product-card shadow-sm rounded" onClick={() => navigate(`/product-details`, { state: { productId: product.product_id, userId } })}>
                  <Card.Img variant="top" src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="price">${product.price}</Card.Text>
                    <Card.Text className="brand-description">{product.brand_name}</Card.Text>
                  </Card.Body>
                </Card>
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

