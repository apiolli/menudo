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
  porMetodo: {
    name: string;
    value: number;
  }[];
}

export const ReportsBarChart = ({ porMetodo }: Props) => {
  return (
    <section className="surface p-5">
      <h2 className="text-base font-semibold">
        Comparativo por método de pago
      </h2>
      <p className="text-xs text-muted-foreground">
        Monto acumulado por medio utilizado
      </p>
      <div className="mt-3 h-65">
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
              dataKey="value"
              fill="var(--chart-2)"
              radius={[0, 8, 8, 0]}
              maxBarSize={26}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
