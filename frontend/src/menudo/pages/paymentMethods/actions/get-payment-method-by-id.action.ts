import { menudoApi } from "../../../../api/menudo-api";
import type { PaymentMethod } from "../../../../types/payment-method";

export const getPaymentMethodById = async (
  id: string,
): Promise<PaymentMethod> => {
  if (!id) throw new Error("El ID es requerido");
  if (isNaN(+id)) throw new Error("ID invalido");

  try {
    const { data } = await menudoApi.get<PaymentMethod>(
      `/paymentMethods/${id}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
