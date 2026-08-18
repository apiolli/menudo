import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { currencyExact } from "../../../../data/finance-types";

interface Props {
  serieMensual: {
    name: string;
    total: number;
  }[];
}

export const ReportsLineGraph = ({ serieMensual }: Props) => {
  return (
    <section className="surface p-5 lg:col-span-3">
      <h2 className="text-base font-semibold">Tendencia mensual</h2>
      <p className="text-xs text-muted-foreground">
        Evolución del gasto en el período
      </p>
      <div className="mt-3 h-70">
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
  );
};
