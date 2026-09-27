import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../actions/get-category-by-id.action";

export const useCategory = (id: string) => {
  const {
    data: category,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category", { id }],
    queryFn: () => getCategoryById(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  return {
    category: category,
    isError,
    isLoading,
    error: error?.message,
  };
};
