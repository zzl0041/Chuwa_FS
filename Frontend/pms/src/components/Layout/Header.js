import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart"; // Import the Cart component
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartVisible, setCartVisible] = useState(false); // State for cart visibility
  const navigate = useNavigate();

  // Check if the user is authenticated and fetch cart total
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchCartTotal(token);
    }
  }, []);

  const fetchCartTotal = async (token) => {
    try {
      const response = await fetch("http://localhost:3004/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCartTotal(data.totalPrice);
      } else {
        console.error("Failed to fetch cart total", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart total", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  // Toggle the cart visibility
  const toggleCart = (state) => {
    setCartVisible(state);
  };

  return (
    <header className="header">
      <div className="header-container">
        <span className="header-title">
          Management <span className="title2">Chuwa</span>
        </span>
        <input type="text" placeholder="Search" className="search-bar" />

        <div className="user-options">
          {isAuthenticated ? (
            <button onClick={handleSignOut} className="signout-link">
              Sign Out
            </button>
          ) : (
            <a href="/signin" className="signin-link">
              Sign In
            </a>
          )}

          {/* Cart Button */}
          {isAuthenticated && (
            <button className="cart-icon" onClick={() => toggleCart(true)}>
              View Cart 🛒 ${cartTotal.toFixed(2)}
            </button>
          )}
        </div>
      </div>

      {/* Render the Cart component */}
      <Cart isVisible={cartVisible} toggleCart={toggleCart} />
    </header>
  );
};

export default Header;
