import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://localhost:7254";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const apiClient = async <T>(
  endpoint: string,
  options: any = {},
): Promise<T> => {
  const method = options.method || "GET";
  const data = options.body ? JSON.parse(options.body) : undefined;

  const response = await api.request<T>({
    url: endpoint,
    method,
    data,
    ...options,
  });

  return response.data;
};
