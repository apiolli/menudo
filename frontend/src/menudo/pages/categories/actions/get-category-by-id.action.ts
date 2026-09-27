import { menudoApi } from "../../../../api/menudo-api";
import type { Category } from "../../../../types/category.interface";

export const getCategoryById = async (id: string): Promise<Category> => {
  if (!id) throw new Error("El ID es requerido");
  if (isNaN(+id)) throw new Error("ID invalido");

  try {
    const { data } = await menudoApi.get<Category>(`/categories/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
