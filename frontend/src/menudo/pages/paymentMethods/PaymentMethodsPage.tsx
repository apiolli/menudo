import { PaymentMethodsContent } from "./ui/PaymentMethodsContent";
import { PaymentMethodDialog } from "./ui/PaymentMethodDialog";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { CustomHeader } from "../../../components/custom/CustomHeader";
import { useDialog } from "../../../hooks/useDialog";

export const PaymentMethodsPage = () => {
  const {
    handleDialogChange,
    handleEditDialog,
    handleOpenDialog,
    isDialogOpen,
    handleDeleteDialog,
  } = useDialog();

  return (
    <>
      <CustomHeader
        title="Métodos de pago"
        subtitle="Cómo pagas cada gasto"
        actions={
          <Button className="gap-2" onClick={() => handleOpenDialog("new")}>
            <Plus className="size-4" /> Nuevo método
          </Button>
        }
      />
      <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
        <PaymentMethodsContent
          onNew={() => handleOpenDialog("new")}
          onEdit={handleEditDialog}
          onDelete={handleDeleteDialog}
          open={isDialogOpen}
          openChange={handleDialogChange}
        />
        <PaymentMethodDialog
          open={isDialogOpen("new", "edit")}
          onOpenChange={handleDialogChange}
        />
      </main>
    </>
  );
};
