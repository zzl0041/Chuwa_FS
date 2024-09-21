import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Invalid Email input!";
    }
    if (!validatePassword(password)) {
      newErrors.password = "Invalid password input!";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
    } else {
      console.log("Signup successful");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign up an account</h2>
        <p className="email">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email"
          className={error.email ? "error" : ""}
        />
        {error.email && <span className="error">{error.email}</span>}
        <p className="pass">Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={error.password ? "error" : ""}
        />
        {error.password && <span className="error">{error.password}</span>}
        <button type="submit" className="btn">
          Create account
        </button>

        <p className="haha">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
