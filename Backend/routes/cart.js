const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product'); // Assuming you have this model
const DiscountCode = require('../models/discountCode');
const { authenticateToken } = require('../config/auth'); // Middleware for JWT authentication
const validateCart = require('../middleware/validateCart'); // Middleware to validate the cart
const router = express.Router();


// Helper function to calculate total price
const calculateTotalPrice = async (cart) => {
    let total = 0;
    for (const item of cart.items) {
        const product = await Product.findById(item.productId);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    return total;
};

// Mock payment service (You can replace this with real payment service integration)
const processPayment = (amount) => {
    // Simulate payment process here. Return true for successful payment.
    return amount > 0; // Dummy condition
};

// Checkout API with stock quantity update
router.post('/cart/checkout', authenticateToken, validateCart, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty.' });
        }

        // Calculate total price including discount
        let totalPrice = 0;
        const productUpdates = []; // To keep track of product updates

        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
            }

            // Add to total price
            totalPrice += item.quantity * product.price;

            // Decrement product stock quantity
            product.stockQuantity -= item.quantity;
            productUpdates.push(product); // Save for later update
        }

        // Apply discount if applicable
        if (cart.discountCode) {
            const discount = await DiscountCode.findOne({ code: cart.discountCode });
            if (discount) {
                totalPrice -= discount.discountAmount;
            }
        }

        // Simulate payment process
        const paymentSuccess = processPayment(totalPrice);

        if (!paymentSuccess) {
            return res.status(500).json({ message: 'Payment failed. Please try again.' });
        }

        // Update product stock in database
        await Promise.all(productUpdates.map((product) => product.save()));

        // Empty the cart after successful checkout
        cart.items = [];
        cart.discountCode = null;
        cart.discountAmount = 0;
        await cart.save();

        res.json({ message: 'Checkout successful! Your cart has been emptied.', totalAmountCharged: totalPrice });
    } catch (error) {
        res.status(500).json({ message: 'Checkout failed', error });
    }
});


// Add a product to the cart
router.post('/cart/add', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) return res.status(400).json({ message: 'Product ID and quantity are required' });

    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            // Update existing cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
        } else {
            // Create new cart
            const newCart = new Cart({
                userId: req.user.id,
                items: [{ productId, quantity }]
            });
            await newCart.save();
        }
        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
});

// Remove a product from the cart
router.post('/cart/remove', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) return res.status(400).json({ message: 'Product ID and quantity are required' });

    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity -= quantity;
            if (cart.items[itemIndex].quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            res.status(200).json({ message: 'Product removed from cart' });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
});

// Apply a discount code to the cart
router.post('/cart/discount', authenticateToken, async (req, res) => {
    const { code } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const discount = await DiscountCode.findOne({ code });
        if (!discount) return res.status(404).json({ message: 'Discount code not found' });

        cart.discountCode = code;
        await cart.save();
        res.status(200).json({ message: 'Discount code applied', discountAmount: discount.discountAmount });
    } catch (error) {
        res.status(500).json({ message: 'Error applying discount code', error });
    }
});

// Get the user's cart details
router.get('/cart', authenticateToken, validateCart, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        //console.log(cart);
        // Calculate the total price with discount
        let totalPrice = await calculateTotalPrice(cart);
        if (cart.discountCode) {
            const discount = await DiscountCode.findOne({ code: cart.discountCode });
            if (discount) {
                totalPrice -= discount.discountAmount;
            }
        }

        res.status(200).json({ cart, totalPrice });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart details', error });
    }
});

module.exports = router;
