import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3004/api', // Your backend URL
});

export const signin = (data) => api.post('/auth/signin', data);
export const signup = (data) => api.post('/auth/signup', data);
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data, token) => api.post('/products', data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const updateProduct = (id, data, token) => api.put(`/products/${id}`, data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const deleteProduct = (id, token) => api.delete(`/products/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});
export const addToCart = (data) => api.post('/cart', data);
export const checkout = (token) => api.post('/cart/checkout', {}, {
  headers: { Authorization: `Bearer ${token}` }
});
