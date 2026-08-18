import { StatCard } from "../../../../components/common/StatCard";
import { type Expense, currency } from "../../../../data/finance-types";

interface Props {
  total: number;
  totalPrev: number;
  count: number;
  average: number;
  highest: Expense | undefined;
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
        value={currency(total)}
        delta={delta}
        hint="vs mes anterior"
      />
      <StatCard
        label="Mes anterior"
        value={currency(totalPrev)}
        hint="cierre completo"
      />
      <StatCard
        label="Movimientos"
        value={String(count)}
        hint={`promedio ${currency(average)}`}
      />
      <StatCard
        label="Gasto más alto"
        value={highest ? currency(highest.amount) : currency(0)}
        hint={highest?.description ?? "—"}
      />
    </div>
  );
};
