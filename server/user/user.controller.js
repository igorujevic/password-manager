'use strict';

const { AUTH_JWT_SECRET, AUTH_SALT_ROUNDS } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateRandomString } = require('../helpers/functions');
const User = require('./user.model');

const round = parseInt(AUTH_SALT_ROUNDS);

async function register(req, res) {
  const { username, email, password, firstName, lastName } = req.body;

  // Check if this user already exisits
  const userUniqueEmail = await User.findOne({ email });
  if (userUniqueEmail) return res.status(400).json({ success: false, message: 'Unabale to register with this mail. Email needs to be unique. Try another one.' });

  const salt = await bcrypt.genSalt(round);

  const newUser = new User({
    username: `${email.split('@')[0]}-${generateRandomString(8)}`,
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, salt),
    admin: false,
    active: false,
    createdAt: Date.now()
  });
  await newUser.save();

  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email
    },
    AUTH_JWT_SECRET,
    {
      expiresIn: '3h'
    }
  );
  return res.status(200).json({
    success: true,
    message: 'User registered',
    token,
    userData: {
      userId: newUser._id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt,
      admin: newUser.admin
    }
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: 'Auth failed!' });
  const status = await bcrypt.compare(password, user.password);
  if (!status) return res.status(401).json({ success: false, message: 'Auth failed!' });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    AUTH_JWT_SECRET,
    {
      expiresIn: '3h'
    }
  );
  return res.status(200).json({
    success: true,
    message: 'Auth successful!',
    token,
    userData: {
      userId: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      admin: user.admin
    }
  });
}

async function verify(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(404).send({ success: false, message: 'Token is missing' });
  try {
    const decoded = jwt.verify(token, AUTH_JWT_SECRET);
    return res.status(200).send(decoded);
  } catch (err) {
    return res.status(401).send(err);
  }
}

async function getAll(req, res) {
  if (!req.user.admin) return res.status(403).send({ success: false, message: 'Forbidden. Only for admin!' });
  const users = await User.find();
  return res.send({ success: true, users });
}

async function getUserData(req, res) {
  const userId = req.params.id;
  // find that user
  const user = await User.findOne({ _id: userId });
  // check if admin
  if (user) return res.status(200).send({ success: true, user });
  else return res.send({ success: false, message: 'Can not get user data or user does not exist.' });
}

async function updateUser(req, res) {
  // get token from header
  const token = req.headers.authorization.split(' ')[1];
  // decode token
  const decoded = jwt.decode(token, AUTH_JWT_SECRET);
  // request body
  const body = req.body;

  const updatedUser = await User.findByIdAndUpdate({ _id: decoded.id }, {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    updatedAt: Date.now()
  }, { useFindAndModify: false, new: true });

  if (!updatedUser) return res.status(400).send({ success: false, message: 'Something went wrong' });
  else return res.status(201).send({
    success: true,
    message: 'Updated successfuly',
    userData: {
      userId: updatedUser._id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      admin: updatedUser.admin
    }
  });
}

async function updateUserPassword(req, res) {
  const salt = await bcrypt.genSalt(round);
  // get token from header
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(403).send({ success: false, message: 'Forbidden' });
  // decode token
  const decoded = jwt.decode(token, AUTH_JWT_SECRET);
  // find that user
  const user = await User.findOne({ email: decoded.email });
  const status = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!status) return res.status(403).json({ success: false, message: 'Wrong password' });
  else {
    const newPassword = await bcrypt.hash(req.body.newPassword, salt);
    const updatedUser = await User.findByIdAndUpdate({ _id: decoded.id }, {
      password: newPassword,
      updatedAt: Date.now()
    }, { useFindAndModify: false });

    if (!updatedUser) return res.status(400).send({ success: false, message: 'Something went wrong' });
    else return res.status(201).send({ success: true, message: 'Successfully changed password' });
  }
}

async function deleteUser(req, res) {
  if (!req.user.admin) return res.status(403).send({ success: false, message: 'Forbidden. Only for admin.' });

  const userId = req.params.id;

  let deleted = await User.findByIdAndRemove({ _id: userId })
  if (!deleted) return res.status(404).send({ success: false, message: `Error while trying to delete user with id(${userId}).` })
  else return res.status(200).send({ success: true, message: `User with id(${userId}) deleted.` });
}

async function deleteUserAccount(req, res) {
  const userId = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(404).send({ success: false, message: 'Token is missing' });

  try {
    const { id } = jwt.verify(token, AUTH_JWT_SECRET);
    const user = await User.findById({ _id: id });

    if (userId === user._id.toString()) {
      let deleted = await User.findByIdAndRemove({ _id: userId })
      if (!deleted) return res.status(404).send({ success: false, message: `Error while trying to delete user with id(${userId}).` })
      else return res.status(200).send({ success: true, message: `User with id(${userId}) deleted.` });
    }
    else {
      return res.status(404).send({ success: false, message: `Error while trying to delete user with id(${userId}). Token and user id are not matching.` })
    }
  } catch (error) {
    return res.status(404).send({ success: false, message: `Error while trying to delete user with id(${userId}). Token and user id are not matching.` })
  }


}

module.exports = {
  register,
  login,
  getAll,
  getUserData,
  updateUser,
  updateUserPassword,
  verify,
  deleteUser,
  deleteUserAccount
};
