const AppError = require('../utils/appError');

const sendDevError = function (err, res) {
  console.log(`inside sendDevError`);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProductionError = function (err, res) {
  console.log(`inside sendProdError`);

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'Failed',
      message: 'Something went Wrong',
    });
  }
};

const sendCastError = function (err) {
  console.log(`inside SendCastError`);

  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendvalidationError = function (err) {
  console.log(`inside sendvalidationError`);

  // const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(err.message, 500);
};

const sendTokenExpiredError = function () {
  console.log(`inside sendTokenExpiredError`);

  return new AppError(
    'You have been logged out.Please login again to continue.',
    404,
  );
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  console.log(`inside the global error middleware`);
  console.log(err.name);

  if (process.env.NODE_ENV === 'developement') sendDevError(err, res);
  else if (process.env.NODE_ENV === 'production ') {
    if (err.name === 'CastError') err = sendCastError(err);
    else if (err.name === 'TokenExpiredError') err = sendTokenExpiredError();
    else if (err.name === 'ValidationError') err = sendvalidationError(err);
    sendProductionError(err, res);
  }
};
