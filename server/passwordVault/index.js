'use strict';

const authenticate = require('../shared/auth');
const ctrl = require('./passwordVault.controller');
const express = require('express');
const router = express.Router();

router
  .use(authenticate)
  .get('/', ctrl.getAll)
  .post('/create', ctrl.create)
  .put('/update/:id', ctrl.update);

module.exports = {
  path: '/password-vault', router
};
