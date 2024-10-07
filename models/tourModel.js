const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  difficulty: {
    type: String,
    required: [true, 'please enter diffculty of the tour'],
  },
  startLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    description: String,
    coordinates: [Number],
    address: String,
  },
  ratingsAverage: {
    type: Number,
    required: true,
  },
  ratingsQuantity: {
    type: Number,
  },
  maxGroupSize: {
    type: Number,
    default: 5,
  },
  guides: [String],
  price: {
    type: Number,
    required: [true, 'enter the price!'],
  },
  summary: {
    type: String,
    required: [true, 'Enter the description!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
