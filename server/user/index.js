'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./user.controller');
const express = require('express');
const router = express.Router();

router
  .post('/register', ctrl.register)
  .post('/login', ctrl.login)
  .get('/verify', ctrl.verify)
  .use(authenticate)
  .get('/', ctrl.getAll)
  .get('/:id', ctrl.getUserData)
  .put('/', ctrl.updateUser)
  .put('/password', ctrl.updateUserPassword)
  .delete('/:id', ctrl.deleteUser);

module.exports = {
  path: '/users', router
};
