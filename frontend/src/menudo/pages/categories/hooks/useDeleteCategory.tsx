import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryAction } from "../actions/delete-category.action";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCategoryAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
  });

  return mutation;
};
