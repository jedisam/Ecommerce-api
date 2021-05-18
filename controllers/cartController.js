const Cart = require('../models/cart');
const Product = require('../models/product');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addToCart = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  const cartCheck = await Cart.find({ user: req.user._id });

  if (cartCheck.length == 0) {
    let total_price = req.body.quantity * product.price;
    const newProduct = [];
    newProduct.push({
      product,
      quantity: req.body.quantity,
      total_price,
    });

    await Cart.create({ products: newProduct, user: req.user });
    res.status(201).json({ status: 'success' });
  } else {
    let productExists = cartCheck[0].products.find(
      product => product.product._id == req.params.id
    );

    if (productExists) {
      productExists.quantity += req.body.quantity;
      productExists.total_price =
        productExists.quantity * productExists.product.price;

      const newProduct = {
        product: req.params.id,
        quantity: productExists.quantity,
        total_price: productExists.total_price,
      };

      await Cart.findByIdAndUpdate(
        cartCheck[0]._id,
        { $pull: { products: { product: req.params.id } } },
        { useFindAndModify: false, new: true }
      );

      const newCart = await Cart.findByIdAndUpdate(
        cartCheck[0]._id,
        { $push: { products: newProduct } },
        { useFindAndModify: false, new: true }
      );
      return res.status(201).send({
        status: 'success',
        data: newCart,
      });
    } else {
      const newProduct = {
        product: req.params.id,
        quantity: req.body.quantity,
        total_price: req.body.quantity * product.price,
      };

      const newCart = await Cart.findByIdAndUpdate(
        cartCheck[0]._id,
        { $push: { products: newProduct } },
        { useFindAndModify: false, new: true }
      );
      res.status(201).send({
        status: 'success',
        data: newCart,
      });
    }
  }
});

exports.showTotalPrice = catchAsync(async (req, res, next) => {
  const totalPrice = await getTotalPrice(req);
  res.status(200).json({
    status: 'success',
    totalPrice,
  });
});

exports.ShowTotalQunatity = catchAsync(async (req, res, next) => {
  const totalQuantity = await getTotalQuantity(req);
  res.status(200).json({
    status: 'success',
    totalQuantity,
  });
});

const getTotalPrice = async req => {
  try {
    const cartItems = await Cart.find({ user: req.user._id });
    let totalPrice = 0;
    if (cartItems.length != 0) {
      cartItems[0].products.forEach(item => {
        totalPrice += item.total_price;
      });
    }
    return totalPrice;
  } catch (err) {
    console.log(err);
    throw new AppError('Error Processing');
  }
};

const getTotalQuantity = async req => {
  try {
    const cartItems = await Cart.find({ user: req.user._id });
    let totalQuantity = 0;
    if (cartItems.length != 0) {
      // console.log(cartItems);
      cartItems[0].products.forEach(item => {
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
  const ttlPrice = await getTotalPrice(req);
  const ttlQuantity = await getTotalQuantity(req);
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 15;

  const skip = (page - 1) * limit;
  const cartItems = await Cart.find({ user: req.user._id })
    .sort('createdAt')
    .skip(skip)
    .limit(limit);

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
  const cartCheck = await Cart.find({ user: req.user._id });
  if (cartCheck.length == 0) {
    return next(new AppError('Product not found in user collection', 404));
  }

  const productCheck = cartCheck[0].products.find(
    product => product.product._id == productId
  );

  if (!productCheck) {
    console.log('Not found');
    return next(new AppError('No Product Found with the given ID', 404));
  }

  await Cart.findByIdAndUpdate(
    cartCheck[0]._id,
    { $pull: { products: { product: productId } } },
    { useFindAndModify: false, new: true }
  );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTotalPrice = getTotalPrice;
exports.getTotalQuantity = getTotalQuantity;
