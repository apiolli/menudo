import { apiClient } from "../lib/api";

export const PaymentType = {
  Transfer: 1,
  Cash: 2,
  DebitCard: 3,
  CreditCard: 4,
  VirtualWallet: 5,
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export interface ExpenseSummaryDTO {
  id: string;
  amount: number;
  date: string;
  description?: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  type: PaymentType;
  detail?: string | null;
  icon: string;
  color: string;
  totalExpenses: number;
  expenses: ExpenseSummaryDTO[];
}

export interface CreatePaymentMethodDTO {
  name: string;
  paymentType: PaymentType;
  detail?: string;
  icon: string;
  color: string;
}

export interface UpdatePaymentMethodDTO {
  name: string;
  type: PaymentType;
  detail?: string;
  icon: string;
  color: string;
}

export const paymentMethodService = {
  // Obtener todos los métodos de pago
  async getAll(): Promise<PaymentMethod[]> {
    return await apiClient<PaymentMethod[]>("/api/paymentMethods");
  },

  // Crear un método de pago nuevo
  async create(data: CreatePaymentMethodDTO): Promise<PaymentMethod> {
    return await apiClient<PaymentMethod>("/api/paymentMethods", {
      method: "POST",
      body: data,
    });
  },

  // Actualizar un método de pago existente
  async update(
    id: number,
    data: UpdatePaymentMethodDTO,
  ): Promise<PaymentMethod> {
    return await apiClient<PaymentMethod>(`/api/paymentMethods/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  // Eliminar un método de pago
  async delete(id: number): Promise<void> {
    await apiClient(`/api/paymentMethods/${id}`, {
      method: "DELETE",
    });
  },
};
