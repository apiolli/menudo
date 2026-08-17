import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  currencyExact,
  formatDate,
  type Categoria,
  type Gasto,
  type MetodoPago,
} from "../../../../data/finance-types";
import { Badge } from "../../../../components/ui/badge";

interface Props {
  recientes: Gasto[];
  metodos: MetodoPago[];
  categorias: Categoria[];
}

export const LastMovements = ({ recientes, metodos, categorias }: Props) => {
  return (
    <section className="surface overflow-hidden">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold">Últimos movimientos</h2>
          <p className="text-xs text-muted-foreground">
            Los 6 gastos más recientes
          </p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          <Link to="/gastos">
            Ver todos <ArrowRight className="size-4" />
          </Link>
        </Button>
      </header>
      <ul className="divide-y divide-border">
        {recientes.map((g) => {
          const cat = categorias.find((c) => c.id === g.categoriaId);
          const met = metodos.find((m) => m.id === g.metodoPagoId);
          return (
            <li key={g.id} className="flex items-center gap-4 px-5 py-3.5">
              <span
                className="size-9 shrink-0 rounded-lg"
                style={{
                  backgroundColor: `${cat?.color ?? "#888"}22`,
                  border: `1px solid ${cat?.color}55`,
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{g.descripcion}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {formatDate(g.fecha)} · {met?.nombre}
                </p>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {cat?.nombre}
              </Badge>
              <span className="num text-sm font-semibold">
                {currencyExact(g.monto)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
