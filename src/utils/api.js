import axios from 'axios';

const baseUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
const version = 'api/v1';

const auth = {
  login: (dataModel, headers) => axios.post(`${baseUrl}/${version}/auth/login`, dataModel, headers),
  register: (dataModel, headers) => axios.post(`${baseUrl}/${version}/auth/register`, dataModel, headers)
};

const article = {
  get: (data, headers) => axios.get(`${baseUrl}/${version}/articles/${data.id}?by=${data.by}`, headers),
  getArticles: (dataModel, headers) => axios.get(`${baseUrl}/${version}/articles`, headers),
  getArticlesSearch: (dataModel, headers) => axios.get(`${baseUrl}/${version}/articles${dataModel}`, headers),
  add: (dataModel, headers) => axios.post(`${baseUrl}/${version}/articles`, dataModel, headers),
};

const cover = {
  get: (data, headers) => axios.get(`${baseUrl}/${version}/covers/${data.id}`, headers),
  post: (dataModel, headers) => axios.post(`${baseUrl}/${version}/covers`, dataModel, headers)
};

const category = {
  get: (path, headers) => axios.get(`${baseUrl}/${version}/categories/${path}`, headers),
  getCategories: (dataModel, headers) => axios.get(`${baseUrl}/${version}/categories`, headers),
  add: (dataModel, headers) => axios.post(`${baseUrl}/${version}/categories`, dataModel, headers)  
}

const contact = {
  add:(dataModel, headers) => axios.post(`${baseUrl}/${version}/contacts`, dataModel, headers) 
}

const tag = {
  add:(dataModel, headers) => axios.post(`${baseUrl}/${version}/tags`, dataModel, headers) 
}

const upload = {
  post: (dataModel, headers) => axios.post(`${baseUrl}/${version}/upload`, dataModel, headers)
};

export default {
  auth,
  article,
  category,
  contact,
  tag,
  upload,
  cover
}