const asyncErrorHandler = require('../utils/asyncErrorHandler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, res) => {
  const token = signToken(user._id);

  res.cookie('accessToken', token, {
    expires: new Date(
      Date.now() + process.env.ACCESS_TOKEN_EXPIRES * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(201).json({
    status: 'Success',
    data: {
      user,
      token,
      createdAt: new Date(Date.now()),
    },
  });
};

exports.signUp = asyncErrorHandler(async function (req, res, next) {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createAndSendToken(newUser, res);
});

exports.login = asyncErrorHandler(async function (req, res, next) {
  // 1: check if email and password are there
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError(`please provide email & password`, 404));
  // 2. fetch the email and verify the password

  const user = await User.findOne({ email }).select('password');

  console.log(user);
  if (!user || !user.correctPassword(user.password, password)) {
    return next(new AppError('Wrong credentials!', 401));
  }

  // 3. log in the user and send the token
  createAndSendToken(user._id, res);
});

exports.protectRoute = asyncErrorHandler(async function (req, res, next) {
  const accessToken =
    req.cookies.accessToken ?? req.headers.authorization.split(' ')[1];

  if (!accessToken) return next(new AppError('You are not logged in!', 401));

  const decodedData = await promisify(jwt.verify)(
    accessToken,
    process.env.JWT_SECRET_KEY,
  );

  const user = await User.findById(decodedData.id);

  console.log(user);
  if (!user) {
    return next(new AppError('user no longer exists!', 404));
  }

  next();
});

exports.updatePassword = asyncErrorHandler(async function (req, res, next) {
  const user = await User.find({ email: req.body.email }).select('+password');

  console.log(user);
  user.password = 'Test@1234';
  await User.create(user);
  res.send('inside update function');
});
