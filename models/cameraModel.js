const mongoose = require('mongoose');
const cameraSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A camera must have name'],
    maxlength: [150, 'A name must have less or equal than 150 characters'],
    minlength: [1, 'A name must have more or equal than 1 characters'],
    trim: true,
  },
  quantity: {
    type: String,
    required: [true, 'A camera must have a quantity'],
    maxlength: [50, 'A quantity must have less or equal than 50 characters'],
    minlength: [1, 'A quantity must have more or equal than 1 characters'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'A camera must have a brand'],
    maxlength: [50, 'A brand must have less or equal than 50 characters'],
    minlength: [1, 'A brand must have more or equal than 1 characters'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'A camera must have a type'],
    maxlength: [50, 'A type must have less or equal than 50 characters'],
    minlength: [1, 'A type must have more or equal than 1 characters'],
    trim: true,
  },
  img: {
    type: String,
    required: [true, 'A camera must have a img'],
    maxlength: [150, 'A img must have less or equal than 150 characters'],
    minlength: [1, 'A img must have more or equal than 1 characters'],
    trim: true,
  },
  price: {
    type: String,
    required: [true, 'A camera must have a price'],
    maxlength: [150, 'A price must have less or equal than 150 characters'],
    minlength: [1, 'A price must have more or equal than 1 characters'],
    trim: true,
  },
});

const Camera = mongoose.model('Camera', cameraSchema);
module.exports = Camera;
