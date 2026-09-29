import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePaymentMethodAction } from "../actions/delete-payment-method.action";

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePaymentMethodAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    retry: false,
  });

  return mutation;
};
