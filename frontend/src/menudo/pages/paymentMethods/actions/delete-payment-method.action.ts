import { menudoApi } from "../../../../api/menudo-api";

export const deletePaymentMethodAction = async (id: string): Promise<void> => {
  if (!id) throw new Error("El ID es requerido");
  if (isNaN(+id)) throw new Error("ID invalido");

  try {
    await menudoApi.delete(`/paymentMethods/${id}`);
  } catch (error) {
    throw error;
  }
};
