export interface PaymentMethod {
  id: number;
  name: string;
  paymentType: string | number;
  detail?: string;
  icon?: string;
  color?: string;
  totalExpenses?: number;
}
