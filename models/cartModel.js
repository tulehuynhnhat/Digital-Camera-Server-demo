const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      productId: String,
      _id: false,
    },
  ],
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: 'name email role',
  });
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
