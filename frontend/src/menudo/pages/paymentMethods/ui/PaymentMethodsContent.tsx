import { useContext, useState } from "react";
import { EmptyState } from "../../../../components/common/EmptyState";
import { MenudoContext } from "../../../../context/MenudoContext";
import {
  currency,
  monthKey,
  type MetodoPago,
} from "../../../../data/finance-types";
import { Button } from "../../../../components/ui/button";
import { TIPOS } from "../../../../data/finance-store";
import { Pencil, Trash2, Wallet } from "lucide-react";
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
  onNuevo: () => void;
  onEditar: (m: MetodoPago) => void;
}

export const PaymentMethodsContent = ({ onNuevo, onEditar }: Props) => {
  const { metodos, gastos, deleteMetodo } = useContext(MenudoContext);
  const [toDelete, setToDelete] = useState<MetodoPago | null>(null);
  const mesActual = new Date().toISOString().slice(0, 7);

  if (!metodos.length)
    return (
      <EmptyState
        title="Sin métodos de pago"
        description="Agregá tus tarjetas, efectivo o billeteras para asociarlos a cada gasto."
        action={<Button onClick={onNuevo}>Agregar método</Button>}
      />
    );

  return (
    <>
      {/* Grilla de tarjetas de métodos de pago */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metodos.map((m) => {
          const tipo = TIPOS.find((t) => t.id === m.tipo);
          const Icon = tipo?.icon ?? Wallet;
          const gastado = gastos
            .filter(
              (g) => g.metodoPagoId === m.id && monthKey(g.fecha) === mesActual,
            )
            .reduce((s, g) => s + g.monto, 0);
          return (
            <article
              key={m.id}
              className="surface flex flex-col justify-between p-5"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                  <Icon className="size-5" />
                </span>
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditar(m)}
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
                <p className="font-display font-semibold">{m.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  {tipo?.label}
                  {m.detalle ? ` · ${m.detalle}` : ""}
                </p>
              </div>
              {/* Total usado en el mes actual */}
              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">
                  Usado este mes
                </span>
                <span className="num text-lg font-semibold">
                  {currency(gastado)}
                </span>
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
              También se eliminarán los gastos asociados a este método de pago.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (toDelete) deleteMetodo(toDelete.id);
                setToDelete(null);
                toast.success("Método eliminado");
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
