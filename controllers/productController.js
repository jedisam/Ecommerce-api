const catchAsync = require('../utils/catchAsync');
const Product = require('../models/product');
const AppError = require('../utils/appError');

exports.getProducts = catchAsync(async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;

    const skip = (page - 1) * limit;
    const products = await Product.find().sort('price').skip(skip).limit(limit);

    res.status('200').json({
      status: 'success',
      results: products.length,
      data: {
        data: products,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error!');
  }
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('No Product Found with the given ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: product,
    },
  });
});

exports.addProuct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new AppError('No Product Found with the given ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    console.log('Not found');
    return next(new AppError('No Product Found with the given ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
