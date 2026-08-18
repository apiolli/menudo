import { apiClient } from "../lib/api";

export interface Category {
  id: string;
  name: string;
  budget: number;
  status: number;
  color: string;
  icon: string;
}

export interface CreateCategoryDTO {
  name: string;
  budget: number;
  status: number;
  color: string;
  icon: string;
}

export const categoryService = {
  // Obtener todas las categorías
  async getAll(): Promise<Category[]> {
    return await apiClient<Category[]>("/api/categories");
  },

  // Crear una categoría nueva
  async create(data: CreateCategoryDTO): Promise<Category> {
    return await apiClient<Category>("/api/categories", {
      method: "POST",
      body: data,
    });
  },

  // Actualizar una categoría existente
  async update(id: string, data: CreateCategoryDTO): Promise<Category> {
    return await apiClient<Category>(`/api/categories/${id}`, {
      method: "PUT", // O PATCH, según cómo esté definido en tu controlador de .NET
      body: data,
    });
  },

  // Eliminar una categoría
  async delete(id: string): Promise<void> {
    await apiClient(`/api/categories/${id}`, {
      method: "DELETE",
    });
  },
};
