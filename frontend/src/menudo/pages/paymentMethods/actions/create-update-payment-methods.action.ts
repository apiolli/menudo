import { isAxiosError } from "axios";
import { menudoApi } from "../../../../api/menudo-api";
import type { PaymentMethod } from "../../../../types/payment-method";

export const createUpdatePaymentMethodAction = async (
  paymentMethod: Partial<PaymentMethod>,
): Promise<PaymentMethod> => {
  const { id, ...rest } = paymentMethod;
  console.log({ paymentMethod });

  try {
    const { data } = await menudoApi<PaymentMethod>({
      url: id ? `/paymentMethods/${id}` : "/paymentMethods",
      method: id ? "PUT" : "POST",
      data: rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data.details);
    }
    throw error;
  }
};
