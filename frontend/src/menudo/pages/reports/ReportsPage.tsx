import { useMemo, useState } from "react";
import { useMenudo } from "../../../context/MenudoContext";

import { ReportsFilter } from "./ui/ReportsFilter";
import { DetailedCategoryTable } from "./ui/DetailedCategoryTable";
import { ReportsBarChart } from "./ui/ReportsBarChart";
import { ReportsPieChart } from "./ui/ReportsPieChart";
import { ReportsLineGraph } from "./ui/ReportsLineGraph";
import { AppShell } from "../../layouts/AppShell";
import { RequireAuth } from "../../../components/common/RequireAuth";
import { ExportDialog } from "../../../components/custom/ExportDialog";
import { currency, monthKey } from "../../../data/finance-types";
import { EmptyState } from "../../../components/common/EmptyState";
import { StatCard } from "../../../components/common/StatCard";

export const ReportsPage = () => {
  const today = new Date();
  const defaultFromDate = new Date(today.getFullYear(), today.getMonth() - 5, 1)
    .toISOString()
    .slice(0, 10);
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(today.toISOString().slice(0, 10));

  return (
    <AppShell
      title="Reportes y anÃ¡lisis"
      subtitle="ComparÃ¡ perÃ­odos y descubrÃ­ tendencias"
      actions={<ExportDialog fromDate={fromDate} toDate={toDate} />}
    >
      <RequireAuth>
        <Content
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </RequireAuth>
    </AppShell>
  );
};

function Content({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: {
  fromDate: string;
  toDate: string;
  setFromDate: (v: string) => void;
  setToDate: (v: string) => void;
}) {
  const { expenses, categories, paymentMethods } = useMenudo();
  const [category, setCategory] = useState("todas");

  const filtered = useMemo(
    () =>
      expenses.filter(
        (g) =>
          g.date >= fromDate &&
          g.date <= toDate &&
          (category === "todas" || String(g.categoryId) === category),
      ),
    [expenses, fromDate, toDate, category],
  );

  const monthlySeries = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((g) =>
      map.set(monthKey(g.date), (map.get(monthKey(g.date)) ?? 0) + g.amount),
    );
    return [...map.entries()]
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([key, total]) => ({
        name: new Date(`${key}-01T12:00:00`).toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        total: Math.round(total),
      }));
  }, [filtered]);

  const byCategory = useMemo(
    () =>
      categories
        .map((c) => ({
          name: c.name,
          color: c.color,
          value: Math.round(
            filtered
              .filter((g) => g.categoryId === c.id)
              .reduce((s, g) => s + g.amount, 0),
          ),
          count: filtered.filter((g) => g.categoryId === c.id).length,
        }))
        .filter((c) => c.value > 0)
        .sort((a, b) => b.value - a.value),
    [categories, filtered],
  );

  const byMethod = useMemo(
    () =>
      paymentMethods
        .map((m) => ({
          name: m.name,
          value: Math.round(
            filtered
              .filter((g) => g.paymentMethodId === m.id)
              .reduce((s, g) => s + g.amount, 0),
          ),
        }))
        .filter((m) => m.value > 0),
    [paymentMethods, filtered],
  );

  const total = filtered.reduce((s, g) => s + g.amount, 0);
  const months = monthlySeries.length || 1;

  return (
    <div className="space-y-6">
      {/* Filtros: rango de fechas y categorÃ­a */}
      <ReportsFilter
        fromDate={fromDate}
        toDate={toDate}
        category={category}
        setCategory={setCategory}
        setFromDate={setFromDate}
        setToDate={setToDate}
        categories={categories}
      />

      {/* Estado vacÃ­o / Contenido del reporte */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No hay datos en este perÃ­odo"
          description="AmpliÃ¡ el rango de fechas o cambiÃ¡ la categorÃ­a seleccionada."
          action={undefined}
        />
      ) : (
        <>
          {/* Indicadores del perÃ­odo */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              accent
              label="Total del perÃ­odo"
              value={currency(total)}
              hint={`${filtered.length} gastos`}
            />
            <StatCard
              label="Promedio mensual"
              value={currency(total / months)}
              hint={`${months} meses`}
            />
            <StatCard
              label="Ticket promedio"
              value={currency(total / filtered.length)}
              hint="por movimiento"
            />
            <StatCard
              label="CategorÃ­a top"
              value={byCategory[0]?.name ?? "â€”"}
              hint={byCategory[0] ? currency(byCategory[0].value) : ""}
            />
          </div>

          {/* GrÃ¡ficos comparativos */}
          <div className="grid gap-4 lg:grid-cols-5">
            {/* GrÃ¡fico de lÃ­neas: tendencia mensual */}
            <ReportsLineGraph monthlySeries={monthlySeries} />

            {/* GrÃ¡fico de torta: participaciÃ³n por categorÃ­a */}
            <ReportsPieChart byCategory={byCategory} />
          </div>

          {/* GrÃ¡fico de barras: comparativo por mÃ©todo de pago */}
          <ReportsBarChart byMethod={byMethod} />

          {/* Tabla de detalle por categorÃ­a */}
          <DetailedCategoryTable byCategory={byCategory} total={total} />
        </>
      )}
    </div>
  );
}
