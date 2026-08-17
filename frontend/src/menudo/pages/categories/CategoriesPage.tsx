import { useState } from "react";
import { Plus } from "lucide-react";
import { CategoryDialog } from "./ui/CategoryDialog";
import { CategoryContent } from "./ui/CategoryContent";
import { AppShell } from "../../layouts/AppShell";
import { Button } from "../../../components/ui/button";
import { RequireAuth } from "../../../components/common/RequireAuth";
import type { Categoria } from "../../../data/finance-types";

export const CategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Categoria | null>(null);

  return (
    <AppShell
      title="Categorías"
      subtitle="Clasifica tus gastos con color e ícono"
      actions={
        <Button
          className="gap-2"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="size-4" /> Nueva categoría
        </Button>
      }
    >
      <RequireAuth>
        {/* Contenido de la pagina*/}
        <CategoryContent
          onNueva={() => {
            setEditing(null);
            setOpen(true);
          }}
          onEditar={(c) => {
            setEditing(c);
            setOpen(true);
          }}
        />
      </RequireAuth>

      {/* Dialogo de para las categoria*/}
      <CategoryDialog open={open} onOpenChange={setOpen} categoria={editing} />
    </AppShell>
  );
};
