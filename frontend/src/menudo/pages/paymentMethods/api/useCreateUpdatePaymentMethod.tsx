import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdatePaymentMethodAction } from "../actions/create-update-payment-methods.action";
import type { PaymentMethod } from "../../../../types/payment-method";

export const useCreateUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUpdatePaymentMethodAction,
    onSuccess: (paymentMethod: PaymentMethod) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({
        queryKey: ["paymentMethod", { id: paymentMethod.id }],
      });
      queryClient.setQueryData(
        ["paymentMethods", { id: paymentMethod.id }],
        paymentMethod,
      );
    },
    retry: false,
  });

  return mutation;
};
