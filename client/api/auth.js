import axios from 'axios';

const baseURL = process.env.VUE_APP_API_PATH;

const url = {
  register: '/users/register',
  login: '/users/login'
};

function register(userData) {
  return axios.post(`http://localhost:3000${baseURL}${url.register}`, userData);
}

function login(userData) {
  return axios.post(`http://localhost:3000${baseURL}${url.login}`, userData);
}

export default {
  register,
  login
};
