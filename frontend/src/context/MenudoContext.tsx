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

interface MenudoContextType {
  categories: Category[];
  paymentMethods: PaymentMethod[];
  expenses: Expense[];
  loading: boolean;
  loadCategories: () => Promise<void>;
  createCategory: (cat: Omit<Category, "id">) => Promise<void>;
  updateCategory: (id: number, cat: Partial<Category>) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  loadPaymentMethods: () => Promise<void>;
  createPaymentMethod: (pm: Omit<PaymentMethod, "id">) => Promise<void>;
  updatePaymentMethod: (
    id: number,
    pm: Partial<PaymentMethod>,
  ) => Promise<void>;
  deletePaymentMethod: (id: number) => Promise<void>;
  loadExpenses: () => Promise<void>;
  createExpense: (
    exp: Omit<Expense, "id" | "category" | "paymentMethod">,
  ) => Promise<void>;
  updateExpense: (id: number, exp: Partial<Expense>) => Promise<void>;
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
      const data = await apiClient<Expense[]>("/api/expenses");
      setExpenses(data);
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
      body: JSON.stringify(cat),
    });
    await loadCategories();
  };

  const updateCategory = async (id: number, cat: Partial<Category>) => {
    await apiClient(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(cat),
    });
    await loadCategories();
  };

  const deleteCategory = async (id: number) => {
    await apiClient(`/api/categories/${id}`, { method: "DELETE" });
    await loadCategories();
  };

  // PAYMENT METHODS
  const createPaymentMethod = async (pm: Omit<PaymentMethod, "id">) => {
    await apiClient("/api/paymentMethods", {
      method: "POST",
      body: JSON.stringify(pm),
    });
    await loadPaymentMethods();
  };

  const updatePaymentMethod = async (
    id: number,
    pm: Partial<PaymentMethod>,
  ) => {
    await apiClient(`/api/paymentMethods/${id}`, {
      method: "PUT",
      body: JSON.stringify(pm),
    });
    await loadPaymentMethods();
  };

  const deletePaymentMethod = async (id: number) => {
    await apiClient(`/api/paymentMethods/${id}`, { method: "DELETE" });
    await loadPaymentMethods();
  };

  // EXPENSES
  const createExpense = async (
    exp: Omit<Expense, "id" | "category" | "paymentMethod">,
  ) => {
    await apiClient("/api/expenses", {
      method: "POST",
      body: JSON.stringify(exp),
    });
    await loadExpenses();
  };

  const updateExpense = async (id: number, exp: Partial<Expense>) => {
    await apiClient(`/api/expenses/${id}`, {
      method: "PUT",
      body: JSON.stringify(exp),
    });
    await loadExpenses();
  };

  const deleteExpense = async (id: number) => {
    await apiClient(`/api/expenses/${id}`, { method: "DELETE" });
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
