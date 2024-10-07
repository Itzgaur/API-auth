const User = require('../models/userModel');
const AppError = require('../utils/appError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

exports.getAllUsers = asyncErrorHandler(async function (req, res, next) {
  const users = await User.find();

  if (!users) return next(new AppError('Somthing went wrong!', 500));

  res.status(200).json({
    Status: 'Success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserById = async function (req, res, next) {
  try {
    const userId = req.params.id;
    console.log(req.params.id);
    const user = await User.findOne({ _id: userId });

    res.status(200).json({
      Status: 'Success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.send({
      Status: 'Error',
      error,
    });
  }
};

exports.deleteUser = asyncErrorHandler(async function (req, res, next) {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  console.log(deletedUser);

  if (!deletedUser) return next(new AppError('Somthing went wrong', 500));
  res.send('user Deleted');
});

exports.getUserByEmail = asyncErrorHandler(async function (req, res, next) {
  const { email } = req.body;

  if (!email) return next(new AppError('Please provide a email address', 404));
  console.log(email);

  const user = await User.findOne({ email });

  if (!user) return next(new AppError(`no records found with ${email}`, 400));

  res.status(200).json({
    status: 'Success',
    data: {
      user,
    },
  });
});

// exports.createUser = async function (req, res, next) {
//   try {
//     const userData = req.body;
//     console.log(userData);
//     res.send('testing');
//   } catch (error) {}
// };
