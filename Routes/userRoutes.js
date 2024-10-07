const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.protectRoute, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser),
  router.post('/signup', authController.signUp);
router.post('/getUserByEmail', userController.getUserByEmail);
router.post('/login', authController.login);
router.post('/update', authController.updatePassword);

module.exports = router;
