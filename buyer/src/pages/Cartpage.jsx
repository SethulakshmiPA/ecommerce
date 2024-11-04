import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const Cartpage = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Container>
      <h1 className="my-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center my-5">
          <FaShoppingCart size={50} />
          <h3>Your cart is empty</h3>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={4}>
                      <img src={item.image} alt="Product" className="img-fluid" />
                    </Col>
                    <Col md={4}>
                      <h5>{item.name}</h5>
                      <p>{item.price}</p>
                    </Col>
                    <Col md={4}>
                      <Button variant="danger">Remove</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <Card.Text>Total: $199.98</Card.Text>
                <Button variant="success" block>Proceed to Checkout</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cartpage;
