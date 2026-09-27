import { useState, useRef } from "react";
import { ExpensesContent } from "./ui/ExpensesContent";
import { ExportDialog } from "../../../components/custom/ExportDialog";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { ExpenseDialog } from "../../../components/custom/ExpenseDialog";
import { toast } from "sonner";
import { CustomHeader } from "../../../components/custom/CustomHeader";
import type { Expense } from "../../../types/expense.interface";
import { useDialog } from "../../../hooks/useDialog";

export const ExpensesPage = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleOpenDialog, handleDialogChange, isDialogOpen } = useDialog();

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0];
    // if (!file) return;
    // setImporting(true);
    // try {
    //   const res = await importService.uploadFile(file);
    //   toast.success(
    //     `Importación finalizada. Éxitos: ${res.successCount}. Errores: ${res.failureCount}.`,
    //   );
    //   setRefreshTrigger((t) => t + 1);
    // } catch (err) {
    //   toast.error("Error al importar el archivo");
    // } finally {
    //   setImporting(false);
    //   if (fileInputRef.current) fileInputRef.current.value = "";
    // }
  };

  const handleDownloadTemplate = async () => {
    // try {
    //   await importService.downloadTemplate();
    //   toast.success("Plantilla descargada exitosamente");
    // } catch (err) {
    //   toast.error("Error al descargar la plantilla");
    // }
  };

  return (
    <>
      <CustomHeader
        title="Gastos"
        subtitle="Todos tus movimientos registrados"
        actions={
          <>
            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImport}
            />
            <Button variant="outline" onClick={handleDownloadTemplate}>
              Plantilla
            </Button>
            <Button
              variant="outline"
              disabled={importing}
              onClick={() => fileInputRef.current?.click()}
            >
              {importing ? "Importando..." : "Importar"}
            </Button>
            <ExportDialog />
            <Button className="gap-2" onClick={() => handleOpenDialog("new")}>
              <Plus className="size-4" /> Nuevo gasto
            </Button>
          </>
        }
      />
      <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
        <ExpensesContent
          refreshTrigger={refreshTrigger}
          onNew={() => handleOpenDialog("new")}
          onEdit={() => handleOpenDialog("edit")}
        />
        <ExpenseDialog
          open={isDialogOpen("new", "edit")}
          onOpenChange={handleDialogChange}
        />
      </main>
    </>
  );
};
