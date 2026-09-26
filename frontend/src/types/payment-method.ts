export interface PaymentMethod {
  id: number;
  name: string;
  type: string | number;
  detail?: string;
  icon?: string;
  color?: string;
  totalExpenses?: number;
}
