import { useEffect, useState } from "react";
import { useMenudo } from "../../../../context/MenudoContext";
import type { PaymentMethod } from "../../../../data/finance-types";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { TIPOS } from "../../../../data/finance-store";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

const paymentMethodSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(40),
  type: z.coerce.number(),
  detail: z.string().max(30).optional(),
});

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  paymentMethod: PaymentMethod | null;
}

export const PaymentMethodDialog = ({
  open,
  onOpenChange,
  paymentMethod,
}: Props) => {
  const { createPaymentMethod, updatePaymentMethod } = useMenudo();
  const [name, setName] = useState("");
  const [type, setType] = useState<number>(2); // Default to Cash (Efectivo) which is 2
  const [detail, setDetail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName(paymentMethod?.name ?? "");
    setType(paymentMethod?.type ? Number(paymentMethod.type) : 2);
    setDetail(paymentMethod?.detail ?? "");
    setErrors({});
  }, [open, paymentMethod]);

  const submit = async () => {
    setErrors({});
    const result = paymentMethodSchema.safeParse({ name, type, detail });

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
      if (paymentMethod?.id) {
        await updatePaymentMethod(paymentMethod.id, result.data);
      } else {
        await createPaymentMethod(result.data);
      }
      toast.success(paymentMethod ? "Método actualizado" : "Método creado");
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Error al guardar método");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {paymentMethod ? "Editar método" : "Nuevo método de pago"}
          </DialogTitle>
          <DialogDescription>
            Define cómo se paga el gasto para segmentar tus análisis.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="met-nombre">Nombre</Label>
            <Input
              id="met-nombre"
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Visa Crédito"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select
              value={String(type)}
              onValueChange={(v) => setType(Number(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIPOS.map((t) => (
                  <SelectItem key={t.id} value={String(t.id)}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="met-detalle">Detalle (opcional)</Label>
            <Input
              id="met-detalle"
              maxLength={30}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="•••• 4821"
            />
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
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
