import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/CheckoutPage.css"; // Import your CSS file

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, total_amount, shipping_fee, product_id, admin_id } = location.state;

  const [quantity, setQuantity] = useState(1);
  const [orderStatus, setOrderStatus] = useState("pending");

  const handlePlaceOrder = async () => {
    const orderDetails = {
      order_status: orderStatus,
      total_amount,
      product_id,
      quantity,
      admin_id,
      shipping_fee,
    };

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

      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
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
    </div>
  );
};

export default CheckoutPage;
