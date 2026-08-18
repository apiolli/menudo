import { useState } from "react";
import {
  currency,
  monthKey,
  type Category,
} from "../../../../data/finance-types";
import { useMenudo } from "../../../../context/MenudoContext";
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
  onNew: () => void;
  onEdit: (c: Category) => void;
}

export const CategoryContent = ({ onNew, onEdit }: Props) => {
  const { categories, expenses, deleteCategory } = useMenudo();
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const currentMonth = new Date().toISOString().slice(0, 7);

  if (!categories.length)
    return (
      <EmptyState
        title="No hay categorías"
        description="Creá categorías para organizar y analizar mejor tus gastos."
        action={<Button onClick={onNew}>Crear categoría</Button>}
      />
    );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((c) => {
          const spent = expenses
            .filter(
              (g) => g.categoryId === c.id && monthKey(g.date) === currentMonth,
            )
            .reduce((s, g) => s + g.amount, 0);
          const pct = c.budget ? Math.min(100, (spent / c.budget) * 100) : 0;
          const exceeded = c.budget ? spent > c.budget : false;
          return (
            <article key={c.id} className="surface p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="grid size-11 place-items-center rounded-xl"
                    style={{ backgroundColor: `${c.color}1f`, color: c.color }}
                  >
                    <Icono name={c.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="font-display font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {expenses.filter((g) => g.categoryId === c.id).length}{" "}
                      gastos registrados
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(c)}
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

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Este mes</span>
                  <span
                    className={cn(
                      "num font-semibold",
                      exceeded && "text-destructive",
                    )}
                  >
                    {currency(spent)}
                    {c.budget ? ` / ${currency(c.budget)}` : ""}
                  </span>
                </div>
                {c.budget ? <Progress value={pct} className="h-2" /> : null}
              </div>
            </article>
          );
        })}
      </div>

      <AlertDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar “{toDelete?.name}”?</AlertDialogTitle>
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
              onClick={async () => {
                if (toDelete) {
                  try {
                    await deleteCategory(toDelete.id);
                    toast.success("Categoría eliminada");
                  } catch (e) {
                    toast.error("Error al eliminar la categoría");
                  }
                }
                setToDelete(null);
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
