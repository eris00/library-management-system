import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const DEV_FALLBACK_TOKEN = ""; // token from Postman

api.interceptors.request.use((config) => {
  let token = localStorage.getItem('token');
  if (!token) token = DEV_FALLBACK_TOKEN;
  config.headers['Accept'] = 'application/json';
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default api;