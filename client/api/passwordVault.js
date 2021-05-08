import axios from 'axios';

const baseURL = process.env.VUE_APP_API_PATH;

const url = {
  create: '/password-vault/create',
  getAll: '/password-vault',
  deleteOne: '/password-vault/delete'
};

function create(data, params) {
  return axios.post(`http://localhost:3000${baseURL}${url.create}`, data, params);
}

function getAll(params) {
  return axios.get(`http://localhost:3000${baseURL}${url.getAll}`, params);
}

function deleteOne(id, params) {
  console.log(id);
  console.log(params);
  return axios.delete(`http://localhost:3000${baseURL}${url.deleteOne}/${id}`, params);
}

export default {
  create,
  getAll,
  deleteOne
};
