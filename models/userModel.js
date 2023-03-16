const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
    loweCase: true,
    validate: [validator.isEmail, 'A email is invalid'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must Confirm password'],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: `confirm password is invalid.`,
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }
  return next();
});

userSchema.methods.correctPassword = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
