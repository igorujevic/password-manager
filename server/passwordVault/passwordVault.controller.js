"use strict";

const { AUTH_SECRET } = process.env;
const CryptoJS = require("crypto-js");
const PasswordVault = require("./passwordVault.model");

async function create(req, res) {
  // get user from saved user in req
  const user = req.user;
  const key512Bits1000Iterations = CryptoJS.PBKDF2(
    AUTH_SECRET,
    user.username,
    {
      keySize: 512 / 32,
      iterations: 1000
    }
  );
  // get body data
  const { pageUrl, name, password } = req.body;
  // encrypt
  const encryptedPassword = await CryptoJS.AES.encrypt(
    password,
    key512Bits1000Iterations.toString()
  );

  const newPasswordVault = new PasswordVault({
    pageUrl,
    name,
    password: encryptedPassword.toString(),
    userId: user._id,
    createdAt: Date.now()
  });

  await newPasswordVault.save();

  return res.status(200).json({
    success: true,
    message: "New Password Vault created",
    newPasswordVault
  });
}

async function getAll(req, res) {
  // get user id from saved user in req
  const user = req.user;
  const key512Bits1000Iterations = CryptoJS.PBKDF2(
    AUTH_SECRET,
    user.username,
    {
      keySize: 512 / 32,
      iterations: 1000
    }
  );

  const passwords = await PasswordVault.find({
    userId: user._id,
    name: { $regex: req.query.search ? req.query.search : "" }
  }).sort({
    createdAt: "desc"
  });

  const newArray = [];
  passwords.forEach(async element => {
    const decrypted = await CryptoJS.AES.decrypt(
      element.password,
      key512Bits1000Iterations.toString()
    );
    element.password = decrypted.toString(CryptoJS.enc.Utf8);
    newArray.push(element);
  });

  return res.status(200).json({
    success: true,
    message: "All users passwords",
    passwords: await newArray
  });
}

async function update(req, res) {
  const user = req.user;
  const paramsId = req.params.id;
  const body = req.body;
  const key512Bits1000Iterations = CryptoJS.PBKDF2(
    AUTH_SECRET,
    user.username,
    {
      keySize: 512 / 32,
      iterations: 1000
    }
  );

  // encrypt
  const newPassword = await CryptoJS.AES.encrypt(
    body.password,
    key512Bits1000Iterations.toString()
  );

  const updatedPasswordVault = await PasswordVault.findOneAndUpdate(
    { _id: paramsId, userId: user._id },
    {
      pageUrl: body.pageUrl,
      name: body.name,
      password: newPassword.toString(),
      updatedAt: Date.now()
    },
    { new: true, useFindAndModify: false }
  );

  return res.status(200).json({
    success: true,
    message: "Password Vault updated successfully",
    updatedPasswordVault
  });
}

async function deleteOne(req, res) {
  const user = req.user;
  const paramsId = req.params.id;

  const deletedPasswordVault = await PasswordVault.findOneAndDelete({
    _id: paramsId,
    userId: user._id
  });

  return res.status(200).json({
    success: true,
    message: "Password Vault deleted successfully",
    deletedPasswordVault
  });
}

async function getAllAdmin(req, res) {
  if (!req.user.admin) return res.status(403).send({ success: false, message: 'Forbidden. Only for admin!' });
  const passwords = await PasswordVault.find();
  return res.send({ success: true, passwords });
}

module.exports = {
  create,
  getAll,
  update,
  deleteOne,
  getAllAdmin
};
