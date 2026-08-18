import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  currencyExact,
  formatDate,
  type Category,
  type Expense,
  type PaymentMethod,
} from "../../../../data/finance-types";
import { Badge } from "../../../../components/ui/badge";

interface Props {
  recentExpenses: Expense[];
  paymentMethods: PaymentMethod[];
  categories: Category[];
}

export const LastMovements = ({
  recentExpenses,
  paymentMethods,
  categories,
}: Props) => {
  return (
    <section className="surface overflow-hidden">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold">Últimos movimientos</h2>
          <p className="text-xs text-muted-foreground">
            Los 6 gastos más recientes
          </p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          <Link to="/expenses">
            Ver todos <ArrowRight className="size-4" />
          </Link>
        </Button>
      </header>
      <ul className="divide-y divide-border">
        {recentExpenses.map((expense) => {
          const category = categories.find((c) => c.id === expense.categoryId);
          const method = paymentMethods.find(
            (m) => m.id === expense.paymentMethodId,
          );
          return (
            <li
              key={expense.id}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              <span
                className="size-9 shrink-0 rounded-lg"
                style={{
                  backgroundColor: `${category?.color ?? "#888"}22`,
                  border: `1px solid ${category?.color}55`,
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {expense.description}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {formatDate(expense.date)} · {method?.name}
                </p>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {category?.name}
              </Badge>
              <span className="num text-sm font-semibold">
                {currencyExact(expense.amount)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
