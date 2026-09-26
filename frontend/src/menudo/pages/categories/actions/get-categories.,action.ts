import { menudoApi } from "../../../../api/menudo-api";
import type { Category } from "../../../../types/category.interface";

export const getPaymentMethods = async (): Promise<Category[]> => {
  try {
    const { data } = await menudoApi.get<Category[]>("/expenses");
    return data;
  } catch (error) {
    throw error;
  }
};
