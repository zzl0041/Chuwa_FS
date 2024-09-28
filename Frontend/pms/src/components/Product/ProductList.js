import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for low to high, 'desc' for high to low
  const [totalProducts, setTotalProducts] = useState(0);
  const PRODUCTS_PER_PAGE = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOrder]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3004/api/products`);
      const data = await response.json();
      if (response.ok) {
        let sortedProducts = data;
        if (sortOrder === 'asc') {
          sortedProducts = data.sort((a, b) => a.price - b.price);
        } else {
          sortedProducts = data.sort((a, b) => b.price - a.price);
        }
        setTotalProducts(sortedProducts.length);
        const paginatedProducts = sortedProducts.slice(
          (currentPage - 1) * PRODUCTS_PER_PAGE,
          currentPage * PRODUCTS_PER_PAGE
        );
        setProducts(paginatedProducts);
      } else {
        console.error('Error fetching products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProductToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Please sign in first!");
        navigate("/signin"); // Redirect to signin page if not signed in
        return;
      }
      try {
      const response = await fetch(`http://localhost:3004/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
            productId,
            quantity: 1 
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Product added to cart');
      } else {
        console.error('Error adding product to cart:', data.message);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/products/${productId}`); // Navigate to product detail page using the product ID
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="sort-options">
            <h1>Products</h1>
          <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
          <button className="add-product-btn" onClick={() => navigate('/create-product')}>
          Add Product
        </button>

        </div>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stockQuantity}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => addProductToCart(product._id)}>Add</button>
              <button onClick={() => handleEditProduct(product._id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &larr; Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(totalProducts / PRODUCTS_PER_PAGE)}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default ProductList;
