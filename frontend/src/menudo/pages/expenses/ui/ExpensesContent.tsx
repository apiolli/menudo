import { useState, useEffect, useCallback } from "react";
import { type Expense } from "../../../../data/finance-types";
import { useMenudo } from "../../../../context/MenudoContext";
import { toast } from "sonner";
import { apiClient } from "../../../../lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../components/ui/alert-dialog";
import { ResultsSummary } from "./ResultsSummary";
import { ExpensesFilter } from "./ExpensesFilter";
import { ExpensesTable } from "./ExpensesTable";

interface Props {
  onNew: () => void;
  onEdit: (g: Expense) => void;
  refreshTrigger: number;
}

const PAGE_SIZE = 8;

export const ExpensesContent = ({ onNew, onEdit, refreshTrigger }: Props) => {
  const { categories, paymentMethods, deleteExpense } = useMenudo();
  const [q, setQ] = useState("");
  const [categoryId, setCategoryId] = useState("todas");
  const [paymentMethodId, setPaymentMethodId] = useState("todos");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<Expense | null>(null);

  const [visibleExpenses, setVisibleExpenses] = useState<Expense[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("PageNumber", page.toString());
      params.append("PageSize", PAGE_SIZE.toString());
      if (q) params.append("Description", q);
      if (categoryId !== "todas") params.append("CategoryId", categoryId);
      if (paymentMethodId !== "todos")
        params.append("PaymentMethodId", paymentMethodId);
      if (fromDate) params.append("FromTheDate", fromDate);
      if (toDate) params.append("ToTheDate", toDate);

      const res = await apiClient<any>(
        `/api/expenses/filter?${params.toString()}`,
      );
      setVisibleExpenses(res.items);
      setTotalItems(res.totalItems);
    } catch (error) {
      toast.error("Error al cargar los gastos");
    } finally {
      setLoading(false);
    }
  }, [page, q, categoryId, paymentMethodId, fromDate, toDate, refreshTrigger]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const total = visibleExpenses.reduce((s, g) => s + g.amount, 0);
  const pages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const hasFilters =
    q ||
    categoryId !== "todas" ||
    paymentMethodId !== "todos" ||
    fromDate ||
    toDate;

  const clearFilters = () => {
    setQ("");
    setCategoryId("todas");
    setPaymentMethodId("todos");
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <ExpensesFilter
        q={q}
        categoryId={categoryId}
        paymentMethodId={paymentMethodId}
        setQ={setQ}
        setPage={setPage}
        setCategoryId={setCategoryId}
        categories={categories}
        setPaymentMethodId={setPaymentMethodId}
        paymentMethods={paymentMethods}
        setFromDate={setFromDate}
        setToDate={setToDate}
        fromDate={fromDate}
        toDate={toDate}
      />

      <ResultsSummary
        total={total}
        hasFilters={hasFilters ? true : ""}
        clearFilters={clearFilters}
        filteredExpenses={visibleExpenses}
      />

      <div className={loading ? "opacity-50 pointer-events-none" : ""}>
        <ExpensesTable
          filteredExpenses={visibleExpenses}
          hasFilters={hasFilters ? true : ""}
          visibleExpenses={visibleExpenses}
          categories={categories}
          paymentMethods={paymentMethods}
          onNew={onNew}
          clearFilters={clearFilters}
          onEdit={onEdit}
          setToDelete={setToDelete}
          current={page}
          pages={pages}
          setPage={setPage}
        />
      </div>

      <AlertDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este gasto?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará “{toDelete?.description}” de forma permanente. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (toDelete) {
                  try {
                    await deleteExpense(toDelete.id);
                    toast.success("Gasto eliminado");
                    fetchExpenses();
                  } catch (e) {
                    toast.error("Error al eliminar el gasto");
                  }
                }
                setToDelete(null);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
