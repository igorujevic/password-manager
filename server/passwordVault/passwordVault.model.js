'use strict';

// const { AUTH_SALT_ROUNDS, AUTH_JWT_SECRET } = process.env;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordVault = mongoose.model('PasswordVault', new Schema({
  pageUrl: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  deletedAt: {
    type: Date
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
}));

module.exports = PasswordVault;
