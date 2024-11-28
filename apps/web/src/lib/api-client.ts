// Nothing fancy! Simple client, axios isnt really needed anymore these days.

import Axios, { InternalAxiosRequestConfig } from 'axios';

function apiRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }
  return config;
}

export const api = Axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(apiRequestInterceptor);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);
