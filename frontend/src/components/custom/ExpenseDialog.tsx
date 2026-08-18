import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import type { Expense } from "../../data/finance-types";
import { useMenudo } from "../../context/MenudoContext";
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

const today = () => new Date().toISOString().slice(0, 10);

const expenseSchema = z.object({
  amount: z.coerce
    .number()
    .min(0.01, "IngresÃ¡ un monto mayor a 0")
    .max(1_000_000, "El monto es demasiado alto"),
  date: z.string().min(1, "ElegÃ­ una fecha"),
  description: z
    .string()
    .min(3, "DescribÃ­ el gasto (mÃ­n. 3 caracteres)")
    .max(140, "MÃ¡ximo 140 caracteres"),
  categoryId: z.coerce.number().min(1, "SeleccionÃ¡ una categorÃ­a"),
  paymentMethodId: z.coerce.number().min(1, "SeleccionÃ¡ un mÃ©todo de pago"),
});

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  expense?: Expense | null;
}

export const ExpenseDialog = ({ open, onOpenChange, expense }: Props) => {
  const { categories, paymentMethods, createExpense, updateExpense } =
    useMenudo();
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(today());
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [metodoPagoId, setMetodoPagoId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMonto(expense ? String(expense.amount) : "");
    setFecha(expense?.date ? expense.date.slice(0, 10) : today());
    setDescripcion(expense?.description ?? "");
    setCategoriaId(
      expense?.categoryId
        ? String(expense.categoryId)
        : categories[0]?.id
          ? String(categories[0].id)
          : "",
    );
    setMetodoPagoId(
      expense?.paymentMethodId
        ? String(expense.paymentMethodId)
        : paymentMethods[0]?.id
          ? String(paymentMethods[0].id)
          : "",
    );
    setErrors({});
  }, [open, expense, categories, paymentMethods]);

  const submit = async () => {
    setErrors({});
    const result = expenseSchema.safeParse({
      amount: monto,
      date: fecha,
      description: descripcion,
      categoryId: categoriaId,
      paymentMethodId: metodoPagoId,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      if (expense?.id) {
        await updateExpense(expense.id, result.data);
      } else {
        await createExpense(result.data);
      }
      toast.success(expense ? "Gasto actualizado" : "Gasto registrado");
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Error al guardar el gasto");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (e: string | null) => {
    setCategoriaId(e ?? "");
  };

  const handleMethodPayment = (e: string | null) => {
    setMetodoPagoId(e ?? "");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{expense ? "Editar gasto" : "Nuevo gasto"}</DialogTitle>
          <DialogDescription>
            RegistrÃ¡ el detalle del movimiento para mantener tu anÃ¡lisis al
            dÃ­a.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="monto">Monto</Label>
            <Input
              id="monto"
              inputMode="decimal"
              placeholder="0.00"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
            {errors.amount && (
              <p className="text-xs text-destructive">{errors.amount}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            {errors.date && (
              <p className="text-xs text-destructive">{errors.date}</p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="descripcion">DescripciÃ³n</Label>
            <Textarea
              id="descripcion"
              rows={2}
              maxLength={140}
              placeholder="Ej: Supermercado semanal"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>CategorÃ­a</Label>
            <Select value={categoriaId} onValueChange={handleSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
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
            </Select>
            {errors.categoryId && (
              <p className="text-xs text-destructive">{errors.categoryId}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>MÃ©todo de pago</Label>
            <Select value={metodoPagoId} onValueChange={handleMethodPayment}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.paymentMethodId && (
              <p className="text-xs text-destructive">
                {errors.paymentMethodId}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading
              ? "Guardando..."
              : expense
                ? "Guardar cambios"
                : "Registrar gasto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
