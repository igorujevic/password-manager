'use strict';

const { AUTH_JWT_SECRET } = process.env;
const CryptoJS = require('crypto-js');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const PasswordVault = require('./passwordVault.model');

// const round = parseInt(AUTH_SALT_ROUNDS);

async function create(req, res) {
  // get user id from saved user in req
  const { user } = req.user;
  const key512Bits1000Iterations = CryptoJS.PBKDF2(AUTH_JWT_SECRET, user.username, {
    keySize: 512 / 32,
    iterations: 1000
  });
  // get body data
  const { pageUrl, name, password } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[0] && authHeader.split(' ')[1];
  if (!token) res.status(401).json({ message: 'Unauthorized!' });

  // encrypt
  const encryptedPassword = await CryptoJS.AES.encrypt(password, key512Bits1000Iterations.toString());

  const newPasswordVault = new PasswordVault({
    pageUrl,
    name,
    password: encryptedPassword.toString(),
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

async function getAll(req, res) {
  // get user id from saved user in req
  const { user } = req.user;
  const key512Bits1000Iterations = CryptoJS.PBKDF2(AUTH_JWT_SECRET, user.username, {
    keySize: 512 / 32,
    iterations: 1000
  });

  const passwords = await PasswordVault.find({ userId: user._id });

  const newArray = [];
  passwords.forEach(async element => {
    const decrypted = await CryptoJS.AES.decrypt(element.password, key512Bits1000Iterations.toString());
    element.password = decrypted.toString(CryptoJS.enc.Utf8);
    newArray.push(element);
  });

  return res.status(200).json({
    sucess: true,
    message: 'All users passwords',
    passwords: await newArray
  });
}

async function update(req, res) {
  const { user } = req.user;
  const paramsId = req.params.id;
  const body = req.body;
  const key512Bits1000Iterations = CryptoJS.PBKDF2(AUTH_JWT_SECRET, user.username, {
    keySize: 512 / 32,
    iterations: 1000
  });

  // encrypt
  const newPassword = await CryptoJS.AES.encrypt(body.password, key512Bits1000Iterations.toString());

  const updatedPasswordVault = await PasswordVault.findOneAndUpdate({ _id: paramsId, userId: user._id }, {
    pageUrl: body.pageUrl,
    name: body.name,
    password: newPassword.toString(),
    updatedAt: Date.now()
  }, { new: true, useFindAndModify: false });

  return res.status(200).json({
    sucess: true,
    message: 'Password Vault updated successfully',
    updatedPasswordVault
  });
}

module.exports = {
  create,
  getAll,
  update
};
