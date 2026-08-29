import { useMenudo } from "../../../../context/MenudoContext";
import { EmptyState } from "../../../../components/common/EmptyState";
import { Button } from "../../../../components/ui/button";
import { CardsSummary } from "./CardsSummary";
import { LastMovements } from "./LastMovements";
import { EvolutionLast6Months } from "./EvolutionLast6Months";
import { useDashboard } from "../hook/useDasboard";
import { SpendByCategory } from "./SpendByCategory";

export const DashboardContent = ({ onNew }: { onNew: () => void }) => {
  const { expenses, categories, paymentMethods } = useMenudo();
  const { dashboardData } = useDashboard();

  if (!expenses.length)
    return (
      <EmptyState
        title="Todavía no hay gastos registrados"
        description="Carga tu primer movimiento para empezar a ver estadísticas de tu mes."
        action={<Button onClick={onNew}>Registrar gasto</Button>}
      />
    );

  if (!dashboardData) return;

  const evolution = dashboardData.evolutionOverTheLast6Months.map((spend) => {
    return {
      key: `${spend.year}-${spend.monthNumber}`,
      name: spend.month,
      total: spend.total,
    };
  });

  return (
    <div className="space-y-6">
      <CardsSummary
        total={dashboardData?.monthTotal}
        totalPrev={dashboardData.lastMonthTotal}
        count={dashboardData.movements}
        average={dashboardData.movementsAverage}
        highest={dashboardData.highestExpense}
        delta={dashboardData.percentajeChange}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <EvolutionLast6Months months={evolution} />
        <SpendByCategory byCategory={dashboardData.spendingByCategory} />
      </div>

      <LastMovements
        recentExpenses={dashboardData.lastMovements}
        paymentMethods={paymentMethods}
        categories={categories}
      />
    </div>
  );
};
