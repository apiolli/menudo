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
import type { Categoria, MetodoPago } from "../../../../data/finance-types";

interface Props {
  q: string;
  cat: string;
  met: string;
  setQ: (value: React.SetStateAction<string>) => void;
  setPage: (value: React.SetStateAction<number>) => void;
  setCat: (value: React.SetStateAction<string>) => void;
  categorias: Categoria[];
  setMet: React.Dispatch<React.SetStateAction<string>>;
  metodos: MetodoPago[];
  setDesde: React.Dispatch<React.SetStateAction<string>>;
  setHasta: React.Dispatch<React.SetStateAction<string>>;
  desde: string;
  hasta: string;
}

export const ExpensesFilter = ({
  q,
  setQ,
  setPage,
  setCat,
  cat,
  met,
  categorias,
  setMet,
  metodos,
  setDesde,
  setHasta,
  desde,
  hasta,
}: Props) => {
  const handleCat = (value: string | null) => {
    setCat(value ?? "");
    setPage(1);
  };

  const handlePay = (value: string | null) => {
    setMet(value ?? "");
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
            placeholder="Descripción…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Categoría</Label>
        <Select value={cat} onValueChange={handleCat}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            {categorias.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Método de pago</Label>
        <Select value={met} onValueChange={handlePay}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            {metodos.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="desde">Desde</Label>
        <Input
          id="desde"
          type="date"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hasta">Hasta</Label>
        <Input
          id="hasta"
          type="date"
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
        />
      </div>
    </section>
  );
};
