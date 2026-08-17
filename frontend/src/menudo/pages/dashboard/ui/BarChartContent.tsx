import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { currencyExact } from "../../../../data/finance-types";

interface Props {
  meses: {
    key: string;
    name: string;
    total: number;
  }[];
}

export const BarChartContent = ({ meses }: Props) => {
  return (
    <section className="surface p-5 lg:col-span-3">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">
            Evolución de los últimos 6 meses
          </h2>
          <p className="text-xs text-muted-foreground">Total gastado por mes</p>
        </div>
      </header>
      <div className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={meses}
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
              cursor={{ fill: "var(--muted)" }}
              formatter={(value) =>
                value != null ? currencyExact(Number(value)) : "—"
              }
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card)",
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="total"
              fill="var(--chart-1)"
              radius={[8, 8, 0, 0]}
              maxBarSize={46}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
