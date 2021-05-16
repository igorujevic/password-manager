import axios from 'axios';

const baseURL = process.env.VUE_APP_API_PATH;

const url = {
  register: '/users/register',
  login: '/users/login',
  verify: '/users/verify',
  getUserData: '/users',
  updateUserData: '/users',
  updatePassword: '/users/password',
  getAllUsers: '/users'
};

function register(userData) {
  return axios.post(`http://localhost:3000${baseURL}${url.register}`, userData);
}

function login(userData) {
  return axios.post(`http://localhost:3000${baseURL}${url.login}`, userData);
}

function verify(params) {
  return axios.get(`http://localhost:3000${baseURL}${url.verify}`, params);
}

function getUserData(params) {
  return axios.get(`http://localhost:3000${baseURL}${url.getUserData}`, params);
}

function updateUserData(updateData, params) {
  return axios.put(`http://localhost:3000${baseURL}${url.getUserData}`, updateData, params);
}

function updatePassword(updateData, params) {
  return axios.put(`http://localhost:3000${baseURL}${url.updatePassword}`, updateData, params);
}

function getAllUsers(params) {
  return axios.get(`http://localhost:3000${baseURL}${url.getAllUsers}`, params);
}

export default {
  register,
  login,
  verify,
  getUserData,
  updateUserData,
  updatePassword,
  getAllUsers
};
