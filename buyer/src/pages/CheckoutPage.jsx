import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Spinner, Modal, Button } from 'react-bootstrap';
import "../styles/CheckoutPage.css"; // Import your CSS file

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, total_amount, shipping_fee, product_id, admin_id } = location.state;

  const [quantity, setQuantity] = useState(1);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePlaceOrder = async () => {
    if (window.confirm("Do you want to confirm the order?")) {
      const orderDetails = {
        order_status: orderStatus,
        total_amount,
        product_id,
        quantity,
        admin_id,
        shipping_fee,
      };

      setLoading(true);

      try {
        const response = await fetch(`http://localhost:5000/api/orders/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(orderDetails)
        });

        if (!response.ok) throw new Error("Failed to place order.");
      } catch (error) {
        console.error("Error placing order:", error);
      } finally {
        setLoading(false);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/home");
        }, 3000);
      }
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {loading && <Spinner animation="border" />}
      <div className="checkout-input">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" placeholder="Enter your name" />
      </div>
      <div className="checkout-input">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" placeholder="Enter your address" />
      </div>
      <div className="checkout-input">
        <label htmlFor="payment">Payment Method</label>
        <select id="payment">
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>
      <div className="checkout-input">
        <label htmlFor="quantity">Quantity</label>
        <input 
          type="number" 
          id="quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          min="1" 
        />
      </div>
      <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>
      <div className="summary">
        <h3>Order Summary</h3>
        <p>Item: ${total_amount}</p>
        <p>Shipping Fee: ${shipping_fee}</p>
        <p>Total: ${total_amount + shipping_fee}</p>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success" className="d-flex align-items-center">
            <Spinner animation="border" size="sm" className="me-2" />
            Order placed successfully!
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
