import axios from "axios";

const API_BASE_URL = "http://localhost:5091";

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

  // Si mandan un body, lo pasamos directamente a Axios sin intentar hacerle JSON.parse
  const data = options.body;

  const response = await api.request<T>({
    url: endpoint,
    method,
    data,
    ...options,
  });

  return response.data;
};
