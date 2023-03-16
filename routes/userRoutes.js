const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

router
  .route('/')
  .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
  .post(authController.protect, authController.restrictTo('admin'), userController.createUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteAllUsers
  );

router
  .route('/:id')
  .get(authController.protect, authController.restrictTo('admin', 'user'), userController.getUser)
  .put(authController.protect, authController.restrictTo('admin'), userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
