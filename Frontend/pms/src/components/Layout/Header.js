import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // We'll style the header here

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">Management</Link>
      </div>
    </header>
  );
};

export default Header;
