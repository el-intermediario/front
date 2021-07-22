import axios from 'axios';

const baseUrl = 'http://localhost:8080';//'https://api.sanjua.com';
const baseS3 = 'https://sanjua-app.s3.amazonaws.com';
const version = 'api/v1';

const auth = {
  login: (dataModel, headers) => axios.post(`${baseUrl}/${version}/auth/login`, dataModel, headers)
};

export default {
  auth,
}