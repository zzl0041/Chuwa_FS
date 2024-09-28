import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(""); // Mock current user ID for now


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3004/api/products/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
        } else {
          setError(data.message || "Failed to fetch product details");
        }
      } catch (error) {
        setError("Error fetching product: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    const userId = localStorage.getItem("userId"); // Assuming user ID is stored in localStorage
    setCurrentUserId(userId);
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token"); // Check if the user is signed in

    if (!token) {
      alert("Please sign in first!");
      navigate("/signin"); // Redirect to signin page if not signed in
      return;
    }

    try {
      const response = await fetch("http://localhost:3004/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
        body: JSON.stringify({
          productId: product._id, // Send the current product ID
          quantity: 1, // Assuming adding 1 item by default
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product added to cart!");
      } else {
        alert(`Error adding product to cart: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding the product to the cart.");
    }
  };

  const handleEditClick = () => {
    if (product && product.createdBy !== currentUserId) {
      alert("You don't have access to edit this product.");
    } else {
      alert("Edit functionality not implemented yet");
      // Navigate to edit page if needed in the future
      // navigate(`/products/edit/${product._id}`);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="container">
        <h2>Product Detail</h2>
        <div className="product-details">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-info">
            <p className="category">{product.category}</p>
            <h3 className="product-title">{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="status">
              {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="description">{product.description}</p>
            <div className="button-container">
              <button 
                className="btn add-to-cart"
                onClick={handleAddToCart} // Add to cart handler
                disabled={product.stockQuantity === 0} // Disable button if out of stock
              >
                Add To Cart
              </button>
              <button 
                className="btn edit"
                onClick={handleEditClick}              >
                Edit
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProductDetail;
