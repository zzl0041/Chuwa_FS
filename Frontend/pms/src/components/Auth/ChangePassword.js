import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false); // Track whether the email was sent
  const navigate = useNavigate();

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid Email input!");
    } else {
      // Simulate email being sent
      console.log("Recovery email sent to:", email);
      setError(""); // Reset the error
      setEmailSent(true); // Set email sent state
    }
  };

  // Function to handle closing the confirmation message and navigate to signin
  const handleClose = () => {
    navigate("/signin");
  };

  return (
    <div className="change-password-container">
      {!emailSent ? (
        // If email is not sent, show the form
        <form onSubmit={handleSubmit} className="change-password-form">
          <h2>Update your password</h2>
          <p>Enter your email, and we will send you the recovery link.</p>
          <p className="email">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            className={error ? "error" : ""}
          />
          {error && <span className="error">{error}</span>}
          <button type="submit" className="btn">
            Update password
          </button>
        </form>
      ) : (
        // If email is sent, show the confirmation message
        <div className="confirmation-container">
          <div className="confirmation-box">
            <button className="close-btn" onClick={handleClose}>
              &times; {/* Close button 'x' */}
            </button>
            <img
              src="https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2013/05/email-logo.jpg" // Replace with your image URL
              alt="Email sent"
              className="email-image"
            />
            <p>
              We have sent the update password link to your email, please check
              that!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
