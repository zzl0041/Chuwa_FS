import React from "react";
import "./Footer.css";
import { FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p
          onClick={() => navigate("/")}
        >©2022 All Rights Reserved.</p>
        <div className="social-icons">
          <span>
            <FaYoutube aria-label="Youtube" />
          </span>
          <span>
            <FaTwitter aria-label="Twitter" />
          </span>
          <span>
            <FaFacebook aria-label="Facebook" />
          </span>
        </div>
        <div className="footer-container">
          <a href="/contact">Contact us</a>
          <a href="/privacy-policy">Privacy Policies</a>
          <a href="/help">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
