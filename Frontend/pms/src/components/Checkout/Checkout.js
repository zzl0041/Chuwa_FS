import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; // Import the CSS for styling

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCheckoutItems();
  }, []);

  const fetchCheckoutItems = async () => {
    // This function simulates fetching the checkout items from the backend.
    // Replace this with your actual API call to fetch the cart items.
    const fakeItems = [
      {
        _id: "1",
        name: "Desktop",
        description: "A 5090 desktop",
        category: "Electronics",
        price: 15000,
        quantity: 1,
        image: "https://example.com/laptop-image.jpg",
      },
      {
        _id: "2",
        name: "Headphones",
        description: "Wireless noise-cancelling headphones",
        category: "Accessories",
        price: 300,
        quantity: 2,
        image: "https://example.com/headphones-image.jpg",
      },
    ];

    setCheckoutItems(fakeItems);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      // In a real-world scenario, you'd make a payment API request here
    }, 2000);
  };

  const handleBackToProducts = () => {
    navigate("/products");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout Summary</h1>
      </div>

      {/* Checkout Items */}
      <div className="checkout-items">
        {checkoutItems.length === 0 ? (
          <p>No items in checkout.</p>
        ) : (
          checkoutItems.map((item) => (
            <div key={item._id} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div className="checkout-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Category: {item.category}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Payment Section */}
      <div className="payment-section">
        <h3>Payment Details</h3>
        <form onSubmit={handlePaymentSubmit}>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-btn" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Submit Payment"}
          </button>
        </form>
      </div>

      {/* Payment Success Message */}
      {paymentSuccess && (
        <div className="payment-success">
          <h3>Payment Successful!</h3>
          <p>Thank you for your purchase. Your items will be shipped shortly.</p>
          <button onClick={handleBackToProducts}>Back to Products</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
