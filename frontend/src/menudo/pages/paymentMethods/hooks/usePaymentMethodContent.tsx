import { useExpenses } from "../../expenses/hooks/useExpenses";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { usePaymentMethods } from "../api/usePaymentMethods";
import { useDeletePaymentMethod } from "../api/useDeletePaymentMethod";
import { usePaymentMethod } from "../api/usePaymentMethod";

export const usePaymentMethodContent = () => {
  const paymentMethods = usePaymentMethods();
  const expenses = useExpenses();

  const paymentMethodsData = paymentMethods.data;
  const expensesData = expenses.data;
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("paymentMethod");

  const { ...rest } = usePaymentMethod(id || "");
  const mutation = useDeletePaymentMethod();

  const handleDelete = async () => {
    const params = new URLSearchParams();
    if (!id) {
      setSearchParams(params);
      return;
    }
    await mutation.mutate(id, {
      onSuccess: () => {
        toast.success("Metodo de pago eliminado exitosamente");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    setSearchParams(params);
  };

  return {
    paymentMethodsData,
    expensesData,
    ...rest,
    handleDelete,
    isPending: mutation.isPending,
  };
};
