import { useMemo } from "react";
import { useMenudo } from "../../../../context/MenudoContext";
import { monthKey } from "../../../../data/finance-types";
import { EmptyState } from "../../../../components/common/EmptyState";
import { Button } from "../../../../components/ui/button";
import { CardsSummary } from "./CardsSummary";
import { LastMovements } from "./LastMovements";
import { BarChartContent } from "./BarChartContent";
import { PieChartContent } from "./PieChartContent";

export const DashboardContent = ({ onNew }: { onNew: () => void }) => {
  const { expenses, categories, paymentMethods } = useMenudo();

  const data = useMemo(() => {
    const now = new Date();
    const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previous = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

    const currentMonthExpenses = expenses.filter(
      (e) => monthKey(e.date) === current,
    );
    const previousMonthExpenses = expenses.filter(
      (e) => monthKey(e.date) === previous,
    );
    const total = currentMonthExpenses.reduce((s, e) => s + e.amount, 0);
    const totalPrev = previousMonthExpenses.reduce((s, e) => s + e.amount, 0);

    const byCategory = categories
      .map((c) => ({
        name: c.name,
        color: c.color,
        value: currentMonthExpenses
          .filter((e) => e.categoryId === c.id)
          .reduce((s, e) => s + e.amount, 0),
      }))
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value);

    const months = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      return {
        key,
        name: d.toLocaleDateString("en-US", { month: "short" }),
        total: expenses
          .filter((e) => monthKey(e.date) === key)
          .reduce((s, e) => s + e.amount, 0),
      };
    });

    return {
      total,
      totalPrev,
      delta: totalPrev ? ((total - totalPrev) / totalPrev) * 100 : 0,
      count: currentMonthExpenses.length,
      average: currentMonthExpenses.length
        ? total / currentMonthExpenses.length
        : 0,
      highest: [...currentMonthExpenses].sort((a, b) => b.amount - a.amount)[0],
      byCategory,
      months,
      recent: [...expenses]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 6),
    };
  }, [expenses, categories]);

  const {
    total,
    totalPrev,
    count,
    average,
    highest,
    delta,
    months,
    byCategory,
    recent,
  } = data;

  if (!expenses.length)
    return (
      <EmptyState
        title="Todavía no hay gastos registrados"
        description="Cargá tu primer movimiento para empezar a ver estadísticas de tu mes."
        action={<Button onClick={onNew}>Registrar gasto</Button>}
      />
    );

  return (
    <div className="space-y-6">
      {/* Tarjetas de resumen (KPIs del mes) */}
      <CardsSummary
        total={total}
        totalPrev={totalPrev}
        count={count}
        average={average}
        highest={highest}
        delta={delta}
      />

      {/* Gráficos */}
      <div className="grid gap-4 lg:grid-cols-5">
        <BarChartContent months={months} />
        <PieChartContent byCategory={byCategory} />
      </div>

      {/* Últimos movimientos */}
      <LastMovements
        recentExpenses={recent}
        paymentMethods={paymentMethods}
        categories={categories}
      />
    </div>
  );
};
