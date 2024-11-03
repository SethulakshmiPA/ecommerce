import React from "react";
import "../styles/CheckoutPage.css"; // Import your CSS file

const CheckoutPage = () => {
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
      <button className="place-order">Place Order</button>
      <div className="summary">
        <h3>Order Summary</h3>
        <p>Item 1: $49</p>
        <p>Item 2: $29</p>
        <p>Total: $78</p>
      </div>
    </div>
  );
};

export default CheckoutPage;
