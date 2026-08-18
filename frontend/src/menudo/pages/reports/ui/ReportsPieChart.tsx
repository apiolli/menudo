import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { currencyExact } from "../../../../data/finance-types";

interface Props {
  byCategory: {
    name: string;
    color: string;
    value: number;
    count: number;
  }[];
}

export const ReportsPieChart = ({ byCategory }: Props) => {
  return (
    <section className="surface p-5 lg:col-span-2">
      <h2 className="text-base font-semibold">Participación por categoría</h2>
      <p className="text-xs text-muted-foreground">Del total del período</p>
      <div className="mt-3 h-70">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={byCategory}
              dataKey="value"
              nameKey="name"
              outerRadius={92}
              stroke="var(--card)"
              isAnimationActive={false}
            >
              {byCategory.map((c) => (
                <Cell key={c.name} fill={c.color} />
              ))}
            </Pie>
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
