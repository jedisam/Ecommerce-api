const AppError = require('../utils/appError');

const handleCastErrorDb = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDb = err => {
  const value = err.keyValue[Object.keys(err.keyValue)[0]];

  const message = `Duplicate field Value: ${value}. please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid Input Data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleValidation = err => {
  let errMessage = err.message.replace(
    'User validation failed:',
    'User validation failed,'
  );
  let newErr = errMessage.replace('Fname', 'FUll Name');
  let anewErr = newErr.replace('Lname', 'FUll Name');
  return new AppError(anewErr, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token, please log in again', 401);

const handleJWTExpiredError = () =>
  new AppError('Your Token has Expired. please Log in again', 401);

const sendError = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error -send to client
    if (err.isOperational) {
      console.log(err.message);
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // send generic message if not operational error
    console.log('ERROR Weird: ', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something weird happened',
    });
  }
  //  Log Error
  console.error('Error ♋ ', err);

  // display generic message when error is out of main api route
  return res.status(500).json({
    status: 'error',
    message: 'Please try again later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error1';

  let error = { ...err };
  error.message = err.message;

  if (error.errors) error = handleValidation(error);
  if (error.kind === 'ObjectId') error = handleCastErrorDb(error);

  if (error.code === 11000) error = handleDuplicateFieldsDb(error);

  if (error.name === 'validationError') error = handleValidationErrorDB(error);

  if (error.name === 'JsonWebTokenError') error = handleJWTError();

  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  sendError(error, req, res);
};
