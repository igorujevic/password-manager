'use strict';

const { AUTH_JWT_SECRET, AUTH_SALT_ROUNDS } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const round = parseInt(AUTH_SALT_ROUNDS);

async function register(req, res) {
  const { username, email, password } = req.body;

  // Check if this user already exisits
  const userUniqueEmail = await User.findOne({ email });
  if (userUniqueEmail) return res.status(400).json({ sucess: false, message: 'Unabale to register with this mail. Email needs to be unique. Try another one.' });
  // Check if this user already exisits
  const userUniqueUsername = await User.findOne({ username });
  if (userUniqueUsername) return res.status(400).json({ sucess: false, message: 'Unabale to register with this username. Username needs to be unique. Try another one.' });

  const salt = await bcrypt.genSalt(round);

  const newUser = new User({
    username,
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
    sucess: true,
    message: 'User registered',
    newUser,
    token
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: 'Auth failed!' });
  const status = await bcrypt.compare(password, user.password);
  if (!status) return res.status(401).json({ sucess: false, message: 'Auth failed!' });
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
    sucess: true,
    message: 'Auth successful!',
    token,
    userData: {
      userId: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
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
  // get token from header
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(403).send({ success: false, message: 'Forbidden' });
  // decode token
  const decoded = jwt.decode(token, AUTH_JWT_SECRET);
  // find that user
  const user = await User.findOne({ email: decoded.email });
  // check if admin
  if (!user.admin) return res.status(403).send({ success: false, message: 'Forbidden' });
  const users = await User.find();
  return res.send({ success: true, users });
}

async function updateUser(req, res) {
  // get token from header
  const token = req.headers.authorization.split(' ')[1];
  // decode token
  const decoded = jwt.decode(token, AUTH_JWT_SECRET);
  // request body
  const body = req.body;

  const updatedUser = await User.findByIdAndUpdate({ _id: decoded.id }, {
    username: body.username,
    email: body.email,
    updatedAt: Date.now()
  }, { useFindAndModify: false });

  if (!updatedUser) return res.status(400).send({ sucess: false, message: 'Something went wrong' });
  else return res.status(201).send(updatedUser);
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
  if (!status) return res.status(403).json({ sucess: false, message: 'Wrong password' });
  else {
    const newPassword = await bcrypt.hash(req.body.newPassword, salt);
    const updatedUser = await User.findByIdAndUpdate({ _id: decoded.id }, {
      password: newPassword,
      updatedAt: Date.now()
    }, { useFindAndModify: false });

    if (!updatedUser) return res.status(400).send({ sucess: false, message: 'Something went wrong' });
    else return res.status(201).send({ sucess: true, message: 'Successfully changed password' });
  }
}

module.exports = {
  register,
  login,
  getAll,
  updateUser,
  updateUserPassword,
  verify
};
