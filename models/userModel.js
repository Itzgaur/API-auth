const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    validate: [validator.isEmail, 'please enter a valid email!'],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'guide', 'lead-guide', 'admin'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, `please enter the password`],
    minlenght: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'password does not match',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', function (next) {
  console.log(`is modified: ${this.isModified('password')}`);
  console.log(`preSave ${this.password}`);
});

userSchema.pre('save', function () {
  console.log(`preSave2 ${this.password}`);
});

userSchema.methods.correctPassword = function (userPassword, providedPassword) {
  return userPassword === providedPassword;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
