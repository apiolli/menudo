import { menudoApi } from "../../../../api/menudo-api";
import type { Category } from "../../../../types/category.interface";

export const createUpdateCategoryAction = async (
  category: Partial<Category>,
): Promise<Category> => {
  const { id, ...rest } = category;

  const updateCategory = {
    ...rest,
    status: 1,
  };

  const { data } = await menudoApi<Category>({
    url: id ? `/categories/${id}` : "/categories",
    method: id ? "PUT" : "POST",
    data: id ? updateCategory : rest,
  });

  return data;
};
