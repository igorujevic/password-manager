'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordVault = mongoose.model('PasswordVault', new Schema({
  pageUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
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
  userId: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  }
}));

module.exports = PasswordVault;
