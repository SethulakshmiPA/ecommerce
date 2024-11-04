import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeartBroken } from 'react-icons/fa';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  return (
    <Container>
      <h1 className="my-4">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center my-5">
          <FaHeartBroken size={50} />
          <h3>Your wishlist is empty</h3>
        </div>
      ) : (
        <Row>
          {wishlistItems.map((item, index) => (
            <Col md={4} key={index}>
              <Card className="mb-4">
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.price}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                  <Button variant="danger" className="ml-2">Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default WishlistPage;
