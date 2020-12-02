const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addToCart = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  const cartCheck = await Cart.find({ product });
  if (cartCheck.length == 0) {
    await Cart.create({ product });
    res.status(201).json({ status: 'success' });
  } else {
    let cartQuantity = cartCheck[0].quantity;
    cartQuantity += 1;
    await Cart.findOneAndUpdate({ product }, { quantity: cartQuantity });
    res.status(200).json({ status: 'success' });
  }
});

exports.showTotalPrice = catchAsync(async (req, res, next) => {
  const totalPrice = await getTotalPrice();
  res.status(200).json({
    status: 'success',
    totalPrice,
  });
});

exports.ShowTotalQunatity = catchAsync(async (req, res, next) => {
  const totalQuantity = await getTotalQuantity();
  res.status(200).json({
    status: 'success',
    totalQuantity,
  });
});

const getTotalPrice = async () => {
  try {
    const cartItems = await Cart.find();
    let totalPrice = 0;
    if (cartItems.length != 0) {
      // console.log(cartItems);
      cartItems.forEach(item => {
        totalPrice += item.quantity * item.product.price;
      });
    }
    return totalPrice;
  } catch (err) {
    console.log(err);
    throw new AppError('Error Processing');
  }
};

const getTotalQuantity = async () => {
  try {
    const cartItems = await Cart.find();
    let totalQuantity = 0;
    if (cartItems.length != 0) {
      // console.log(cartItems);
      cartItems.forEach(item => {
        totalQuantity += item.quantity;
      });
    }
    return totalQuantity;
  } catch (err) {
    console.log(err);
  }
};

exports.getCartItemDetails = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const cartItem = await Cart.find({ product: productId });
  if (!cartItem) {
    return next(new AppError('No Cart Found with the given ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: cartItem,
    },
  });
});

exports.getCartItems = catchAsync(async (req, res) => {
  const ttlPrice = await getTotalPrice();
  const ttlQuantity = await getTotalQuantity();
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 15;

  const skip = (page - 1) * limit;
  const cartItems = await Cart.find().sort('createdAt').skip(skip).limit(limit);

  res.status(200).json({
    status: 'success',
    results: cartItems.length,
    totalPrice: ttlPrice,
    totalQuantity: ttlQuantity,
    data: {
      data: cartItems,
    },
  });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const cartItem = await Cart.findOneAndDelete({ product: productId });
  if (!cartItem) {
    console.log('Not found');
    return next(new AppError('No Product Found with the given ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTotalPrice = getTotalPrice;
exports.getTotalQuantity = getTotalQuantity;
