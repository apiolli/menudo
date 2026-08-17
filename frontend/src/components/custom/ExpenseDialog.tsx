import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Gasto } from "../../data/finance-types";
import { MenudoContext } from "../../context/MenudoContext";
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

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  gasto?: Gasto | null;
}

export const ExpenseDialog = ({ open, onOpenChange, gasto }: Props) => {
  const { categorias, metodos, saveGasto } = useContext(MenudoContext);
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(today());
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [metodoPagoId, setMetodoPagoId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setMonto(gasto ? String(gasto.monto) : "");
    setFecha(gasto?.fecha ?? today());
    setDescripcion(gasto?.descripcion ?? "");
    setCategoriaId(gasto?.categoriaId ?? categorias[0]?.id ?? "");
    setMetodoPagoId(gasto?.metodoPagoId ?? metodos[0]?.id ?? "");
    setErrors({});
  }, [open, gasto, categorias, metodos]);

  const submit = () => {
    const e: Record<string, string> = {};
    const valor = Number(monto);
    if (!monto || Number.isNaN(valor) || valor <= 0)
      e.monto = "Ingresá un monto mayor a 0";
    if (valor > 1_000_000) e.monto = "El monto es demasiado alto";
    if (!fecha) e.fecha = "Elegí una fecha";
    if (descripcion.trim().length < 3)
      e.descripcion = "Describí el gasto (mín. 3 caracteres)";
    if (descripcion.length > 140) e.descripcion = "Máximo 140 caracteres";
    if (!categoriaId) e.categoriaId = "Seleccioná una categoría";
    if (!metodoPagoId) e.metodoPagoId = "Seleccioná un método de pago";
    setErrors(e);
    if (Object.keys(e).length) return;

    saveGasto({
      id: gasto?.id,
      monto: Math.round(valor * 100) / 100,
      fecha,
      descripcion: descripcion.trim(),
      categoriaId,
      metodoPagoId,
    });
    toast.success(gasto ? "Gasto actualizado" : "Gasto registrado");
    onOpenChange(false);
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
          <DialogTitle>{gasto ? "Editar gasto" : "Nuevo gasto"}</DialogTitle>
          <DialogDescription>
            Registrá el detalle del movimiento para mantener tu análisis al día.
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
            {errors.monto && (
              <p className="text-xs text-destructive">{errors.monto}</p>
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
            {errors.fecha && (
              <p className="text-xs text-destructive">{errors.fecha}</p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              rows={2}
              maxLength={140}
              placeholder="Ej: Supermercado semanal"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            {errors.descripcion && (
              <p className="text-xs text-destructive">{errors.descripcion}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select value={categoriaId} onValueChange={handleSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      {c.nombre}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoriaId && (
              <p className="text-xs text-destructive">{errors.categoriaId}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Método de pago</Label>
            <Select value={metodoPagoId} onValueChange={handleMethodPayment}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {metodos.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.metodoPagoId && (
              <p className="text-xs text-destructive">{errors.metodoPagoId}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={submit}>
            {gasto ? "Guardar cambios" : "Registrar gasto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
