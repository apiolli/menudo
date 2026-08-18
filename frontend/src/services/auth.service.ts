import { api } from "../lib/api";

// Tipado basado en tu RegisterDTO de C#
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegisterPayload) {
    // Esto hará la petición POST a tu endpoint de .NET
    const response = await api.post("/api/auth/register", data);
    return response.data;
  },

  async login(credentials: { email: string; password: string }) {
    const response = await api.post("/api/auth/login", credentials);
    // Supongamos que tu backend devuelve un objeto con { token: "..." }
    if (response.data.token) {
      localStorage.setItem("jwt_token", response.data.token);
    }
    return response.data;
  },
};
