import axios from 'axios';
import store from '../Store';

const axiosInstance = axios.create({
  baseURL: store.getters.apiUrl
});

axiosInstance.interceptors.request.use(config => {
  const token = store.getters.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
