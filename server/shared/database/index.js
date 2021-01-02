'use strict';
const mongoose = require('mongoose');

function initialize() {
  // connect to db
  mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}

const db = {
  initialize
};

module.exports = db;
