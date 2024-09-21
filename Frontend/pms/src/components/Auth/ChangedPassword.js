import React, { useState } from "react";
import "./ChangedPassword.css";

const ChangedPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid Email input!");
      setSuccessMessage(""); // Reset success message if the email is invalid
    } else {
      setSuccessMessage(
        "We have sent the update password link to your email, please check that!"
      );
      setError(""); // Reset error
      setEmail(""); // Clear email input
      console.log("Recovery email sent to:", email);
    }
  };

  return (
    <div className="change-password-container">
      <div className="modal">
        <div className="modal-content">
          <span className="email-icon">📧</span>
          <p className="message">
            We have sent the update password link to your email, please check
            that!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangedPassword;
