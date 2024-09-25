import React, { useEffect, useRef, useState } from 'react';
import './Cart.css';

const Cart = ({ isVisible, toggleCart }) => {
  const [cart, setCart] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState(''); // Input for new discount code
  const [discountInfo, setDiscountInfo] = useState(null); // Info for applied discount
  const [error, setError] = useState('');
  const TAX_RATE = 0.09125; // 9.125% tax rate
  const cartRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      const token = localStorage.getItem('token');
      if (token) {
        fetchCart(token);
      }
    }
  }, [isVisible]);

  const fetchCart = async (token) => {
    try {
      const response = await fetch('http://localhost:3004/api/cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
        setCartTotal(data.totalPrice);
        setDiscountInfo(data.cart.discountCode); // Set the discount code if it's already applied
      } else {
        setError(data.message || 'Failed to load cart.');
      }
    } catch (error) {
      setError('Error fetching cart data');
    }
  };

  const updateProductQuantity = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3004/api/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchCart(token); // Refresh cart after updating
      } else {
        setError(data.message || 'Failed to update quantity.');
      }
    } catch (error) {
      setError('Error updating quantity.');
    }
  };

  const removeProductFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3004/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchCart(token); // Refresh cart after removing
      } else {
        setError(data.message || 'Failed to remove product.');
      }
    } catch (error) {
      setError('Error removing product.');
    }
  };

  const applyDiscount = async () => {
    const token = localStorage.getItem('token');
    if (discountInfo) {
      setError('A discount code has already been applied. Only one discount code can be used.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3004/api/cart/discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: discountCode }),
      });
      const data = await response.json();
      if (response.ok) {
        setDiscountInfo(data.discount); // Assuming the discount code info is returned
        fetchCart(token); // Refresh cart after applying discount
        setDiscountCode(''); // Clear discount code input
      } else {
        setError(data.message || 'Failed to apply discount.');
      }
    } catch (error) {
      setError('Error applying discount.');
    }
  };

  const checkout = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3004/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert('Checkout successful!');
        setCart(null); // Clear the cart after checkout
        toggleCart(false); // Close the cart
      } else {
        setError(data.message || 'Checkout failed.');
      }
    } catch (error) {
      setError('Error during checkout.');
    }
  };

  // Calculate values for subtotal, tax, discount, and total
  const subtotal = cart?.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0) || 0;
  const tax = subtotal * TAX_RATE;
  const discountAmount = discountInfo;
  const estimatedTotal = subtotal + tax;

  // Handle clicks outside the cart to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        toggleCart(false);
      }
    };
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cart-popup" ref={cartRef}>
      <h2>Your Shopping Cart</h2>
      {error && <p className="error-message">{error}</p>}
      {cart && cart.items.length > 0 ? (
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.productId._id} className="cart-item">
              <img src={item.productId.image} alt={item.productId.name} />
              <div className="cart-item-details">
                <h4>{item.productId.name}</h4>
                <p>Price: ${item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateProductQuantity(item.productId._id, item.quantity + 1)}>+</button>
                  <button onClick={() => updateProductQuantity(item.productId._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <button onClick={() => removeProductFromCart(item.productId._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

            <div className="discount-section">
            <input
              type="text"
              placeholder={"Discount Code"}
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              disabled={!!discountInfo} // Disable if a discount is already applied
            />
            <button onClick={applyDiscount} disabled={!!discountInfo}>
              Apply Discount
            </button>
          </div>


          <div className="cart-summary">
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax (9.125%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Discount:</span>
              <span>${discountAmount}</span>
            </div>
            <div className="summary-item total">
              <span>Estimated Total:</span>
              <span>${estimatedTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="checkout-btn" onClick={checkout}>
            Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
