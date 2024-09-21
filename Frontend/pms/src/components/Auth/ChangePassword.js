import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid Email input!");
    } else {
      console.log("Recovery email sent to:", email);
      setError(""); // Reset the error
    }
  };

  return (
    <div className="change-password-container">
      <form onSubmit={handleSubmit} className="change-password-form">
        <h2>Update your password</h2>
        <p>Enter your email link, we will send you the recovery link</p>
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
    </div>
  );
};

export default ChangePassword;
