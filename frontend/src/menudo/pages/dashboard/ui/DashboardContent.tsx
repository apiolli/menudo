import { EmptyState } from "../../../../components/common/EmptyState";
import { Button } from "../../../../components/ui/button";
import { CardsSummary } from "./CardsSummary";
import { LastMovements } from "./LastMovements";
import { EvolutionLast6Months } from "./EvolutionLast6Months";
import { useDashboard } from "../hook/useDasboard";
import { SpendByCategory } from "./SpendByCategory";
import { useExpenses } from "../../expenses/hooks/useExpenses";
import { useCategories } from "../../categories/api/useCategories";
import { usePaymentMethods } from "../../paymentMethods/api/usePaymentMethods";

export const DashboardContent = ({ onNew }: { onNew: () => void }) => {
  const { dashboardData } = useDashboard();
  const { data: categories } = useCategories();
  const { data: paymentMethods } = usePaymentMethods();
  const { data: expenses } = useExpenses();

  if (!expenses || !categories || !paymentMethods)
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
