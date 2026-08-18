import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import { apiClient } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import type { Category, PaymentMethod, Expense } from "../data/finance-types";
import {
  expenseService,
  type CreateExpenseDTO,
  type UpdateExpenseDTO,
} from "../services/expenses.service";

interface MenudoContextType {
  categories: Category[];
  paymentMethods: PaymentMethod[];
  expenses: Expense[];
  loading: boolean;
  loadCategories: () => Promise<void>;
  createCategory: (cat: Omit<Category, "id">) => Promise<void>;
  updateCategory: (id: string, cat: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  loadPaymentMethods: () => Promise<void>;
  createPaymentMethod: (pm: Omit<PaymentMethod, "id">) => Promise<void>;
  updatePaymentMethod: (
    id: number,
    pm: Partial<PaymentMethod>,
  ) => Promise<void>;
  deletePaymentMethod: (id: number) => Promise<void>;
  loadExpenses: () => Promise<void>;
  createExpense: (exp: CreateExpenseDTO) => Promise<void>;
  updateExpense: (id: number, exp: UpdateExpenseDTO) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
}

export const MenudoContext = createContext<MenudoContextType | undefined>(
  undefined,
);

export const MenudoProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      const data = await apiClient<Category[]>("/api/categories");
      setCategories(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loadPaymentMethods = useCallback(async () => {
    try {
      const data = await apiClient<PaymentMethod[]>("/api/paymentMethods");
      setPaymentMethods(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loadExpenses = useCallback(async () => {
    try {
      const data = await expenseService.getAll();
      setExpenses(data ?? []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      Promise.all([
        loadCategories(),
        loadPaymentMethods(),
        loadExpenses(),
      ]).finally(() => {
        setLoading(false);
      });
    } else {
      setCategories([]);
      setPaymentMethods([]);
      setExpenses([]);
    }
  }, [isAuthenticated, loadCategories, loadPaymentMethods, loadExpenses]);

  // CATEGORIES
  const createCategory = async (cat: Omit<Category, "id">) => {
    await apiClient("/api/categories", {
      method: "POST",
      body: {
        ...cat,
        status: 1,
      },
    });
    await loadCategories();
  };

  const updateCategory = async (id: string, cat: Partial<Category>) => {
    await apiClient(`/api/categories/${id}`, {
      method: "PUT",
      body: {
        ...cat,
        status: 1,
      },
    });
    await loadCategories();
  };

  const deleteCategory = async (id: string) => {
    await apiClient(`/api/categories/${id}`, { method: "DELETE" });
    await loadCategories();
  };

  // PAYMENT METHODS (id as number)
  const createPaymentMethod = async (pm: Omit<PaymentMethod, "id">) => {
    await apiClient("/api/paymentMethods", {
      method: "POST",
      body: pm,
    });
    await loadPaymentMethods();
  };

  const updatePaymentMethod = async (
    id: number,
    pm: Partial<PaymentMethod>,
  ) => {
    await apiClient(`/api/paymentMethods/${id}`, {
      method: "PUT",
      body: pm,
    });
    await loadPaymentMethods();
  };

  const deletePaymentMethod = async (id: number) => {
    await apiClient(`/api/paymentMethods/${id}`, { method: "DELETE" });
    await loadPaymentMethods();
  };

  // EXPENSES (Integrado con expenseService)
  const createExpense = async (exp: CreateExpenseDTO) => {
    await expenseService.create(exp);
    await loadExpenses();
  };

  const updateExpense = async (id: number, exp: UpdateExpenseDTO) => {
    await expenseService.update(id, exp);
    await loadExpenses();
  };

  const deleteExpense = async (id: number) => {
    await expenseService.delete(id);
    await loadExpenses();
  };

  return (
    <MenudoContext.Provider
      value={{
        categories,
        paymentMethods,
        expenses,
        loading,
        loadCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        loadPaymentMethods,
        createPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
        loadExpenses,
        createExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </MenudoContext.Provider>
  );
};

export const useMenudo = () => {
  const context = useContext(MenudoContext);
  if (!context) throw new Error("useMenudo must be used within MenudoProvider");
  return context;
};
