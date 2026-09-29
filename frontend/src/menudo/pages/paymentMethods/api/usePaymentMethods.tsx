import { useQuery } from "@tanstack/react-query";
import { getPaymentMethods } from "../actions/get-payment-methods.action";

export const usePaymentMethods = () => {
  const data = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: getPaymentMethods,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
