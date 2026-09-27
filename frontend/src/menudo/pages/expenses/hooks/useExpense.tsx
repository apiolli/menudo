import { useQuery } from "@tanstack/react-query";
import { getExpenseByIdAction } from "../actions/get-expense-by-id.action";

export const useExpense = (id: string) => {
  const {
    data: expense,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expense", { id }],
    queryFn: () => getExpenseByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  return {
    expense: expense,
    isError,
    isLoading,
    error: error?.message,
  };
};
