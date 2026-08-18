import { createFileRoute } from "@tanstack/react-router";
import { useContext, useMemo, useState, type SetStateAction } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { EmptyState, RequireAuth, StatCard } from "@/components/common";
import { ExportDialog } from "@/components/export-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useFinance } from "@/store/finance-store";
import { currency, currencyExact, monthKey } from "@/lib/finance-types";
import { MenudoContext } from "../../../context/MenudoContext";
import { ReportsFilter } from "./ui/ReportsFilter";

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
            <section className="surface p-5 lg:col-span-3">
              <h2 className="text-base font-semibold">Tendencia mensual</h2>
              <p className="text-xs text-muted-foreground">
                Evolución del gasto en el período
              </p>
              <div className="mt-3 h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={serieMensual}
                    margin={{ top: 8, right: 8, left: -14, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                      tickFormatter={(v) => `$${v / 1000}k`}
                    />
                    <Tooltip
                      formatter={(v: number) => currencyExact(v)}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        background: "var(--card)",
                        fontSize: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="var(--chart-1)"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "var(--chart-1)" }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Gráfico de torta: participación por categoría */}
            <section className="surface p-5 lg:col-span-2">
              <h2 className="text-base font-semibold">
                Participación por categoría
              </h2>
              <p className="text-xs text-muted-foreground">
                Del total del período
              </p>
              <div className="mt-3 h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={porCategoria}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={92}
                      stroke="var(--card)"
                      isAnimationActive={false}
                    >
                      {porCategoria.map((c) => (
                        <Cell key={c.name} fill={c.color} />
                      ))}
                    </Pie>
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(v: number) => currencyExact(v)}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        background: "var(--card)",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Gráfico de barras: comparativo por método de pago */}
          <section className="surface p-5">
            <h2 className="text-base font-semibold">
              Comparativo por método de pago
            </h2>
            <p className="text-xs text-muted-foreground">
              Monto acumulado por medio utilizado
            </p>
            <div className="mt-3 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={porMetodo}
                  layout="vertical"
                  margin={{ top: 8, right: 16, left: 24, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="var(--border)"
                  />
                  <XAxis
                    type="number"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                    width={110}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--muted)" }}
                    formatter={(v: number) => currencyExact(v)}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--chart-2)"
                    radius={[0, 8, 8, 0]}
                    maxBarSize={26}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Tabla de detalle por categoría */}
          <section className="surface overflow-hidden">
            <header className="border-b border-border px-5 py-4">
              <h2 className="text-base font-semibold">Detalle por categoría</h2>
              <p className="text-xs text-muted-foreground">
                Participación sobre el total del período
              </p>
            </header>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Gastos</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-[220px]">Participación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {porCategoria.map((c) => (
                    <TableRow key={c.name}>
                      <TableCell>
                        <span className="inline-flex items-center gap-2 font-medium">
                          <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: c.color }}
                          />
                          {c.name}
                        </span>
                      </TableCell>
                      <TableCell className="num text-right">
                        {c.cantidad}
                      </TableCell>
                      <TableCell className="num text-right font-semibold">
                        {currencyExact(c.value)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={(c.value / total) * 100}
                            className="h-2"
                          />
                          <span className="num w-12 text-right text-xs text-muted-foreground">
                            {((c.value / total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
