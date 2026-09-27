import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { COLORES, Icono, ICONOS } from "../../../../data/finance-store";
import type { Category } from "../../../../types/category.interface";

const categorySchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(40, "Máximo 40 caracteres"),
  color: z.string(),
  icon: z.string(),
  budget: z.coerce
    .number()
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  category: Category | null;
}

export const CategoryDialog = ({ open, onOpenChange, category }: Props) => {
  const submit = async () => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Editar categoría" : "Nueva categoría"}
          </DialogTitle>
          <DialogDescription>
            Elegí un nombre, color e ícono representativo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cat-nombre">Nombre</Label>
            <Input id="cat-nombre" maxLength={40} placeholder="Ej: Mascotas" />
            {/* {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )} */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-pre">Presupuesto mensual </Label>
            <Input id="cat-pre" inputMode="decimal" placeholder="0" />
            {/* {errors.budget && (
              <p className="text-xs text-destructive">{errors.budget}</p>
            )} */}
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
                  // className={cn(
                  //   "size-8 rounded-full ring-offset-2",
                  //   color === c && "ring-2 ring-ring",
                  // )}
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
                  // onClick={() => setIcon(i)}
                  // className={cn(
                  //   "grid size-9 place-items-center rounded-lg border border-border transition-colors hover:bg-secondary",
                  //   icon === i && "border-primary bg-secondary",
                  // )}
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
            // disabled={category}
          >
            Cancelar
          </Button>
          {/* <Button onClick={submit} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
