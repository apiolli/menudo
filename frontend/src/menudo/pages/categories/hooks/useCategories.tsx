import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../actions/get-categories.action";

export const useCategories = () => {
  const data = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
