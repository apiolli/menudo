import { useContext, useMemo, useState } from "react";

import { MenudoContext } from "../../../context/MenudoContext";
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
  const hoy = new Date();
  const desdeDefault = new Date(hoy.getFullYear(), hoy.getMonth() - 5, 1)
    .toISOString()
    .slice(0, 10);
  const [desde, setDesde] = useState(desdeDefault);
  const [hasta, setHasta] = useState(hoy.toISOString().slice(0, 10));

  return (
    <AppShell
      title="Reportes y análisis"
      subtitle="Compará períodos y descubrí tendencias"
      actions={<ExportDialog desde={desde} hasta={hasta} />}
    >
      <RequireAuth>
        <Contenido
          desde={desde}
          hasta={hasta}
          setDesde={setDesde}
          setHasta={setHasta}
        />
      </RequireAuth>
    </AppShell>
  );
};

function Contenido({
  desde,
  hasta,
  setDesde,
  setHasta,
}: {
  desde: string;
  hasta: string;
  setDesde: (v: string) => void;
  setHasta: (v: string) => void;
}) {
  const { gastos, categorias, metodos } = useContext(MenudoContext);
  const [cat, setCat] = useState("todas");

  const filtrados = useMemo(
    () =>
      gastos.filter(
        (g) =>
          g.fecha >= desde &&
          g.fecha <= hasta &&
          (cat === "todas" || g.categoriaId === cat),
      ),
    [gastos, desde, hasta, cat],
  );

  const serieMensual = useMemo(() => {
    const map = new Map<string, number>();
    filtrados.forEach((g) =>
      map.set(monthKey(g.fecha), (map.get(monthKey(g.fecha)) ?? 0) + g.monto),
    );
    return [...map.entries()]
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([key, total]) => ({
        name: new Date(`${key}-01T12:00:00`).toLocaleDateString("es-AR", {
          month: "short",
          year: "2-digit",
        }),
        total: Math.round(total),
      }));
  }, [filtrados]);

  const porCategoria = useMemo(
    () =>
      categorias
        .map((c) => ({
          name: c.nombre,
          color: c.color,
          value: Math.round(
            filtrados
              .filter((g) => g.categoriaId === c.id)
              .reduce((s, g) => s + g.monto, 0),
          ),
          cantidad: filtrados.filter((g) => g.categoriaId === c.id).length,
        }))
        .filter((c) => c.value > 0)
        .sort((a, b) => b.value - a.value),
    [categorias, filtrados],
  );

  const porMetodo = useMemo(
    () =>
      metodos
        .map((m) => ({
          name: m.nombre,
          value: Math.round(
            filtrados
              .filter((g) => g.metodoPagoId === m.id)
              .reduce((s, g) => s + g.monto, 0),
          ),
        }))
        .filter((m) => m.value > 0),
    [metodos, filtrados],
  );

  const total = filtrados.reduce((s, g) => s + g.monto, 0);
  const meses = serieMensual.length || 1;

  return (
    <div className="space-y-6">
      {/* Filtros: rango de fechas y categoría */}
      <ReportsFilter
        desde={desde}
        hasta={hasta}
        cat={cat}
        setCat={setCat}
        setDesde={setDesde}
        setHasta={setHasta}
        categorias={categorias}
      />

      {/* Estado vacío / Contenido del reporte */}
      {filtrados.length === 0 ? (
        <EmptyState
          title="No hay datos en este período"
          description="Ampliá el rango de fechas o cambiá la categoría seleccionada."
          action={undefined}
        />
      ) : (
        <>
          {/* Indicadores del período */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              accent
              label="Total del período"
              value={currency(total)}
              hint={`${filtrados.length} gastos`}
            />
            <StatCard
              label="Promedio mensual"
              value={currency(total / meses)}
              hint={`${meses} meses`}
            />
            <StatCard
              label="Ticket promedio"
              value={currency(total / filtrados.length)}
              hint="por movimiento"
            />
            <StatCard
              label="Categoría top"
              value={porCategoria[0]?.name ?? "—"}
              hint={porCategoria[0] ? currency(porCategoria[0].value) : ""}
            />
          </div>

          {/* Gráficos comparativos */}
          <div className="grid gap-4 lg:grid-cols-5">
            {/* Gráfico de líneas: tendencia mensual */}
            <ReportsLineGraph serieMensual={serieMensual} />

            {/* Gráfico de torta: participación por categoría */}
            <ReportsPieChart porCategoria={porCategoria} />
          </div>

          {/* Gráfico de barras: comparativo por método de pago */}
          <ReportsBarChart porMetodo={porMetodo} />

          {/* Tabla de detalle por categoría */}
          <DetailedCategoryTable porCategoria={porCategoria} total={total} />
        </>
      )}
    </div>
  );
}
