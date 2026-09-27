import { useCategories } from "../api/useCategories";
import { useExpenses } from "../../expenses/hooks/useExpenses";
import { useSearchParams } from "react-router";
import { useCategory } from "../api/useCategory";
import { useDeleteCategory } from "../api/useDeleteCategory";
import { toast } from "sonner";

export const useCategoryContent = () => {
  const categories = useCategories();
  const expenses = useExpenses();

  const categoriesData = categories.data;
  const expensesData = expenses.data;
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("category");

  const { ...rest } = useCategory(id || "");
  const mutation = useDeleteCategory();

  const handleDelete = async () => {
    const params = new URLSearchParams();
    if (!id) {
      setSearchParams(params);
      return;
    }
    await mutation.mutate(id, {
      onSuccess: () => {
        toast.success("Categoria eliminada exitosamente");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    setSearchParams(params);
  };

  return {
    categoriesData,
    expensesData,
    ...rest,
    handleDelete,
    isPending: mutation.isPending,
  };
};
