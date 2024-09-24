import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./Signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // Initialize navigate

  // Redirect signed-in users away from the sign-in page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products"); // If token exists, redirect to /products
    }
  }, [navigate]);

  // Function to handle sign-in form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      // Send POST request to the sign-in API
      const response = await fetch("http://localhost:3004/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign-in failed");
      }

      // Save the token to local storage
      localStorage.setItem("token", data.token);
      console.log("Sign-in successful, token:", data.token);

      // Redirect to the /products page after successful sign-in
      navigate("/products");

    } catch (e) {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="**************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="additional-links">
            <p className="no-account">
              Don’t have an account?
              <a href="/signup">Sign up</a>
              <a href="/change-password" className="forgot-password">
                Forgot password?
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
