import { useState } from "react";
import { DashboardContent } from "./ui/DashboardContent";
import { monthLabel } from "../../../data/finance-types";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { ExportDialog } from "../../../components/custom/ExportDialog";
import { RequireAuth } from "../../../components/common/RequireAuth";
import { ExpenseDialog } from "../../../components/custom/ExpenseDialog";
import { AppShell } from "../../layouts/AppShell";

export const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const monthStart = today.slice(0, 8) + "01";

  return (
    <AppShell
      title="Dashboard"
      subtitle={monthLabel(today.slice(0, 7))}
      actions={
        <>
          <ExportDialog fromDate={monthStart} toDate={today} />
          <Button className="gap-2" onClick={() => setOpen(true)}>
            <Plus className="size-4" /> Nuevo gasto
          </Button>
        </>
      }
    >
      <RequireAuth>
        <DashboardContent onNew={() => setOpen(true)} />
      </RequireAuth>
      <ExpenseDialog open={open} onOpenChange={setOpen} />
    </AppShell>
  );
};
