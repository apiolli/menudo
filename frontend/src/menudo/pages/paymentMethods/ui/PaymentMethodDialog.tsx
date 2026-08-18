import { useContext, useEffect, useState } from "react";
import { MenudoContext } from "../../../../context/MenudoContext";
import type { MetodoPago } from "../../../../data/finance-types";
import { toast } from "sonner";
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

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  metodo: MetodoPago | null;
}

export const PaymentMethodDialog = ({ open, onOpenChange, metodo }: Props) => {
  const { saveMetodo } = useContext(MenudoContext);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<MetodoPago["tipo"]>("Efectivo");
  const [detalle, setDetalle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setNombre(metodo?.nombre ?? "");
    setTipo(metodo?.tipo ?? "Efectivo");
    setDetalle(metodo?.detalle ?? "");
    setError("");
  }, [open, metodo]);

  const submit = () => {
    if (nombre.trim().length < 2) {
      setError("Ingresá un nombre válido");
      return;
    }
    saveMetodo({
      id: metodo?.id,
      nombre: nombre.trim().slice(0, 40),
      tipo,
      detalle: detalle.trim().slice(0, 30),
    });
    toast.success(metodo ? "Método actualizado" : "Método creado");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {metodo ? "Editar método" : "Nuevo método de pago"}
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Visa Crédito"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select
              value={tipo}
              onValueChange={(v) => setTipo(v as MetodoPago["tipo"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIPOS.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
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
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder="•••• 4821"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={submit}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
