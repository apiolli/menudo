import { useState } from "react";
import { DashboardContent } from "./ui/DashboardContent";
import { monthLabel } from "../../../data/finance-types";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { ExportDialog } from "../../../components/custom/ExportDialog";
import { ExpenseDialog } from "../../../components/custom/ExpenseDialog";
import { CustomHeader } from "../../../components/custom/CustomHeader";

const today = new Date().toISOString().slice(0, 10);

export const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const monthStart = today.slice(0, 8) + "01";

  return (
    <>
      <CustomHeader
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
      />
      <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
        <DashboardContent onNew={() => setOpen(true)} />
        <ExpenseDialog open={open} onOpenChange={setOpen} />
      </main>
    </>
  );
};
