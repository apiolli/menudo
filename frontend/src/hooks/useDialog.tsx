import { useSearchParams } from "react-router";

export const useDialog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dialog = searchParams.get("dialog");

  const isDialogOpen = (dialogName: string, secondDialog?: string): boolean => {
    return dialog === dialogName || dialog === secondDialog ? true : false;
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) setSearchParams("");
  };

  // const handleOpenDialog = (entity: T, dialog: string) => {
  //   searchParams.set("dialog", dialog);
  //   setSearchParams(searchParams);
  // };

  return { isDialogOpen, handleDialogChange };
};
