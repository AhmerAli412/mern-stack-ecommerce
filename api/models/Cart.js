// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      color: { type: String },
      title: { type: String },
      price: { type: Number, required: true },
      img: { type: String, required: true },
      size: { type: String },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
