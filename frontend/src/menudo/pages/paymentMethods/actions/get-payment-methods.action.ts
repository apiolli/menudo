import { menudoApi } from "../../../../api/menudo-api";
import type { PaymentMethod } from "../../../../types/payment-method";

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  try {
    const { data } = await menudoApi.get<PaymentMethod[]>("/expenses");
    return data;
  } catch (error) {
    throw error;
  }
};
