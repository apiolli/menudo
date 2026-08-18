import { apiClient } from "../lib/api";

export interface UserDTO {
  id: string; // GUID en .NET se maneja como string en TS
  name: string;
  email: string;
}

export interface UpdateUserDTO {
  name: string;
  email: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  // Obtener el perfil del usuario actual (Consume GET /api/users/me)
  async getProfile(): Promise<UserDTO> {
    return await apiClient<UserDTO>("/api/users/me");
  },

  // Actualizar los datos del perfil (Consume PUT /api/users/me)
  async updateProfile(data: UpdateUserDTO): Promise<UserDTO> {
    return await apiClient<UserDTO>("/api/users/me", {
      method: "PUT",
      body: data,
    });
  },

  // Cambiar contraseña (Consume PUT /api/users/me/password)
  async changePassword(data: ChangePasswordDTO): Promise<void> {
    await apiClient("/api/users/me/password", {
      method: "PUT",
      body: data,
    });
  },

  // Eliminar cuenta/perfil (Consume DELETE /api/users/me)
  async deleteProfile(): Promise<void> {
    await apiClient("/api/users/me", {
      method: "DELETE",
    });
  },
};
