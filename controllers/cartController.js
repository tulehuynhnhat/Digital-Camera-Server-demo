const Cart = require('../models/cartModel');
const AppError = require('../utils/appError');

exports.AddProduct = async (req, res, next) => {
  try {
    let cart = await Cart.findOneAndUpdate({ userId: req.params.userId });
    let productArray = [];

    productArray = cart.products;
    productArray.push(req.body);
    productArray = productArray.filter(
      (value, index, self) => index === self.findIndex((t) => t.productId === value.productId)
    );

    cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $set: {
          products: productArray,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return next(new AppError(`Not found customer ID: ${req.params.userId}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    return next(error);
  }
};

exports.refreshCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $unset: {
          products: {
            productId: req.body.productId,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    return next(error);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    let cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $pull: {
          products: {
            productId: req.body.productId,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    return next(error);
  }
};
