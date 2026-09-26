import type { Category } from "./category.interface";
import type { PaymentMethod } from "./payment-method";

export interface Expense {
  id: number;
  amount: number;
  date: string; // yyyy-mm-dd or ISO
  description: string;
  categoryId: number;
  paymentMethodId: number;
  category?: Category;
  paymentMethod?: PaymentMethod;
}
