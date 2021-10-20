import axios from 'axios';

//const baseUrl = 'https://intermediario-api.sanjua.com';
const baseUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
const version = 'api/v1';

const auth = {
  login: (data, headers) => axios.post(`${baseUrl}/${version}/auth/login`, data, headers),
  register: (data, headers) => axios.post(`${baseUrl}/${version}/auth/register`, data, headers)
};

const article = {
  get: (data, headers) => axios.get(`${baseUrl}/${version}/articles/${data.id}?by=${data.by}`, headers),
  getArticles: (data, headers) => axios.get(`${baseUrl}/${version}/articles${data.query}`, headers),
  getArticlesSearch: (data, headers) => axios.get(`${baseUrl}/${version}/articles${data}`, headers),
  getArticlesRelated: (data, headers) => axios.get(`${baseUrl}/${version}/articles/${data.id}/related${data.filter}`, headers),
  post: (data, headers) => axios.post(`${baseUrl}/${version}/articles`, data, headers),
  put: (data, headers) => axios.put(`${baseUrl}/${version}/articles/${data.id}`, data, headers),
};

const cover = {
  get: (data, headers) => axios.get(`${baseUrl}/${version}/covers`, headers),
  post: (data, headers) => axios.post(`${baseUrl}/${version}/covers`, data, headers)
};

const category = {
  get: (data, headers) => axios.get(`${baseUrl}/${version}/categories?type=${data.type}`, headers),
  put: (data, headers) => axios.put(`${baseUrl}/${version}/categories`, data, headers)  
}

const contact = {
  add:(data, headers) => axios.post(`${baseUrl}/${version}/contacts`, data, headers) 
}

const tag = {
  add:(dataModel, headers) => axios.post(`${baseUrl}/${version}/tags`, dataModel, headers) 
}

const upload = {
  post: (dataModel, headers) => axios.post(`${baseUrl}/${version}/upload`, dataModel, headers)
};

const uploadVideo = {
  post: (dataModel, headers) => axios.post(`${baseUrl}/${version}/upload-video`, dataModel, headers)
};

const video = {
  post: (dataModel, headers) => axios.post(`${baseUrl}/${version}/videos`, dataModel, headers)
};

export default {
  auth,
  article,
  cover,
  category,
  contact,
  tag,
  upload,
  uploadVideo,
  video
}