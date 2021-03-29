'use strict';

// const { AUTH_JWT_SECRET, AUTH_SALT_ROUNDS } = process.env;
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const PasswordVault = require('./passwordVault.model');

// const round = parseInt(AUTH_SALT_ROUNDS);

async function create(req, res) {
  // get user id from saved user in req
  const { user } = req.user;
  // get body data
  const { pageUrl, name, password } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[0] && authHeader.split(' ')[1];
  if (!token) res.status(401).json({ message: 'Unauthorized!' });
  const newPasswordVault = new PasswordVault({
    pageUrl,
    name,
    password,
    userId: user._id,
    createdAt: Date.now()
  });

  await newPasswordVault.save();

  return res.status(200).json({
    sucess: true,
    message: 'New Password Vault created',
    newPasswordVault
  });
}

module.exports = {
  create
};
