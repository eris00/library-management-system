import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const DEV_FALLBACK_TOKEN = ""; // token from Postman

const anonymousRoutes = ['/login', '/register', '/forgot_password'];

api.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json';

  const token = localStorage.getItem('token') || DEV_FALLBACK_TOKEN;;
  const apiKey = import.meta.env.VITE_API_KEY;

  const isAnonymousRoute = config.url && anonymousRoutes.some(route => config.url.endsWith(route));

  if (isAnonymousRoute) {
    config.headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

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