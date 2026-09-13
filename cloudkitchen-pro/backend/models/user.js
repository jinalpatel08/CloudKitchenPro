const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    match: /^U-\d{5}$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  },
  fullname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    match: /^[a-zA-Z\s'-]+$/
  },
  role: {
    type: String,
    enum: ['admin', 'chef', 'manager'],
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: /^\+61 4\d{2} \d{3} \d{3}$/
  },

  isLoggedIn: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
