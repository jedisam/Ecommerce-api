const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Booking must belong to a Tour'],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

cartSchema.pre(/^find/, function (next) {
  this.populate('product').populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
