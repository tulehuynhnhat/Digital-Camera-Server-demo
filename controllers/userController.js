const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Cart = require('../models/cartModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    let newUser = await User.create(req.body);
    await Cart.create({ userId: newUser._id });

    res.status(200).json({
      status: 'success',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany();
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User is not exist', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
  try {
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = User.findByIdAndUpdate(req.params.id, req.body);

    if (!user) {
      return next(new AppError('User is not exist', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
