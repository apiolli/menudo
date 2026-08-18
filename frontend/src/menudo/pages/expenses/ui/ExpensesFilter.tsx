import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Search } from "lucide-react";
import type { Category, PaymentMethod } from "../../../../data/finance-types";

interface Props {
  q: string;
  categoryId: string;
  paymentMethodId: string;
  setQ: (value: React.SetStateAction<string>) => void;
  setPage: (value: React.SetStateAction<number>) => void;
  setCategoryId: (value: React.SetStateAction<string>) => void;
  categories: Category[];
  setPaymentMethodId: React.Dispatch<React.SetStateAction<string>>;
  paymentMethods: PaymentMethod[];
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
  fromDate: string;
  toDate: string;
}

export const ExpensesFilter = ({
  q,
  setQ,
  setPage,
  setCategoryId,
  categoryId,
  paymentMethodId,
  categories,
  setPaymentMethodId,
  paymentMethods,
  setFromDate,
  setToDate,
  fromDate,
  toDate,
}: Props) => {
  const handleCat = (value: string | null) => {
    setCategoryId(value ?? "");
    setPage(1);
  };

  const handlePay = (value: string | null) => {
    setPaymentMethodId(value ?? "");
    setPage(1);
  };
  return (
    <section className="surface grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-5">
      <div className="space-y-2 xl:col-span-1">
        <Label htmlFor="q">Buscar</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="q"
            className="pl-9"
            placeholder="DescripciÃ³nâ€¦"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>CategorÃ­a</Label>
        <Select value={categoryId} onValueChange={handleCat}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>MÃ©todo de pago</Label>
        <Select value={paymentMethodId} onValueChange={handlePay}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            {paymentMethods.map((m) => (
              <SelectItem key={m.id} value={String(m.id)}>
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fromDate">Desde</Label>
        <Input
          id="fromDate"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="toDate">Hasta</Label>
        <Input
          id="toDate"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
    </section>
  );
};
