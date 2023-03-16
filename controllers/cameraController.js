const Camera = require('../models/cameraModel');
const AppError = require('../utils/appError');

exports.getAllCameras = async (req, res, next) => {
  try {
    const camera = await Camera.find();

    res.status(200).json({
      status: 'success',
      data: camera,
    });
  } catch (error) {
    return next(error);
  }
};

exports.createCamera = async (req, res, next) => {
  try {
    const camera = await Camera.create(req.body);

    res.status(200).json({
      status: 'success',
      data: camera,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteAllCameras = async (req, res, next) => {
  try {
    await Camera.deleteMany();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getCamera = async (req, res, next) => {
  try {
    const camera = await Camera.findById(req.params.id);

    if (!camera) {
      return next(new AppError(`Not found with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: camera,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateCamera = async (req, res, next) => {
  try {
    const camera = await Camera.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: camera,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteCamera = async (req, res, next) => {
  try {
    await Camera.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};
