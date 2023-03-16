const express = require('express');
const app = express();
const cameraRouter = require('./routes/cameraRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const AppError = require('./utils/appError');

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use('/api/cameras', cameraRouter);
app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);

// Error middleware handle
app.use('/', (req, res, next) => {
  res.status(200).send('Digital Camera API');
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  // Development
  if (process.env.NODE_ENV === 'development')
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error: error,
    });
  // Production
  else if (process.env.NODE_ENV === 'production') {
    err = Object.assign(error);

    if (err.name === 'CastError') {
      const message = `Invalid ${err.path}: ${err.value}`;
      err = new AppError(message, 400);
    }

    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((el) => el.message);
      const message = `Invalid input data. ${errors.join('. ')}`;
      err = new AppError(message, 400);
    }
    if (err.code === 11000) {
      const message = `Duplicate field value: ${err.keyValue.name}`;
      err = new AppError(message, 400);
    }
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

module.exports = app;
