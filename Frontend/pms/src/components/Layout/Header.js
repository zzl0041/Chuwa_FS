import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <span className="header-title">
          Management <span className="title2">Chuwa</span>
        </span>
        <input type="text" placeholder="Search" className="search-bar" />

        <div className="user-options">
          <a href="/signin" className="signin-link">
            Sign In
          </a>
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
