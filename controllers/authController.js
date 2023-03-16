const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const Cart = require('../models/cartModel');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const sendToken = (user, statusCode, res) => {
  const token = createToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.register = async (req, res, next) => {
  try {
    let newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    await Cart.create({ userId: newUser._id });
    sendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  // check email and password
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Empty email or password', 400));
  }
  // check valid user and pasword
  const userExist = await User.findOne({ email }).select('+password');
  if (!userExist || !(await userExist.correctPassword(password, userExist.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // create token
  sendToken(userExist, 200, res);
  await Cart.create({ userId: userExist._id });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new AppError('Permission denied. Error your token'), 401);
    }

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decode.id);

    if (!currentUser) {
      return next(new AppError('User no longer exist', 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Permission denied. You do not have permission to perform this action')
      );
    }

    next();
  };
};
