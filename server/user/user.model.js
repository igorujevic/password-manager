'use strict';

// const { AUTH_SALT_ROUNDS, AUTH_JWT_SECRET } = process.env;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  admin: {
    type: Boolean
  },
  active: {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  deletedAt: {
    type: Date
  }
}));

module.exports = User;
