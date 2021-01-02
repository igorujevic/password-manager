'use strict';

const { AUTH_SALT_ROUNDS } = process.env;
const bcrypt = require('bcrypt');
const User = require('./user.model');

const round = parseInt(AUTH_SALT_ROUNDS);

async function register(req, res) {
  const { username, email, password } = req.body;

  // Check if this user already exisits
  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ message: 'Email already taken.' });

  const salt = await bcrypt.genSalt(round);

  const newUser = new User({
    username,
    email,
    password: await bcrypt.hash(password, salt)
  });
  await newUser.save();
  return res.status(200).json({
    message: 'User registered',
    newUser
  });
}

async function login(req, res) {
  const result = await bcrypt.compare('user_password', req.body.value);
  return res.status(202).json({
    message: result
  });
}

module.exports = {
  register,
  login
};
