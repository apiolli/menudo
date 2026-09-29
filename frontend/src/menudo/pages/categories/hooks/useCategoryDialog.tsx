import { useSearchParams } from "react-router";
import { useCategory } from "../api/useCategory";
import { useCreateUpdateCategory } from "../api/useCreateUpdateCategory";
import { useForm } from "react-hook-form";
import { COLORES, ICONOS } from "../../../../data/finance-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Category } from "../../../../types/category.interface";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z
    .string("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(40, "Máximo 40 caracteres"),
  color: z.string(),
  icon: z.string(),
  budget: z.coerce
    .number("El presupuesto es requerido")
    .min(1, "El presupuesto debe de ser mayor 0"),
});

export const useCategoryDialog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("category");

  const { category, isError, isLoading, error } = useCategory(id || "");
  const mutation = useCreateUpdateCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    values: {
      name: category?.name ?? "",
      color: category?.color ?? COLORES[0],
      icon: category?.icon ?? ICONOS[0],
      budget: category?.budget ?? 0,
    },
    resolver: zodResolver(categorySchema),
  });

  const icon = watch("icon");
  const color = watch("color");

  const mutationSuccess =
    searchParams.get("dialog") === "new"
      ? "Categoria creada con exito"
      : "Categoria editada exitosamente";

  const submit = async (category: Partial<Category>) => {
    category.id = +id!;
    await mutation.mutate(category, {
      onSuccess: () => {
        toast.success(mutationSuccess);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const params = new URLSearchParams();
    setSearchParams(params);
  };
  return {
    icon,
    color,
    isError,
    isLoading,
    error,
    errors,
    category,
    register,
    setValue,
    handleSubmit,
    submit,
  };
};
