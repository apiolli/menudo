import { EmptyState } from "../../../../components/common/EmptyState";
import { Button } from "../../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import {
  formatDate,
  currencyExact,
  type Expense,
  type Category,
  type PaymentMethod,
} from "../../../../data/finance-types";
import { ExpensesPagination } from "./ExpensesPagination";
import { Badge } from "../../../../components/ui/badge";
import type { SetStateAction } from "react";

interface Props {
  filteredExpenses: Expense[];
  hasFilters: string | true;
  visibleExpenses: Expense[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  onNew: () => void;
  clearFilters: () => void;
  onEdit: (g: Expense) => void;
  setToDelete: React.Dispatch<SetStateAction<Expense | null>>;
  current: number;
  pages: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}

export const ExpensesTable = ({
  filteredExpenses,
  hasFilters,
  visibleExpenses,
  categories,
  paymentMethods,
  onNew,
  clearFilters,
  onEdit,
  setToDelete,
  current,
  pages,
  setPage,
}: Props) => {
  return (
    <>
      {filteredExpenses.length === 0 ? (
        <EmptyState
          title={hasFilters ? "Sin resultados" : "AÃºn no cargaste gastos"}
          description={
            hasFilters
              ? "ProbÃ¡ ajustando los filtros o el tÃ©rmino de bÃºsqueda."
              : "RegistrÃ¡ tu primer gasto para verlo acÃ¡."
          }
          action={
            hasFilters ? (
              <Button variant="outline" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            ) : (
              <Button onClick={onNew}>Registrar gasto</Button>
            )
          }
        />
      ) : (
        <section className="surface overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>DescripciÃ³n</TableHead>
                  <TableHead>CategorÃ­a</TableHead>
                  <TableHead>MÃ©todo</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="w-24 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleExpenses.map((g) => {
                  const c = categories.find((x) => x.id === g.categoryId);
                  const m = paymentMethods.find(
                    (x) => x.id === g.paymentMethodId,
                  );
                  return (
                    <TableRow key={g.id}>
                      <TableCell className="num whitespace-nowrap text-sm text-muted-foreground">
                        {formatDate(g.date)}
                      </TableCell>
                      <TableCell className="max-w-60 truncate font-medium">
                        {g.description}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-2 text-sm">
                          <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: c?.color }}
                          />
                          {c?.name ?? "â€”"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{m?.name ?? "â€”"}</Badge>
                      </TableCell>
                      <TableCell className="num text-right font-semibold">
                        {currencyExact(g.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(g)}
                          aria-label="Editar"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setToDelete(g)}
                          aria-label="Eliminar"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <ExpensesPagination
            current={current}
            pages={pages}
            setPage={setPage}
          />
        </section>
      )}
    </>
  );
};
