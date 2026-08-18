import { useEffect, useState } from "react";
import type { Category } from "../../../../data/finance-types";
import { useMenudo } from "../../../../context/MenudoContext";
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
import { cn } from "../../../../lib/utils";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { COLORES, Icono, ICONOS } from "../../../../data/finance-store";

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
  const { createCategory, updateCategory } = useMenudo();
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORES[0]);
  const [icon, setIcon] = useState(ICONOS[0]);
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName(category?.name ?? "");
    setColor(category?.color ?? COLORES[0]);
    setIcon(category?.icon ?? ICONOS[0]);
    setBudget(category?.budget ? String(category.budget) : "");
    setErrors({});
  }, [open, category]);

  const submit = async () => {
    setErrors({});
    const result = categorySchema.safeParse({ name, color, icon, budget });

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
      if (category?.id) {
        await updateCategory(category.id, result.data);
      } else {
        await createCategory(result.data);
      }
      toast.success(category ? "Categoría actualizada" : "Categoría creada");
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Error al guardar la categoría");
    } finally {
      setLoading(false);
    }
  };

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
            <Input
              id="cat-nombre"
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Mascotas"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-pre">Presupuesto mensual (opcional)</Label>
            <Input
              id="cat-pre"
              inputMode="decimal"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="0"
            />
            {errors.budget && (
              <p className="text-xs text-destructive">{errors.budget}</p>
            )}
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
                  onClick={() => setIcon(i)}
                  className={cn(
                    "grid size-9 place-items-center rounded-lg border border-border transition-colors hover:bg-secondary",
                    icon === i && "border-primary bg-secondary",
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
