import { useQuery } from "@tanstack/react-query";
import { getExpensesAction } from "../actions/get-expenses.action";

export const useExpenses = () => {
  const data = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpensesAction,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
