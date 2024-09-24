import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  // Check if the user is authenticated by checking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchCartTotal(token);
    }
  }, []);

  // Fetch cart total using the token
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
        console.error("Failed to fetch cart data", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };

  // Handle sign-out by clearing the token and redirecting to the sign-in page
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <header className="header">
      <div className="header-container">
        <span className="header-title">
          Management <span className="title2">Chuwa</span>
        </span>
        <input type="text" placeholder="Search" className="search-bar" />

        <div className="user-options">
          {/* Show 'Sign In' or 'Sign Out' based on authentication status */}
          {isAuthenticated ? (
            <button onClick={handleSignOut} className="signout-link">
              Sign Out
            </button>
          ) : (
            <a href="/signin" className="signin-link">
              Sign In
            </a>
          )}

          {/* Show cart icon with total price only if the user is authenticated */}
          {isAuthenticated && (
            <div className="cart-icon">
              <span role="img" aria-label="cart">
                🛒
              </span>{" "}
              ${cartTotal.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
