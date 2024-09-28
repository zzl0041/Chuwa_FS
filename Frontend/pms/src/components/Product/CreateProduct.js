import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css"; // Importing CSS for styling

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Category1");
  const [price, setPrice] = useState(50);
  const [stock, setStock] = useState(100);
  const [imageLink, setImageLink] = useState("http://");
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission (Product creation)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the product object
    const newProduct = {
      name: productName,
      description,
      category,
      price,
      stockQuantity: stock,
      image: imageLink,
    };

    // Get the token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be signed in to create a product.");
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch("http://localhost:3004/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token for authentication
        },
        body: JSON.stringify(newProduct), // Send the product details
      });

      if (response.ok) {
        const createdProduct = await response.json();
        alert("Product created successfully!");
        navigate(`/products/${createdProduct._id}`); // Redirect to product detail page
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error creating product.");
      }
    } catch (error) {
      setError("An error occurred while creating the product.");
    }
  };

  // Handle image upload click and display preview
  const handleImageUpload = () => {
    if (imageLink) {
      setImagePreview(imageLink); // Set image preview to the provided link
    } else {
      setImagePreview(null); // Reset preview if no link is provided
    }
  };

  return (
    <>
      <h1 className="text-h1">Create Product</h1>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>} {/* Display errors */}

          <div className="form-group">
            <label>Product name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name.."
              required
            />
          </div>

          <div className="form-group">
            <label>Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description..."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Category1">Category1</option>
                <option value="Category2">Category2</option>
                <option value="Category3">Category3</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>In Stock Quantity</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Add Image Link</label>
              <div className="image-link-container">
                <input
                  type="text"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  required
                />

              </div>
              <button type="button" className="upload-btn" onClick={handleImageUpload}>
                  Upload
                </button>
            </div>
          </div>

          {/* Display image preview if imagePreview is set */}
          {imagePreview && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img src={imagePreview} alt="Product Preview" className="preview-image" />
            </div>
          )}

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
