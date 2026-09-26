import axios from "axios";

const menudoApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

// Aplicamos el interceptor global para las peticiones
menudoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { menudoApi };
