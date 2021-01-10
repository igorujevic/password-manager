import axios from 'axios';

const baseURL = process.env.VUE_APP_API_PATH;
const config = { baseURL };
const client = axios.create(config);
client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
client.interceptors.response.use(res => res, err => Promise.reject(err.response));

export default client;
