'use strict';
const { AUTH_JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../../user/user.model');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[0] && authHeader.split(' ')[1];
  if (!token) res.status(401).json({ message: 'Unauthorized!' });
  try {
    const { id } = jwt.verify(token, AUTH_JWT_SECRET);
    const user = await User.findById({ _id: id });
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) return res.status(401).json({ message: 'Token is invalid!' });
    if (error instanceof jwt.TokenExpiredError) return res.status(401).json({ message: 'Token is expired!' });
    throw error;
  }
}

module.exports = authenticate;
