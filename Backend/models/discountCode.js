const mongoose = require('mongoose');

const discountCodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountAmount: { type: Number, required: true, min: 0 }
});

const DiscountCode = mongoose.model('DiscountCode', discountCodeSchema);
module.exports = DiscountCode;
