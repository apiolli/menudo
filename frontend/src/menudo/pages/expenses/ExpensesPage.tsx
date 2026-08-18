import { useState, useRef } from "react";
import { ExpensesContent } from "./ui/ExpensesContent";
import { AppShell } from "../../layouts/AppShell";
import { ExportDialog } from "../../../components/custom/ExportDialog";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { RequireAuth } from "../../../components/common/RequireAuth";
import type { Expense } from "../../../data/finance-types";
import { ExpenseDialog } from "../../../components/custom/ExpenseDialog";
import { toast } from "sonner";
import { apiClient } from "../../../lib/api";

export const ExpensesPage = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setImporting(true);
    try {
      const res = await apiClient<any>("/api/expenses/import", {
        method: "POST",
        body: formData,
      });
      toast.success(
        `Importación finalizada. Éxitos: ${res.successCount}. Errores: ${res.failureCount}.`,
      );
      setRefreshTrigger((t) => t + 1);
    } catch (err) {
      toast.error("Error al importar");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const res = await fetch(
        "https://localhost:7254/api/expenses/import/template",
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "template_gastos.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Error al descargar la plantilla");
    }
  };

  return (
    <AppShell
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
          <Button
            className="gap-2"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="size-4" /> Nuevo gasto
          </Button>
        </>
      }
    >
      <RequireAuth>
        <ExpensesContent
          refreshTrigger={refreshTrigger}
          onNew={() => {
            setEditing(null);
            setOpen(true);
          }}
          onEdit={(g) => {
            setEditing(g);
            setOpen(true);
          }}
        />
      </RequireAuth>
      <ExpenseDialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setRefreshTrigger((t) => t + 1);
        }}
        expense={editing}
      />
    </AppShell>
  );
};
