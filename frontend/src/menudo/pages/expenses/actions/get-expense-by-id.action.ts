import { menudoApi } from "../../../../api/menudo-api";
import type { Expense } from "../../../../types/expense.interface";

export const getExpenseByIdAction = async (id: string): Promise<Expense> => {
  if (!id) throw new Error("El ID es requerido");
  if (isNaN(+id)) throw new Error("ID invalido");

  try {
    const { data } = await menudoApi.get<Expense>(`/expenses/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
