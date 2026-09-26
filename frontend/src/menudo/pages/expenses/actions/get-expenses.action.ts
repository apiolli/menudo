import { menudoApi } from "../../../../api/menudo-api";
import type { Expense } from "../../../../types/expense.interface";

export const getExpensesAction = async (): Promise<Expense[]> => {
  try {
    const { data } = await menudoApi.get<Expense[]>("/expenses");
    return data;
  } catch (error) {
    throw error;
  }
};
