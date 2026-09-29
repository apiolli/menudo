import { useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { COLORES, ICONOS, TIPOS } from "../../../../data/finance-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Category } from "../../../../types/category.interface";
import { toast } from "sonner";
import { usePaymentMethod } from "../api/usePaymentMethod";
import { useCreateUpdatePaymentMethod } from "../api/useCreateUpdatePaymentMethod";
import type { PaymentMethod } from "../../../../types/payment-method";

const paymentMethodSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres").max(40),
  paymentType: z.coerce.number().min(1, "Seleccioná un tipo de método de pago"),
  detail: z.string().max(30).optional(),
  color: z.string(),
  icon: z.string(),
});

export const usePaymentMethodDialog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("paymentMethod");

  const { paymentMethod, isError, isLoading, error } = usePaymentMethod(
    id || "",
  );

  console.log({ paymentMethod });

  const mutation = useCreateUpdatePaymentMethod();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    values: {
      name: paymentMethod?.name ?? "",
      paymentType: paymentMethod?.paymentType ?? TIPOS[0].label,
      detail: paymentMethod?.detail ?? "",
      color: paymentMethod?.color ?? COLORES[0],
      icon: paymentMethod?.icon ?? ICONOS[0],
    },
    resolver: zodResolver(paymentMethodSchema),
  });

  const color = watch("color");
  const type = watch("paymentType");

  const mutationSuccess =
    searchParams.get("dialog") === "new"
      ? "Metodo de pago creado con exito"
      : "Metodo de pago editado exitosamente";

  const submit = async (paymentMethod: Partial<PaymentMethod>) => {
    switch (paymentMethod.paymentType) {
      case 1:
        paymentMethod.icon = "Landmark";
        break;
      case 2:
        paymentMethod.icon = "Banknote";
        break;
      case 3:
        paymentMethod.icon = "CreditCard";
        break;
      case 4:
        paymentMethod.icon = "CreditCard";
        break;
      case 5:
        paymentMethod.icon = "Smartphone";
        break;
      default:
        break;
    }

    paymentMethod.id = +id!;
    await mutation.mutate(paymentMethod, {
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
    color,
    isError,
    isLoading,
    error,
    errors,
    paymentMethod,
    type,
    isPosting: mutation.isPending,
    control,
    register,
    setValue,
    handleSubmit,
    submit,
  };
};
