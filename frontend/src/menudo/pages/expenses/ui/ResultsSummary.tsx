import { currencyExact, type Expense } from "../../../../data/finance-types";
import { Button } from "../../../../components/ui/button";
import { FilterX } from "lucide-react";

interface Props {
  total: number;
  hasFilters: boolean | string;
  clearFilters: () => void;
  filteredExpenses: Expense[];
}

export const ResultsSummary = ({
  total,
  hasFilters,
  clearFilters,
  filteredExpenses,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="num font-semibold text-foreground">
          {filteredExpenses.length}
        </span>{" "}
        movimientos Â·{" "}
        <span className="num font-semibold text-foreground">
          {currencyExact(total)}
        </span>{" "}
        en total
      </p>
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={clearFilters}
        >
          <FilterX className="size-4" /> Limpiar filtros
        </Button>
      )}
    </div>
  );
};
