'use strict';

const express = require('express');
const passwrodVault = require('./passwordVault');
const user = require('./user');

const router = express.Router();

router.use(passwrodVault.path, passwrodVault.router);
router.use(user.path, user.router);

module.exports = router;
