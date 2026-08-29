import type { Expense } from "../../data/finance-types";

export interface DasboardResponse {
  monthTotal: number;
  lastMonthTotal: number;
  percentajeChange: number;
  movements: number;
  movementsAverage: number;
  highestExpense: HighestExpense;
  evolutionOverTheLast6Months: EvolutionOverTheLast6Month[];
  spendingByCategory: SpendingByCategory[];
  lastMovements: Expense[];
}

export interface EvolutionOverTheLast6Month {
  month: string;
  year: number;
  monthNumber: number;
  total: number;
}

export interface HighestExpense {
  id: number;
  description: string;
  amount: number;
}

export interface SpendingByCategory {
  name: string;
  color: string;
  value: number;
}
