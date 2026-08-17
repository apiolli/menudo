import { StatCard } from "../../../../components/common/StatCard";
import { currency, type Gasto } from "../../../../data/finance-types";

interface Props {
  total: number;
  totalPrev: number;
  cantidad: number;
  promedio: number;
  mayor: Gasto;
  delta: number;
}

export const CardsSummary = ({
  total,
  totalPrev,
  cantidad,
  promedio,
  mayor,
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
        value={String(cantidad)}
        hint={`promedio ${currency(promedio)}`}
      />
      <StatCard
        label="Gasto más alto"
        value={mayor ? currency(mayor.monto) : currency(0)}
        hint={mayor?.descripcion ?? "—"}
      />
    </div>
  );
};
