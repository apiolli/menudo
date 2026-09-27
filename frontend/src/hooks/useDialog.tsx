import { useSearchParams } from "react-router";

export type Features = "category" | "expense" | "paymentMethod";

export const useDialog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dialog = searchParams.get("dialog");

  const isDialogOpen = (dialogName: string, secondDialog?: string): boolean => {
    return dialog === dialogName || dialog === secondDialog ? true : false;
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) setSearchParams("");
  };

  const handleOpenDialog = (dialog: string) => {
    searchParams.set("dialog", dialog);
    setSearchParams(searchParams);
  };

  const handleEditDialog = (id: number, feature: Features) => {
    searchParams.set("dialog", "edit");
    searchParams.set(feature, id.toString());
    setSearchParams(searchParams);
  };

  const handleDeleteDialog = (id: number, feature: Features) => {
    searchParams.set("dialog", "delete");
    searchParams.set(feature, id.toString());
    setSearchParams(searchParams);
  };

  return {
    isDialogOpen,
    handleDialogChange,
    handleOpenDialog,
    handleDeleteDialog,
    handleEditDialog,
  };
};
