import { EmptyState } from "../../../../components/common/EmptyState";
import { currency, monthKey } from "../../../../data/finance-types";
import { Button } from "../../../../components/ui/button";
import { Icono } from "../../../../data/finance-store";
import { Pencil, Trash2 } from "lucide-react";
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
import type { Features } from "../../../../hooks/useDialog";
import { usePaymentMethodContent } from "../hooks/usePaymentMethodContent";
import { CardsSkeleton } from "../../../../components/common/CardSkeleton";

interface Props {
  onNew: () => void;
  onEdit: (id: number, feature: Features) => void;
  onDelete: (id: number, feature: Features) => void;
  open: (dialogName: string, secondDialog?: string | undefined) => boolean;
  openChange: (isOpen: boolean) => void;
}

export const PaymentMethodsContent = ({
  onNew,
  onEdit,
  onDelete,
  open,
  openChange,
}: Props) => {
  const {
    paymentMethodsData,
    expensesData,
    isError,
    isLoading,
    isPending,
    error,
    handleDelete,
    paymentMethod,
  } = usePaymentMethodContent();
  const currentMonth = new Date().toISOString().slice(0, 7);

  if (isLoading) return <CardsSkeleton />;

  if (isError) {
    toast.error(error);
    return (
      <EmptyState
        title="Error!"
        description="Ha ocurrido un error inesperado al cargar los datos."
      />
    );
  }

  if (!paymentMethodsData || !expensesData)
    return (
      <EmptyState
        title="No hay categorías"
        description="Crea categorías para organizar y analizar mejor tus gastos."
        action={<Button onClick={onNew}>Crear categoría</Button>}
      />
    );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {paymentMethodsData.map((m) => {
          // Normalizamos el color para asegurarnos de que siempre tenga '#'
          const rawColor = m.color || "#2f7d63";
          const formattedColor = rawColor.startsWith("#")
            ? rawColor
            : `#${rawColor}`;

          const spent = expensesData
            .filter(
              (g) =>
                g.paymentMethodId === m.id && monthKey(g.date) === currentMonth,
            )
            .reduce((s, g) => s + g.amount, 0);

          return (
            <article
              key={m.id}
              className="surface flex flex-col justify-between p-5"
            >
              <div className="flex items-start justify-between">
                {/* Ícono y color dinámicos basados en la selección del usuario */}
                <span
                  className="grid size-11 place-items-center rounded-xl"
                  style={{
                    backgroundColor: `${formattedColor}1f`,
                    color: formattedColor,
                  }}
                >
                  <Icono name={m.icon || "CreditCard"} className="size-5" />
                </span>
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(m.id, "paymentMethod")}
                    aria-label="Editar"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(m.id, "paymentMethod")}
                    aria-label="Eliminar"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-5">
                <p className="font-display font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">
                  {m.detail ? `${m.detail}` : ""}
                </p>
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">
                  Usado este mes
                </span>
                <span className="num text-lg font-semibold">
                  {currency(spent)}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <AlertDialog open={open("delete")} onOpenChange={openChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Eliminar “{paymentMethod?.name}”?
            </AlertDialogTitle>
            <AlertDialogDescription>
              También se eliminarán los gastos asociados a este método de pago.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
