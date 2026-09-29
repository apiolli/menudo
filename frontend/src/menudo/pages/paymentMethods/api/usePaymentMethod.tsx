import { useQuery } from "@tanstack/react-query";
import { getPaymentMethodById } from "../actions/get-payment-method-by-id.action";

export const usePaymentMethod = (id: string) => {
  const {
    data: paymentMethod,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentMethod", { id }],
    queryFn: () => getPaymentMethodById(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  return {
    paymentMethod: paymentMethod,
    isError,
    isLoading,
    error: error?.message,
  };
};
