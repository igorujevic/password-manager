'use strict';

const { AUTH_JWT_SECRET, AUTH_SALT_ROUNDS } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const round = parseInt(AUTH_SALT_ROUNDS);

async function register(req, res) {
  const { username, email, password } = req.body;

  // Check if this user already exisits
  const user = await User.findOne({ email });

  if (user) return res.status(201).json({ message: 'Unabale to register with this mail. Try another one.' });

  const salt = await bcrypt.genSalt(round);

  const newUser = new User({
    username,
    email,
    password: await bcrypt.hash(password, salt),
    admin: true,
    active: false,
    createdAt: Date.now()
  });
  await newUser.save();
  return res.status(200).json({
    message: 'User registered',
    newUser
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Auth failed!' });
  const status = await bcrypt.compare(password, user.password);
  if (!status) return res.status(401).json({ message: 'Auth failed!' });
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
    message: 'Auth successful!',
    token
  });
}

async function getAll(req, res) {
  const users = await User.find();
  return res.send({ users });
}

module.exports = {
  register,
  login,
  getAll
};
