import axios from 'axios';

const noctiApi = axios.create({
  baseURL: '/api',
});

export default noctiApi;
