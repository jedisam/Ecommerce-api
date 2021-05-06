const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
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
    // let cartQuantity = cartCheck[0].quantity;
    // cartQuantity += 1;
    // await Cart.findOneAndUpdate({ product }, { quantity: cartQuantity });
    // res.status(200).json({ status: 'success' });
    // console.log(cartCheck);
    let productExists = cartCheck[0].products.find(
      product => product.product._id == req.params.id
    );
    // console.log(req.params.id);
    // console.log('ProdCheck: ', prodCheck);
    if (productExists) {
      // await Cart.findOneAndUpdate({})
      productExists.quantity += req.body.quantity;
      productExists.total_price =
        productExists.quantity * productExists.product.price;
      // const updated = await Cart.save();
      // res.status(200).json({ status: 'success', data: updated });

      const newProduct = {
        product: req.params.id,
        quantity: productExists.quantity,
        total_price: productExists.total_price,
      };

      // console.log(cartCheck[0]);

      // const upd = await Cart.findByIdAndUpdate(
      //   cartCheck[0]._id,
      //   { 'products.product._id': req.params._id },
      //   {
      //     $set: {
      //       'products.product.quantity': productExists.quantity,
      //       'products.product.total_price': productExists.total_price,
      //     },
      //   }
      // );
      // res.status(200).send({
      //   status: 'success',
      //   data: upd,
      // });

      // Cart.update(
      //   { 'products.product._id': req.params.id },
      //   {
      //     $set: {
      //       // 'products.product.$.post': 'this is Update comment',
      //       'products.product.quantity': productExists.quantity,
      //       'products.product.total_price': productExists.total_price,
      //     },
      //   },
      //   function (err, model) {
      //     if (err) {
      //       console.log(err);
      //       return res.send(err);
      //     }
      //     return res.json(model);
      //   }
      // );
      // const itemAvailableInCart = await Cart.find({
      //   'products.product._id': req.params.id,
      // });

      await Cart.findByIdAndUpdate(
        cartCheck[0]._id,
        { $pull: { products: { product: req.params.id } } },
        { useFindAndModify: false, new: true }
      );

      // Cart.findByIdAndUpdate(
      //   cartCheck[0]._id,
      //   { $pull: { products: { _id: req.params.id } } },
      //   function (err, model) {
      //     if (err) {
      //       console.log(err);
      //       return res.send(err);
      //     }

      //     return res.json({ dat: model, pulled: true });
      //   }
      // );

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

const getTotalQuantity = async req => {
  try {
    const cartItems = await Cart.find({ user: req.user._id });
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
  // const ttlPrice = await getTotalPrice(req);
  // const ttlQuantity = await getTotalQuantity(req);
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
    // totalPrice: ttlPrice,
    // totalQuantity: ttlQuantity,
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
