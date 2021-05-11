import axios from "axios";

const baseURL = process.env.VUE_APP_API_PATH;

const url = {
  create: "/password-vault/create",
  getAll: "/password-vault",
  deleteOne: "/password-vault/delete",
  update: "/password-vault/update"
};

function create(data, params) {
  return axios.post(
    `http://localhost:3000${baseURL}${url.create}`,
    data,
    params
  );
}

function getAll(params) {
  return axios.get(`http://localhost:3000${baseURL}${url.getAll}`, params);
}

function deleteOne(id, params) {
  return axios.delete(
    `http://localhost:3000${baseURL}${url.deleteOne}/${id}`,
    params
  );
}

function update(id, data, params) {
  return axios.put(
    `http://localhost:3000${baseURL}${url.update}/${id}`,
    data,
    params
  );
}

export default {
  create,
  getAll,
  deleteOne,
  update
};
