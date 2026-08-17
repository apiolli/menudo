import { useContext, useState } from "react";
import {
  currency,
  monthKey,
  type Categoria,
} from "../../../../data/finance-types";
import { MenudoContext } from "../../../../context/MenudoContext";
import { EmptyState } from "../../../../components/common/EmptyState";
import { Button } from "../../../../components/ui/button";
import { Icono } from "../../../../data/finance-store";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "../../../../lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../components/ui/alert-dialog";
import { toast } from "sonner";
import { Progress } from "../../../../components/ui/progress";

interface Props {
  onNueva: () => void;
  onEditar: (c: Categoria) => void;
}

export const CategoryContent = ({ onNueva, onEditar }: Props) => {
  const { categorias, gastos, deleteCategoria } = useContext(MenudoContext);
  const [toDelete, setToDelete] = useState<Categoria | null>(null);
  const mesActual = new Date().toISOString().slice(0, 7);

  if (!categorias.length)
    return (
      <EmptyState
        title="No hay categorías"
        description="Creá categorías para organizar y analizar mejor tus gastos."
        action={<Button onClick={onNueva}>Crear categoría</Button>}
      />
    );

  return (
    <>
      {/* Grid de tarjetas de categoría (color, ícono y presupuesto) */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categorias.map((c) => {
          const gastado = gastos
            .filter(
              (g) => g.categoriaId === c.id && monthKey(g.fecha) === mesActual,
            )
            .reduce((s, g) => s + g.monto, 0);
          const pct = c.presupuesto
            ? Math.min(100, (gastado / c.presupuesto) * 100)
            : 0;
          const excedido = c.presupuesto ? gastado > c.presupuesto : false;
          return (
            <article key={c.id} className="surface p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="grid size-11 place-items-center rounded-xl"
                    style={{ backgroundColor: `${c.color}1f`, color: c.color }}
                  >
                    <Icono name={c.icono} className="size-5" />
                  </span>
                  <div>
                    <p className="font-display font-semibold">{c.nombre}</p>
                    <p className="text-xs text-muted-foreground">
                      {gastos.filter((g) => g.categoriaId === c.id).length}{" "}
                      gastos registrados
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditar(c)}
                    aria-label="Editar"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setToDelete(c)}
                    aria-label="Eliminar"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Progreso del presupuesto mensual */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Este mes</span>
                  <span
                    className={cn(
                      "num font-semibold",
                      excedido && "text-destructive",
                    )}
                  >
                    {currency(gastado)}
                    {c.presupuesto ? ` / ${currency(c.presupuesto)}` : ""}
                  </span>
                </div>
                {c.presupuesto ? (
                  <Progress value={pct} className="h-2" />
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {/* Confirmación de eliminación */}
      <AlertDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar “{toDelete?.nombre}”?</AlertDialogTitle>
            <AlertDialogDescription>
              También se eliminarán los gastos asociados a esta categoría. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant={undefined} size={undefined}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (toDelete) deleteCategoria(toDelete.id);
                setToDelete(null);
                toast.success("Categoría eliminada");
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
