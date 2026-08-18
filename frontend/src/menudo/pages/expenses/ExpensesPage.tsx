import { useState } from "react";
import { ExpensesContent } from "./ui/ExpensesContent";
import { AppShell } from "../../layouts/AppShell";
import { ExportDialog } from "../../../components/custom/ExportDialog";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { RequireAuth } from "../../../components/common/RequireAuth";
import type { Gasto } from "../../../data/finance-types";
import { ExpenseDialog } from "../../../components/custom/ExpenseDialog";

export const ExpensesPage = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Gasto | null>(null);

  return (
    <AppShell
      title="Gastos"
      subtitle="Todos tus movimientos registrados"
      actions={
        <>
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
          onNuevo={() => {
            setEditing(null);
            setOpen(true);
          }}
          onEditar={(g) => {
            setEditing(g);
            setOpen(true);
          }}
        />
      </RequireAuth>
      <ExpenseDialog open={open} onOpenChange={setOpen} gasto={editing} />
    </AppShell>
  );
};
