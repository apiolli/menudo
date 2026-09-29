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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { COLORES, TIPOS } from "../../../../data/finance-store";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";
import { usePaymentMethodDialog } from "../hooks/usePaymentMethodDialog";
import { Controller } from "react-hook-form";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const PaymentMethodDialog = ({ open, onOpenChange }: Props) => {
  const {
    handleSubmit,
    submit,
    paymentMethod,
    register,
    setValue,
    isPosting,
    errors,
    control,
    color,
  } = usePaymentMethodDialog();

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
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Tipo</Label>
            <Controller
              name="paymentType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {TIPOS.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.paymentType && (
              <p className="text-xs text-destructive">
                {errors.paymentType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="met-detalle">Detalle (opcional)</Label>
            <Input
              id="met-detalle"
              maxLength={30}
              placeholder="•••• 4821"
              {...register("detail")}
            />
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
                  onClick={() => setValue("color", c)}
                  className={cn(
                    "size-8 rounded-full ring-offset-2 cursor-pointer",
                    color === c && "ring-2 ring-ring",
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPosting}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit(submit)} disabled={isPosting}>
            {isPosting ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
