import React, { useState } from "react";
import "./Signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      console.log("Signing in with:", email, password);
      // Add your sign-in logic here
    } catch (e) {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="signin-container">
      <div class="signin-form">
        <h2>Sign in to your account</h2>
        <form>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            required
          ></input>

          <label for="password">Password</label>
          <div class="password-field">
            <input
              type="password"
              id="password"
              placeholder="**************"
              required
            ></input>
            <text type="button" class="show-password">
              Show
            </text>
          </div>

          <button type="submit" class="signin-button">
            Sign In
          </button>

          <div class="additional-links">
            <p class="no-account">
              Don’t have an account? 
              <a href="#">Sign up</a>
              <a href="#" className="haha">
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
