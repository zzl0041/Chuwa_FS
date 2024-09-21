import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <span className="header-title">
          Management <span className="title2">Chuwa</span>
        </span>
        <span></span>
        <div class="search-container">
          <input type="text" placeholder="Search" class="search-bar" />
          <span class="search-icon">🔍</span>
        </div>

        <div className="user-options">
          <div className="user-icon-container">
            <span className="user-icon" role="img" aria-label="user">
              👤
            </span>
            <a href="/signin" className="signin-link">
              Sign In
            </a>
          </div>
          <div className="cart-icon">
            <span role="img" aria-label="cart">
              🛒
            </span>{" "}
            $0.00
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
