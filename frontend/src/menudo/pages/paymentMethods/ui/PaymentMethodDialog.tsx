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
import { TIPOS, COLORES, ICONOS, Icono } from "../../../../data/finance-store";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";
import type { PaymentMethod } from "../../../../types/payment-method";

const paymentMethodSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(40),
  type: z.coerce.number().min(1, "Seleccioná un tipo de método de pago"),
  detail: z.string().max(30).optional(),
  color: z.string(),
  icon: z.string(),
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
  const submit = async () => {};
  // const selectedTypeObj = TIPOS.find((t) => t.id === type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
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
              placeholder="Ej: Visa Crédito"
            />
            {/* {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )} */}
          </div>

          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo">
                  {/* {selectedTypeObj
                    ? selectedTypeObj.label
                    : "Selecciona un tipo"} */}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {TIPOS.map((t) => (
                  <SelectItem key={t.id} value={String(t.id)}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* {errors.type && (
              <p className="text-xs text-destructive">{errors.type}</p>
            )} */}
          </div>

          <div className="space-y-2">
            <Label htmlFor="met-detalle">Detalle (opcional)</Label>
            <Input id="met-detalle" maxLength={30} placeholder="•••• 4821" />
          </div>

          {/* Selector de color */}
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {COLORES.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Color ${c}`}
                  // onClick={() => setColor(c)}
                  className={cn(
                    "size-8 rounded-full ring-offset-2",
                    // color === c && "ring-2 ring-ring",
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Selector de ícono */}
          <div className="space-y-2">
            <Label>Ícono</Label>
            <div className="flex flex-wrap gap-2">
              {ICONOS.map((i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={i}
                  className={cn(
                    "grid size-9 place-items-center rounded-lg border border-border transition-colors hover:bg-secondary",
                    // icon === i && "border-primary bg-secondary",
                  )}
                >
                  <Icono name={i} className="size-4" />
                </button>
              ))}
            </div>
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
          <Button onClick={submit} disabled={true}>
            {true ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
