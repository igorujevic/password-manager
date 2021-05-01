import axios from 'axios';

const baseURL = process.env.VUE_APP_API_PATH;

const url = {
  create: '/password-vault/create',
  getAll: '/password-vault'
};

function create(data, params) {
  return axios.post(`http://localhost:3000${baseURL}${url.create}`, data, params);
}

function getAll(params) {
  return axios.get(`http://localhost:3000${baseURL}${url.getAll}`, params);
}

export default {
  create,
  getAll
};
