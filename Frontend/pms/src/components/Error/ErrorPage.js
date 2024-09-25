import React from "react";
import "./ErrorPage.css"; // Importing CSS

const ErrorPage = () => {
  return (
    <main className="main">
      <div className="error-container">
        <div className="icon">⚠️</div>
        <h1>Oops, something went wrong!</h1>
        <a href="/" className="home-button">
          Go Home
        </a>
      </div>
    </main>
  );
};

export default ErrorPage;
