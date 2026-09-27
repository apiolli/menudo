import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCategoryAction } from "../actions/create-update-category.action";
import type { Category } from "../../../../types/category.interface";

export const useCreateUpdateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUpdateCategoryAction,
    onSuccess: (category: Category) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({
        queryKey: ["category", { id: category.id }],
      });
      queryClient.setQueryData(["categories", { id: category.id }], category);
    },
    retry: false,
  });

  return mutation;
};
