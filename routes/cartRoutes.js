const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router
  .route('/:userId')
  .get(cartController.getCart)
  .post(cartController.refreshCart)
  .patch(cartController.AddProduct)
  .delete(cartController.deleteProduct);
module.exports = router;
