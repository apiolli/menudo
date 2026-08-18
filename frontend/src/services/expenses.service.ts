import { apiClient } from "../lib/api";
import type { Expense } from "../data/finance-types";

export interface CreateExpenseDTO {
  amount: number;
  date: string; // Formato ISO o "YYYY-MM-DD"
  description: string;
  categoryId: number;
  paymentMethodId: number;
}

export interface UpdateExpenseDTO {
  amount: number;
  date: string;
  description: string;
  categoryId: number;
  paymentMethodId: number;
}

export interface FilterExpenseParams {
  pageNumber?: number;
  pageSize?: number;
  description?: string;
  categoryId?: number | string;
  paymentMethodId?: number | string;
  fromTheDate?: string;
  toTheDate?: string;
}

export interface PaginationExpenseDTO {
  items: Expense[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export const expenseService = {
  // Obtener todos los gastos sin filtros
  async getAll(): Promise<Expense[]> {
    return await apiClient<Expense[]>("/api/expenses");
  },

  // Obtener gastos paginados y filtrados (Consume tu endpoint /api/expenses/filter)
  async getFiltered(
    params: FilterExpenseParams,
  ): Promise<PaginationExpenseDTO> {
    const queryParams = new URLSearchParams();

    if (params.pageNumber)
      queryParams.append("PageNumber", params.pageNumber.toString());
    if (params.pageSize)
      queryParams.append("PageSize", params.pageSize.toString());
    if (params.description)
      queryParams.append("Description", params.description);
    if (params.categoryId && params.categoryId !== "todas") {
      queryParams.append("CategoryId", params.categoryId.toString());
    }
    if (params.paymentMethodId && params.paymentMethodId !== "todos") {
      queryParams.append("PaymentMethodId", params.paymentMethodId.toString());
    }
    if (params.fromTheDate)
      queryParams.append("FromTheDate", params.fromTheDate);
    if (params.toTheDate) queryParams.append("ToTheDate", params.toTheDate);

    return await apiClient<PaginationExpenseDTO>(
      `/api/expenses/filter?${queryParams.toString()}`,
    );
  },

  // Crear un gasto nuevo
  async create(data: CreateExpenseDTO): Promise<Expense> {
    return await apiClient<Expense>("/api/expenses", {
      method: "POST",
      body: data,
    });
  },

  // Actualizar un gasto existente
  async update(id: number, data: UpdateExpenseDTO): Promise<Expense> {
    return await apiClient<Expense>(`/api/expenses/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  // Eliminar un gasto
  async delete(id: number): Promise<void> {
    await apiClient(`/api/expenses/${id}`, {
      method: "DELETE",
    });
  },
};
