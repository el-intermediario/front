import axios from 'axios';

const baseUrl = 'http://localhost:8080';//'https://api.sanjua.com';
const baseS3 = 'https://sanjua-app.s3.amazonaws.com';
const version = 'api/v1';

const auth = {
  login: (dataModel, headers) => axios.post(`${baseUrl}/${version}/auth/login`, dataModel, headers),
  register: (dataModel, headers) => axios.post(`${baseUrl}/${version}/auth/register`, dataModel, headers)
};

const article = {
  get: (path, headers) => axios.get(`${baseUrl}/${version}/articles/${path}`, headers),
  getArticles: (dataModel, headers) => axios.get(`${baseUrl}/${version}/articles`, headers),
  add: (dataModel, headers) => axios.post(`${baseUrl}/${version}/articles`, dataModel, headers)
};

const upload = {
  post: (dataModel, headers) => axios.post(`${baseUrl}/${version}/upload`, dataModel, headers)
};

export default {
  auth,
  article,
  upload,
}