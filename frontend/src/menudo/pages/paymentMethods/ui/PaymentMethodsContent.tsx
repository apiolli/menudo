import { useState } from "react";
import { EmptyState } from "../../../../components/common/EmptyState";
import { useMenudo } from "../../../../context/MenudoContext";
import {
  currency,
  monthKey,
  type PaymentMethod,
} from "../../../../data/finance-types";
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

interface Props {
  onNew: () => void;
  onEdit: (m: PaymentMethod) => void;
}

export const PaymentMethodsContent = ({ onNew, onEdit }: Props) => {
  const { paymentMethods, expenses, deletePaymentMethod } = useMenudo();
  const [toDelete, setToDelete] = useState<PaymentMethod | null>(null);
  const currentMonth = new Date().toISOString().slice(0, 7);

  if (!paymentMethods.length)
    return (
      <EmptyState
        title="Sin métodos de pago"
        description="Agregá tus tarjetas, efectivo o billeteras para asociarlos a cada gasto."
        action={<Button onClick={onNew}>Agregar método</Button>}
      />
    );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {paymentMethods.map((m) => {
          // Normalizamos el color para asegurarnos de que siempre tenga '#'
          const rawColor = m.color || "#2f7d63";
          const formattedColor = rawColor.startsWith("#")
            ? rawColor
            : `#${rawColor}`;

          const spent = expenses
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
                    onClick={() => onEdit(m)}
                    aria-label="Editar"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setToDelete(m)}
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

      <AlertDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar “{toDelete?.name}”?</AlertDialogTitle>
            <AlertDialogDescription>
              También se eliminarán los gastos asociados a este método de pago.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (toDelete) {
                  try {
                    await deletePaymentMethod(toDelete.id);
                    toast.success("Método eliminado");
                  } catch (e) {
                    toast.error("Error al eliminar el método");
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
