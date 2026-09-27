import { menudoApi } from "../../../../api/menudo-api";

export const deleteCategoryAction = async (id: string): Promise<void> => {
  if (!id) throw new Error("El ID es requerido");
  if (isNaN(+id)) throw new Error("ID invalido");

  try {
    await menudoApi.delete(`/categories/${id}`);
  } catch (error) {
    throw error;
  }
};
