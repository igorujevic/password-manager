'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./user.controller');
const express = require('express');
const router = express.Router();

router
  .post('/register', ctrl.register)
  .post('/login', ctrl.login)
  .use(authenticate)
  .get('/', ctrl.getAll);

module.exports = {
  path: '/users', router
};
