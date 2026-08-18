export type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
  budget?: number;
  spent?: number;
  status?: string | number;
  totalExpenses?: number;
};

export type PaymentMethod = {
  id: number;
  name: string;
  type: string | number;
  detail?: string;
  icon?: string;
  color?: string;
  totalExpenses?: number;
};

export type Expense = {
  id: number;
  amount: number;
  date: string; // yyyy-mm-dd or ISO
  description: string;
  categoryId: number;
  paymentMethodId: number;
  category?: Category;
  paymentMethod?: PaymentMethod;
};

export type User = {
  id: number;
  name: string;
  email: string;
  currency?: string;
  avatarColor?: string;
};

// ... tus tipos (Category, PaymentMethod, Expense, User) se mantienen igual

// Cambiamos a 'es-DO' y 'DOP' para formato de República Dominicana
export const currency = (value: number) =>
  new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(value);

export const currencyExact = (value: number) =>
  new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 2,
  }).format(value);

export const formatDate = (iso: string) =>
  new Date(iso.length > 10 ? iso : `${iso}T12:00:00`).toLocaleDateString(
    "es-DO",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

export const monthKey = (iso: string) => iso.slice(0, 7);

export const monthLabel = (key: string) =>
  new Date(`${key}-01T12:00:00`).toLocaleDateString("es-DO", {
    month: "long",
    year: "numeric",
  });
