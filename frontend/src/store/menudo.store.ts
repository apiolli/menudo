import { create } from "zustand";
import type { Category } from "../services/category.service";
import type { Expense } from "../types/expense.interface";
import type { PaymentMethod } from "../types/payment-method";

type MenudoState = {
  expenses: Expense[] | null;
  categories: Category[] | null;
  paymentMethods: PaymentMethod | null;
};

export const useMenudoStore = create<MenudoState>((set) => ({
  expenses: null,
  categories: null,
  paymentMethods: null,
}));
