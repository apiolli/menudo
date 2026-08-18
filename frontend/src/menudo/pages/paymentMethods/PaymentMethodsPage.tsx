import { PaymentMethodsContent } from "./ui/PaymentMethodsContent";
import { PaymentMethodDialog } from "./ui/PaymentMethodDialog";
import { useState } from "react";
import { AppShell } from "../../layouts/AppShell";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { RequireAuth } from "../../../components/common/RequireAuth";
import type { MetodoPago } from "../../../data/finance-types";

export const PaymentMethodsPage = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MetodoPago | null>(null);

  return (
    <AppShell
      title="Métodos de pago"
      subtitle="Cómo pagás cada gasto"
      actions={
        <Button
          className="gap-2"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="size-4" /> Nuevo método
        </Button>
      }
    >
      <RequireAuth>
        <PaymentMethodsContent
          onNuevo={() => {
            setEditing(null);
            setOpen(true);
          }}
          onEditar={(m) => {
            setEditing(m);
            setOpen(true);
          }}
        />
      </RequireAuth>
      <PaymentMethodDialog
        open={open}
        onOpenChange={setOpen}
        metodo={editing}
      />
    </AppShell>
  );
};
