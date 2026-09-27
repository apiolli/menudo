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
import { useCategory } from "../hooks/useCategory";
import { useSearchParams } from "react-router";
import { Spinner } from "../../../../components/ui/spinner";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category } from "../../../../types/category.interface";
import { cn } from "../../../../lib/utils";
import { useState } from "react";

const categorySchema = z.object({
  name: z
    .string("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(40, "Máximo 40 caracteres"),
  color: z.string(),
  icon: z.string(),
  budget: z.coerce
    .number("El presupuesto es requerido")
    .min(1, "El presupuesto debe de ser mayor 0"),
});
interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const CategoryDialog = ({ open, onOpenChange }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("category");

  const { category, isError, isLoading, error } = useCategory(id || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    values: {
      name: category?.name ?? "",
      color: category?.color ?? COLORES[0],
      icon: category?.icon ?? ICONOS[0],
      budget: category?.budget ?? 0,
    },
    resolver: zodResolver(categorySchema),
  });

  if (isLoading) return <Spinner className="size-8" />;
  if (isError) {
    toast.error(error);
    return;
  }

  const icon = watch("icon");
  const color = watch("color");

  const submit = async (category: Partial<Category>) => {
    console.log({ category });
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
              placeholder="Ej: Mascotas"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-pre">Presupuesto mensual </Label>
            <Input
              id="cat-pre"
              inputMode="decimal"
              placeholder="0"
              {...register("budget", { required: true })}
            />
            {errors.budget && (
              <p className="text-xs text-destructive">
                {errors.budget.message}
              </p>
            )}
          </div>
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
          <div className="space-y-2">
            <Label>Ícono</Label>
            <div className="flex flex-wrap gap-2">
              {ICONOS.map((i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={i}
                  onClick={() => setValue("icon", i)}
                  className={cn(
                    "grid size-9 place-items-center rounded-lg border border-border transition-colors hover:bg-secondary cursor-pointer",
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
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit(submit)} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
