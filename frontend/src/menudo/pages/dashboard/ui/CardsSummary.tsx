import type { HighestExpense } from "../types/dashboard-response";
import { StatCard } from "../../../../components/common/StatCard";
import { currencyExact } from "../../../../data/finance-types";

interface Props {
  total: number;
  totalPrev: number;
  count: number;
  average: number;
  highest: HighestExpense;
  delta: number;
}

export const CardsSummary = ({
  total,
  totalPrev,
  count,
  average,
  highest,
  delta,
}: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        accent
        label="Total del mes"
        value={currencyExact(total)}
        delta={delta}
        hint="vs mes anterior"
      />
      <StatCard
        label="Mes anterior"
        value={currencyExact(totalPrev)}
        hint="cierre completo"
      />
      <StatCard
        label="Movimientos"
        value={String(count)}
        hint={`promedio ${currencyExact(average)}`}
      />
      <StatCard
        label="Gasto más alto"
        value={highest ? currencyExact(highest.amount) : "0"}
        hint={highest?.description ?? "—"}
      />
    </div>
  );
};
