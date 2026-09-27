import { Plus } from "lucide-react";
import { CategoryDialog } from "./ui/CategoryDialog";
import { CategoryContent } from "./ui/CategoryContent";
import { Button } from "../../../components/ui/button";
import { CustomHeader } from "../../../components/custom/CustomHeader";
import { useSearchParams } from "react-router";
import { useDialog } from "../../../hooks/useDialog";

export const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleDialogChange, isDialogOpen } = useDialog();

  const handleOpenDialog = (dialog: string) => {
    searchParams.set("dialog", dialog);
    setSearchParams(searchParams);
  };

  const handleEditDialog = (id: number) => {
    searchParams.set("dialog", "edit");
    searchParams.set("category", id.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <CustomHeader
        title="Categorías"
        subtitle="Clasifica tus gastos con color e ícono"
        actions={
          <Button className="gap-2" onClick={() => handleOpenDialog("new")}>
            <Plus className="size-4" /> Nueva categoría
          </Button>
        }
      />
      <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
        <CategoryContent
          onNew={() => handleOpenDialog("new")}
          onEdit={handleEditDialog}
        />

        <CategoryDialog
          open={isDialogOpen("new", "edit")}
          onOpenChange={handleDialogChange}
        />
      </main>
    </>
  );
};
