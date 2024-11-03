// src/pages/CheckoutPage.jsx

import React, { useState } from "react";
import "../styles/CheckoutPage.css"; // Make sure you have a CSS file for styling

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default payment method
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle order submission
    alert(`Order placed successfully with payment method: ${paymentMethod} and delivery address: ${address}`);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="address-section">
          <label htmlFor="address">Delivery Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            required
          />
        </div>
        <div className="payment-method">
          <h3>Select Payment Method:</h3>
          <label>
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal
          </label>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
