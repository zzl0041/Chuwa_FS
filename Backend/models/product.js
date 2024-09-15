// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Ensure this is included
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
