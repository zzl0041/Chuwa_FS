const Product = require('../models/product'); // Assuming you have the Product model
const Cart = require('../models/cart'); // Assuming you have the Cart model

// Middleware to validate the cart
const validateCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty.' });
        }

        let cartUpdated = false;
        let unavailableItems = [];

        // Check each product in the cart
        for (let i = cart.items.length - 1; i >= 0; i--) {
            const item = cart.items[i];
            const product = await Product.findById(item.productId);

            if (!product) {
                // Product no longer exists, remove from cart
                unavailableItems.push({ productId: item.productId, reason: 'Product no longer available' });
                cart.items.splice(i, 1); // Remove the product from the cart
                cartUpdated = true;
            } else if (product.stockQuantity < item.quantity) {
                // Not enough stock, adjust quantity or remove item
                if (product.stockQuantity > 0) {
                    item.quantity = product.stockQuantity;
                    unavailableItems.push({ productId: item.productId, reason: `Quantity adjusted to ${product.stockQuantity} due to stock limitations` });
                } else {
                    unavailableItems.push({ productId: item.productId, reason: 'Not enough stock' });
                    cart.items.splice(i, 1); // Remove the product from the cart
                }
                cartUpdated = true;
            }
        }

        // Save updated cart if there were changes
        if (cartUpdated) {
            await cart.save();
        }

        // If there are any unavailable items, notify the user
        if (unavailableItems.length > 0) {
            return res.status(400).json({
                message: 'Some products were removed or their quantity adjusted due to availability issues.',
                unavailableItems,
                updatedCart: cart
            });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error validating cart', error });
    }
};

module.exports = validateCart;
