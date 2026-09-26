import { useState } from "react";
import { Plus } from "lucide-react";
import { CategoryDialog } from "./ui/CategoryDialog";
import { CategoryContent } from "./ui/CategoryContent";
import { Button } from "../../../components/ui/button";
import { CustomHeader } from "../../../components/custom/CustomHeader";
import type { Category } from "../../../types/category.interface";

export const CategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  return (
    <>
      <CustomHeader
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
      />
      <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
        <CategoryContent
          onNew={() => {
            setEditing(null);
            setOpen(true);
          }}
          onEdit={(c) => {
            setEditing(c);
            setOpen(true);
          }}
        />

        <CategoryDialog open={open} onOpenChange={setOpen} category={editing} />
      </main>
    </>
  );
};
