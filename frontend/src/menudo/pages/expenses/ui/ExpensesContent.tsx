import { useState, useEffect, useCallback } from "react";
import { expenseService } from "../../../../services/expenses.service";
import { toast } from "sonner";
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
import { useCategories } from "../../categories/api/useCategories";
import { usePaymentMethods } from "../../paymentMethods/hooks/usePaymentMethods";
import { EmptyState } from "../../../../components/common/EmptyState";
import { CardsSkeleton } from "../../../../components/common/CardSkeleton";
import type { Expense } from "../../../../types/expense.interface";
import { useSearchParams } from "react-router";

interface Props {
  onNew: () => void;
  onEdit: () => void;
  refreshTrigger: number;
}

const PAGE_SIZE = 8;

export const ExpensesContent = ({ onNew, onEdit, refreshTrigger }: Props) => {
  const [visibleExpenses, setVisibleExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useCategories();
  const paymentMethods = usePaymentMethods();

  const categoriesData = categories.data;
  const paymentMethodsData = paymentMethods.data;

  if (categories.isLoading || paymentMethods.isLoading)
    return <CardsSkeleton />;

  if (!categoriesData || !paymentMethodsData) {
    const isEmpty = categoriesData ? "metodos de pago" : "categorias";
    return (
      <EmptyState
        title={`Todavia no tienes ${isEmpty}`}
        description="Registra"
      />
    );
  }

  const q = searchParams.get("q") ?? "";
  const setQ = (q: string) => {
    searchParams.set("q", q);
    setSearchParams(searchParams);
  };

  const categoryId = searchParams.get("categoryId") ?? "todas";
  const setCategoryId = (categoryId: string) => {
    searchParams.set("categoryId", categoryId);
    setSearchParams(searchParams);
  };

  const paymentMethodId = searchParams.get("paymentMethodId") ?? "todos";
  const setPaymentMethodId = (paymentMethodId: string) => {
    searchParams.set("paymentMethodId", paymentMethodId);
    setSearchParams(searchParams);
  };

  const fromDate = searchParams.get("fromDate") ?? "";
  const setFromDate = (fromDate: string) => {
    searchParams.set("fromDate", fromDate);
    setSearchParams(searchParams);
  };

  const toDate = searchParams.get("toDate") ?? "";
  const setToDate = (toDate: string) => {
    searchParams.set("toDate", toDate);
    setSearchParams(searchParams);
  };

  const page = Number(searchParams.get("page")) ?? 1;
  const setPage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const totalItems = Number(searchParams.get("totalItems")) ?? 0;
  const setTotalItems = (totalItems: number) => {
    searchParams.set("totalItems", totalItems.toString());
    setSearchParams(searchParams);
  };

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await expenseService.getFiltered({
        pageNumber: page,
        pageSize: PAGE_SIZE,
        description: q || undefined,
        categoryId: categoryId !== "todas" ? categoryId : undefined,
        paymentMethodId:
          paymentMethodId !== "todos" ? paymentMethodId : undefined,
        fromTheDate: fromDate || undefined,
        toTheDate: toDate || undefined,
      });

      setVisibleExpenses(res?.items ?? []);
      setTotalItems(res?.totalItems ?? 0);
    } catch (error) {
      toast.error("Error al cargar los gastos");
      setVisibleExpenses([]);
      setTotalItems(0);
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

  return (
    <div className="space-y-5">
      <ExpensesFilter
        q={q}
        categoryId={categoryId}
        paymentMethodId={paymentMethodId}
        setQ={setQ}
        setPage={setPage}
        setCategoryId={setCategoryId}
        categories={categoriesData}
        setPaymentMethodId={setPaymentMethodId}
        paymentMethods={paymentMethodsData}
        setFromDate={setFromDate}
        setToDate={setToDate}
        fromDate={fromDate}
        toDate={toDate}
      />

      <ResultsSummary
        total={total}
        hasFilters={hasFilters ? true : ""}
        filteredExpenses={visibleExpenses}
      />

      <div className={loading ? "opacity-50 pointer-events-none" : ""}>
        <ExpensesTable
          filteredExpenses={visibleExpenses}
          hasFilters={hasFilters ? true : ""}
          visibleExpenses={visibleExpenses}
          categories={categoriesData}
          paymentMethods={paymentMethodsData}
          onNew={onNew}
          onEdit={onEdit}
          current={page}
          pages={pages}
          setPage={setPage}
        />
      </div>

      {/* <AlertDialog
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
                    // await deleteExpense(toDelete.id);
                    toast.success("Gasto eliminado");
                    // fetchExpenses();
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
      </AlertDialog> */}
    </div>
  );
};
