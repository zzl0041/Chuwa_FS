const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        quantity: { type: Number, required: true, min: 1 }
    }],
    discountCode: { type: String, default: null }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
