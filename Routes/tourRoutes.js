const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', tourController.getAllTours);
router.get('/:id', authController.protectRoute, tourController.getTourById);
router.post('/', authController.protectRoute, tourController.createTour);
router.patch('/:id', tourController.updateTour);

module.exports = router;
