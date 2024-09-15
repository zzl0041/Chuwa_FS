const express = require('express');
const Product = require('../models/product'); // Assuming you have this model
const { authenticateToken } = require('../config/auth'); // Middleware for JWT authentication
const router = express.Router();

// Create a new product (Authenticated users only)
router.post('/products', authenticateToken, async (req, res) => {
    const { name, description, category, price, stockQuantity, image } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            category,
            price,
            stockQuantity,
            image,
            createdBy: req.user.id // Assign the user who is creating the product
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
});

// Get all products (Public access)
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Get a product by id (Public access)
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
});

// Update a product (Only the creator of the product can update it)
router.put('/products/:id', authenticateToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the logged-in user is the one who created the product
        if (product.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to update this product' });
        }

        // Update the product
        const updatedData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});

// Delete a product (Only the creator of the product can delete it)
router.delete('/products/:id', authenticateToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the logged-in user is the one who created the product
        if (product.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this product' });
        }

        await Product.findByIdAndDelete(req.params.id, { new: true });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

module.exports = router;
