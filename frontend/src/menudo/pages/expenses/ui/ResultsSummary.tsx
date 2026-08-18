import { currencyExact, type Gasto } from "../../../../data/finance-types";
import { Button } from "../../../../components/ui/button";
import { FilterX } from "lucide-react";

interface Props {
  total: number;
  hayFiltros: boolean | string;
  limpiar: () => void;
  filtrados: Gasto[];
}

export const ResultsSummary = ({
  total,
  hayFiltros,
  limpiar,
  filtrados,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="num font-semibold text-foreground">
          {filtrados.length}
        </span>{" "}
        movimientos ·{" "}
        <span className="num font-semibold text-foreground">
          {currencyExact(total)}
        </span>{" "}
        en total
      </p>
      {hayFiltros && (
        <Button variant="ghost" size="sm" className="gap-2" onClick={limpiar}>
          <FilterX className="size-4" /> Limpiar filtros
        </Button>
      )}
    </div>
  );
};
