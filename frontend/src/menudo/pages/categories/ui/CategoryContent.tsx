import { useState } from "react";
import { currency, monthKey } from "../../../../data/finance-types";
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
import type { Category } from "../../../../types/category.interface";
import { useCategories } from "../hooks/useCategories";
import { useExpenses } from "../../expenses/hooks/useExpenses";
import { useSearchParams } from "react-router";
import { useCategory } from "../hooks/useCategory";
import type { Features } from "../../../../hooks/useDialog";
import { CardsSkeleton } from "../../../../components/common/CardSkeleton";
import { useDeleteCategory } from "../hooks/useDeleteCategory";

interface Props {
  onNew: () => void;
  onEdit: (id: number, feature: Features) => void;
  open: (dialogName: string, secondDialog?: string | undefined) => boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDelete: (id: number, feature: Features) => void;
}

export const CategoryContent = ({
  onNew,
  onEdit,
  onDelete,
  open,
  onOpenChange,
}: Props) => {
  const categories = useCategories();
  const expenses = useExpenses();

  const categoriesData = categories.data;
  const expensesData = expenses.data;
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("category");

  const { category, isError, isLoading, error } = useCategory(id || "");
  const mutation = useDeleteCategory();

  if (!categoriesData || !expensesData)
    return (
      <EmptyState
        title="No hay categorías"
        description="Creá categorías para organizar y analizar mejor tus gastos."
        action={<Button onClick={onNew}>Crear categoría</Button>}
      />
    );

  if (isLoading) return <CardsSkeleton />;
  if (isError) {
    toast.error(error);
    return;
  }

  const handleDelete = async (id: string) => {
    await mutation.mutate(id, {
      onSuccess: () => {
        toast.success("Categoria eliminada exitosamente");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const params = new URLSearchParams();
    setSearchParams(params);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categoriesData.map((c) => {
          const spent = !c.spent ? 0 : c.spent;
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
                      {expensesData.filter((g) => g.categoryId === c.id).length}{" "}
                      gastos registrados
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(c.id, "category")}
                    aria-label="Editar"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(c.id, "category")}
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

      <AlertDialog open={open("delete")} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar “{category?.name}”?</AlertDialogTitle>
            <AlertDialogDescription>
              También se eliminarán los gastos asociados a esta categoría. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant={undefined} size={undefined}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(id!.toString())}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
