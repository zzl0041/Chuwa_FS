import React from "react";
import "./ProductDetail.css"; // Ensure this CSS file is updated accordingly.

const ProductDetail = () => {
  return (
    <div className="container">
      <main className="main">
        <h2>Products Detail</h2>
        <div className="product-details">
          <img
            src="https://example.com/path-to-your-image.jpg"
            alt="Meta Quest2 VR headset"
            className="product-image"
          />
          <div className="product-info">
            <p className="category">Category1</p>
            <h3 className="product-title">Meta Quest2 VR headset</h3>
            <p className="price">$299</p>
            <p className="status">Out of Stock</p>
            <p className="description">
              Hundreds of hit games, one-of-a-kind experiences, live events, new
              ways to stay fit and a growing community.
            </p>
            <div className="button-container">
              <button className="btn add-to-cart">Add To Cart</button>
              <button className="btn edit">Edit</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
