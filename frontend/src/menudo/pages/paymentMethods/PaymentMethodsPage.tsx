import { PaymentMethodsContent } from "./ui/PaymentMethodsContent";
import { PaymentMethodDialog } from "./ui/PaymentMethodDialog";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { CustomHeader } from "../../../components/custom/CustomHeader";
import type { PaymentMethod } from "../../../types/payment-method";

export const PaymentMethodsPage = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PaymentMethod | null>(null);

  return (
    <>
      <CustomHeader
        title="Métodos de pago"
        subtitle="Cómo pagas cada gasto"
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
      />
      <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
        <PaymentMethodsContent
          onNew={() => {
            setEditing(null);
            setOpen(true);
          }}
          onEdit={(m) => {
            setEditing(m);
            setOpen(true);
          }}
        />
        <PaymentMethodDialog
          open={open}
          onOpenChange={setOpen}
          paymentMethod={editing}
        />
      </main>
    </>
  );
};
