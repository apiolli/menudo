import type { SetStateAction } from "react";
import { Button } from "../../../../components/ui/button";

interface Props {
  current: number;
  pages: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}

export const ExpensesPagination = ({ current, pages, setPage }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3">
      <p className="text-xs text-muted-foreground">
        Página {current} de {pages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={current === 1}
          onClick={() => setPage(current - 1)}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={current === pages}
          onClick={() => setPage(current + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
