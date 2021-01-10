import client from './client';

const url = {
  register: '/users/register',
  login: '/users/login'
};

function register(userData) {
  return client.post(url.register, userData);
}

function login(userData) {
  return client.post(url.login, userData);
}

export default {
  register,
  login
};
