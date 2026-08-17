import { useContext, useEffect, useState } from "react";
import type { Categoria } from "../../../../data/finance-types";
import { MenudoContext } from "../../../../context/MenudoContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { cn } from "../../../../lib/utils";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { COLORES, Icono, ICONOS } from "../../../../data/finance-store";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  categoria: Categoria | null;
}

export const CategoryDialog = ({ open, onOpenChange, categoria }: Props) => {
  const { saveCategoria } = useContext(MenudoContext);
  const [nombre, setNombre] = useState("");
  const [color, setColor] = useState(COLORES[0]);
  const [icono, setIcono] = useState(ICONOS[0]);
  const [presupuesto, setPresupuesto] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setNombre(categoria?.nombre ?? "");
    setColor(categoria?.color ?? COLORES[0]);
    setIcono(categoria?.icono ?? ICONOS[0]);
    setPresupuesto(categoria?.presupuesto ? String(categoria.presupuesto) : "");
    setError("");
  }, [open, categoria]);

  const submit = () => {
    if (nombre.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return;
    }
    saveCategoria({
      id: categoria?.id,
      nombre: nombre.trim().slice(0, 40),
      color,
      icono,
      presupuesto: presupuesto ? Number(presupuesto) : undefined,
    });
    toast.success(categoria ? "Categoría actualizada" : "Categoría creada");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {categoria ? "Editar categoría" : "Nueva categoría"}
          </DialogTitle>
          <DialogDescription>
            Elegí un nombre, color e ícono representativo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cat-nombre">Nombre</Label>
            <Input
              id="cat-nombre"
              maxLength={40}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Mascotas"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-pre">Presupuesto mensual (opcional)</Label>
            <Input
              id="cat-pre"
              inputMode="decimal"
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              placeholder="0"
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
                  onClick={() => setColor(c)}
                  className={cn(
                    "size-8 rounded-full ring-offset-2",
                    color === c && "ring-2 ring-ring",
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
                  onClick={() => setIcono(i)}
                  className={cn(
                    "grid size-9 place-items-center rounded-lg border border-border transition-colors hover:bg-secondary",
                    icono === i && "border-primary bg-secondary",
                  )}
                >
                  <Icono name={i} className="size-4" />
                </button>
              ))}
            </div>
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
