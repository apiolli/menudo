import { apiClient } from "../lib/api";

// Enum equivalente al de C# para usarlo de forma limpia en TypeScript
export const PaymentType = {
  Transfer: 1,
  Cash: 2,
  DebitCard: 3,
  CreditCard: 4,
  VirtualWallet: 5,
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export interface ExpenseSummaryDTO {
  id: string; // O el tipo de ID que uses para los gastos
  amount: number;
  date: string;
  description?: string;
}

export interface PaymentMethod {
  id: number; // Coincide con el 'int Id' del PaymentMethodDTO de C#
  name: string;
  type: PaymentType; // Coincide con PaymentType Type
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
