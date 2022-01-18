import axios from 'axios';

// const baseUrl = 'https://api-intermediario.sanjua.com';
const baseUrl = 'https://intermediario-prod-api.azurewebsites.net';
// const baseUrl = window.location.protocol + '//' + window.location.hostname + ':3001';
const space = 'https://intermediario-dev.sfo3.digitaloceanspaces.com/';
const version = 'api/v1';

const ad = {
  add:(dataModel, headers) => axios.post(`${baseUrl}/${version}/ads`, dataModel, headers),
  getAds: (data, headers) => axios.get(`${baseUrl}/${version}/ads`, headers),
}

const auth = {
  login: (data, headers) => axios.post(`${baseUrl}/${version}/auth/login`, data, headers),
  register: (data, headers) => axios.post(`${baseUrl}/${version}/auth/register`, data, headers)
};

const article = {
  get: (data, headers) => axios.get(`${baseUrl}/${version}/articles/${data.id}?by=${data.by}`, headers),
  getArticles: (data, headers) => axios.get(`${baseUrl}/${version}/articles${data.query}`, headers),
  getArticlesOffset: (data, headers) => axios.get(`${baseUrl}/${version}/articles${data.query}`, headers),
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
  post: (dataModel, headers) => axios.post(`${baseUrl}/${version}/uploadAzure`, dataModel, headers)
};

const uploadVideo = {
  post: (dataModel, headers) => axios.post(`${baseUrl}/${version}/upload-video`, dataModel, headers)
};

const video = {
  post: (dataModel, headers) => axios.post(`${baseUrl}/${version}/videos`, dataModel, headers),
  getVideos: (params, headers) => axios.get(`${baseUrl}/${version}/videos?${params}`, headers)
};

export default {
  ad,
  auth,
  article,
  cover,
  category,
  contact,
  space,
  tag,
  upload,
  uploadVideo,
  video
}