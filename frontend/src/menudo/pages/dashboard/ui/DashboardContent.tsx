import { useContext, useMemo } from "react";
import { MenudoContext } from "../../../../context/MenudoContext";
import { monthKey } from "../../../../data/finance-types";
import { EmptyState } from "../../../../components/common/EmptyState";
import { Button } from "../../../../components/ui/button";
import { CardsSummary } from "./CardsSummary";
import { LastMovements } from "./LastMovements";
import { BarChartContent } from "./BarChartContent";
import { PieChartContent } from "./PieChartContent";

export const DashboardContent = ({ onNuevo }: { onNuevo: () => void }) => {
  const { gastos, categorias, metodos } = useContext(MenudoContext);

  const data = useMemo(() => {
    const now = new Date();
    const actual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const anterior = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

    const delMes = gastos.filter((g) => monthKey(g.fecha) === actual);
    const delAnterior = gastos.filter((g) => monthKey(g.fecha) === anterior);
    const total = delMes.reduce((s, g) => s + g.monto, 0);
    const totalPrev = delAnterior.reduce((s, g) => s + g.monto, 0);

    const porCategoria = categorias
      .map((c) => ({
        name: c.nombre,
        color: c.color,
        value: delMes
          .filter((g) => g.categoriaId === c.id)
          .reduce((s, g) => s + g.monto, 0),
      }))
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value);

    const meses = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      return {
        key,
        name: d.toLocaleDateString("es-AR", { month: "short" }),
        total: gastos
          .filter((g) => monthKey(g.fecha) === key)
          .reduce((s, g) => s + g.monto, 0),
      };
    });

    return {
      total,
      totalPrev,
      delta: totalPrev ? ((total - totalPrev) / totalPrev) * 100 : 0,
      cantidad: delMes.length,
      promedio: delMes.length ? total / delMes.length : 0,
      mayor: [...delMes].sort((a, b) => b.monto - a.monto)[0],
      porCategoria,
      meses,
      recientes: [...gastos]
        .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
        .slice(0, 6),
    };
  }, [gastos, categorias]);

  const {
    total,
    totalPrev,
    cantidad,
    promedio,
    mayor,
    delta,
    meses,
    porCategoria,
    recientes,
  } = data;

  if (!gastos.length)
    return (
      <EmptyState
        title="Todavía no hay gastos registrados"
        description="Cargá tu primer movimiento para empezar a ver estadísticas de tu mes."
        action={<Button onClick={onNuevo}>Registrar gasto</Button>}
      />
    );

  return (
    <div className="space-y-6">
      {/* Tarjetas de resumen (KPIs del mes) */}
      <CardsSummary
        total={total}
        totalPrev={totalPrev}
        cantidad={cantidad}
        promedio={promedio}
        mayor={mayor}
        delta={delta}
      />

      {/* Gráficos */}
      <div className="grid gap-4 lg:grid-cols-5">
        <BarChartContent meses={meses} />
        <PieChartContent porCategoria={porCategoria} />
      </div>

      {/* Últimos movimientos */}
      <LastMovements
        recientes={recientes}
        metodos={metodos}
        categorias={categorias}
      />
    </div>
  );
};
