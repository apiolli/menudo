import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useCategories } from "../../menudo/pages/categories/api/useCategories";
import { usePaymentMethods } from "../../menudo/pages/paymentMethods/api/usePaymentMethods";
import { EmptyState } from "../common/EmptyState";
import type { Expense } from "../../types/expense.interface";
import { useSearchParams } from "react-router";
import { useExpense } from "../../menudo/pages/expenses/hooks/useExpense";

const today = () => new Date().toISOString().slice(0, 10);

const expenseSchema = z.object({
  amount: z.coerce
    .number()
    .min(0.01, "Ingresá un monto mayor a 0")
    .max(1_000_000, "El monto es demasiado alto"),
  date: z.string().min(1, "Elegí una fecha"),
  description: z
    .string()
    .min(3, "Describí el gasto (mín. 3 caracteres)")
    .max(140, "Máximo 140 caracteres"),
  categoryId: z.coerce.number().min(1, "Seleccioná una categoría"),
  paymentMethodId: z.coerce.number().min(1, "Seleccioná un método de pago"),
});

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const ExpenseDialog = ({ open, onOpenChange }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useCategories();
  const paymentMethods = usePaymentMethods();

  const id = searchParams.get("expense");
  const { expense, isError, isLoading, error } = useExpense(id || "");

  const categoriesData = categories.data;
  const paymentMethodsData = paymentMethods.data;

  if (!categoriesData || !paymentMethodsData)
    return <EmptyState description="Actualmente hay un error" title="Error" />;

  // useEffect(() => {
  //   if (!open) return;
  //   setMonto(expense ? String(expense.amount) : "");
  //   setFecha(expense?.date ? expense.date.slice(0, 10) : today());
  //   setDescripcion(expense?.description ?? "");
  //   setCategoriaId(
  //     expense?.categoryId
  //       ? String(expense.categoryId)
  //       : categories[0]?.id
  //         ? String(categories[0].id)
  //         : "",
  //   );
  //   setMetodoPagoId(
  //     expense?.paymentMethodId
  //       ? String(expense.paymentMethodId)
  //       : paymentMethods[0]?.id
  //         ? String(paymentMethods[0].id)
  //         : "",
  //   );
  //   setErrors({});
  // }, [open, expense, categories, paymentMethods]);

  const submit = async () => {};

  const handleSelect = (e: string | null) => {};

  const handleMethodPayment = (e: string | null) => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{expense ? "Editar gasto" : "Nuevo gasto"}</DialogTitle>
          <DialogDescription>
            Registrá el detalle del movimiento para mantener tu análisis al día.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="monto">Monto</Label>
            <Input id="monto" inputMode="decimal" placeholder="0.00" />
            {/* {errors.amount && (
              <p className="text-xs text-destructive">{errors.amount}</p>
            )} */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input id="fecha" type="date" />
            {/* {errors.date && (
              <p className="text-xs text-destructive">{errors.date}</p>
            )} */}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              rows={2}
              maxLength={140}
              placeholder="Ej: Supermercado semanal"
            />
            {/* {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )} */}
          </div>
          <div className="space-y-2">
            <Label>Categoría</Label>
            {/* <Select value={categoriaId} onValueChange={handleSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar">
                  {categoriesData.find((c) => String(c.id) === categoriaId) ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{
                          backgroundColor: categoriesData.find(
                            (c) => String(c.id) === categoriaId,
                          )?.color,
                        }}
                      />
                      {
                        categoriesData.find((c) => String(c.id) === categoriaId)
                          ?.name
                      }
                    </span>
                  ) : (
                    "Seleccionar"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.data?.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    <span className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      {c.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            {/* {errors.categoryId && (
              <p className="text-xs text-destructive">{errors.categoryId}</p>
            )} */}
          </div>

          <div className="space-y-2">
            <Label>Método de pago</Label>
            {/* <Select value={metodoPagoId} onValueChange={handleMethodPayment}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar">
                  {paymentMethodsData.find((m) => String(m.id) === metodoPagoId)
                    ?.name ?? "Seleccionar"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {paymentMethodsData.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            {/* {errors.paymentMethodId && (
              <p className="text-xs text-destructive">
                {errors.paymentMethodId}
              </p>
            )} */}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            // disabled={loading}
          >
            Cancelar
          </Button>
          {/* <Button onClick={submit} disabled={loading}>
            {loading
              ? "Guardando..."
              : expense
                ? "Guardar cambios"
                : "Registrar gasto"}
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
