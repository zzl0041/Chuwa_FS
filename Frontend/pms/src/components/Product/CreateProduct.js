import React, { useState } from "react";
import "./CreateProduct.css"; // Importing CSS for styling

const CreateProduct = () => {
  const [productName, setProductName] = useState("iWatch");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Category1");
  const [price, setPrice] = useState(50);
  const [stock, setStock] = useState(100);
  const [imageLink, setImageLink] = useState("http://");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      productName,
      description,
      category,
      price,
      stock,
      imageLink,
    });
  };

  return (
    <>
      <h1 className="text-h1">Create Product</h1>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Product name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
                <button type="button" className="upload-btn">
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div className="image-preview">
            <p>image preview!</p>
          </div>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
