import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate between pages

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newErrors = { email: "", password: "", general: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Invalid Email input!";
    }
    if (!validatePassword(password)) {
      newErrors.password = "Password should be at least 6 characters!";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      setLoading(false);
    } else {
      try {
        const response = await fetch("http://localhost:3004/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Assuming the backend returns a token upon signup
          localStorage.setItem("token", data.token); // Save token if needed
          console.log("Signup successful", data);
          // Redirect to /products
          navigate("/products");
        } else {
          setErrors({ ...newErrors, general: data.message || "Signup failed." });
        }
      } catch (err) {
        setErrors({ ...newErrors, general: "Something went wrong. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign up for an account</h2>

        <p className="username">Username</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-label="Username"
          className={error.username ? "error" : ""}
        />

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

        {error.general && <span className="error">{error.general}</span>}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing up..." : "Create account"}
        </button>

        <p className="haha">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
