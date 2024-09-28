import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart"; // Import the Cart component
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartVisible, setCartVisible] = useState(false); // State for cart visibility
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3004/api/products");
        const data = await response.json();
        if (response.ok) {
          setAllProducts(data);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

    // Handle the search input change
    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
  
      if (value.trim()) {
        // Filter products based on the name
        const filteredProducts = allProducts.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredProducts);
      } else {
        setSearchResults([]);
      }
    };
  
      // Handle the product selection from the dropdown
  const handleProductSelect = (productId) => {
    navigate(`/products/${productId}`); // Navigate to the product detail page
  };
  

  
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
        <p
          onClick={() => navigate("/products")}
        >
        <span className="header-title">
          Management <span className="title2">Chuwa</span>
        </span>

        </p>
        <div className="search-bar-container">
        <input 
        type="text" 
        placeholder="Search products..." 
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
        />
        {/* Display dropdown if there are search results */}
                {searchResults.length > 0 && (
          <ul className="search-dropdown">
            {searchResults.map((product) => (
              <li
                key={product._id}
                onClick={() => handleProductSelect(product._id)}
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}

        </div>
        <div className="user-options">
          <span className="user-icon" role="img" aria-label="user">
              👤
            </span>
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
          {/* Create Button */}
          {isAuthenticated && (
            <button
              className="create-product-btn"
              onClick={() => navigate("/create-product")}
            >
              Create Product
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
