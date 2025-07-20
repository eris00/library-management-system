import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const DEV_FALLBACK_TOKEN = ""; // token from Postman

api.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json';

  let token = localStorage.getItem('token');
  if (!token) token = DEV_FALLBACK_TOKEN;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  if (
    config.data &&
    typeof config.data === 'object' &&
    !(config.data instanceof FormData)
  ) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

export default api;