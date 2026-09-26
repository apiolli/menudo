export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
  budget?: number;
  spent?: number;
  status?: string | number;
  totalExpenses?: number;
}
