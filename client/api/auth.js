import axios from 'axios';

const baseURL = process.env.VUE_APP_API_PATH;

const url = {
  register: '/users/register',
  login: '/users/login',
  verify: '/users/verify',
  getUserData: '/users'
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
  return axios.get(`http://localhost:3000${baseURL}${url.verify}`, params);
}

export default {
  register,
  login,
  verify,
  getUserData
};
