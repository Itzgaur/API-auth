const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

exports.getAllTours = asyncErrorHandler(async function (req, res, next) {
  const tours = await Tour.find();
  if (!tours) {
    return next(new AppError('Somthing went wrong', 500));
  }

  res.status(200).send({
    success: 'true',
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTourById = asyncErrorHandler(async function (req, res, next) {
  const tourId = req.params.id;
  const tour = await Tour.findOne({ _id: tourId });

  if (!tour) {
    return next(new AppError('No record found!', 404));
  }

  res.status(200).send({
    success: 'true',
    data: {
      tour,
    },
  });
});

exports.createTour = asyncErrorHandler(async function (req, res, next) {
  const tour = req.body;
  await Tour.create(tour);

  res.status(201).send({
    status: 'Success',
    message: 'Tour is created successfully',
  });
});

exports.updateTour = asyncErrorHandler(async function (req, res, next) {
  const updatedTour = req.body;
  const tourId = req.params.id;

  const response = await Tour.findByIdAndUpdate(tourId, updatedTour, {
    runValidators: true,
    new: true,
  });

  if (!response) return next(new AppError('Cannot update the doc!', 500));

  res.status(201).json({
    status: 'Sucess',
    message: 'updated the record',
  });
});
