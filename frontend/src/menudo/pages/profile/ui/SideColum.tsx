import { LogOut } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  currency,
  type Categoria,
  type Gasto,
  type Usuario,
} from "../../../../data/finance-types";
import { useNavigate } from "react-router";

interface Props {
  usuario: Usuario | null;
  gastos: Gasto[];
  logout: () => void;
  total: number;
  categorias: Categoria[];
}

export const SideColum = ({
  usuario,
  gastos,
  logout,
  total,
  categorias,
}: Props) => {
  const navigate = useNavigate();
  return (
    <aside className="space-y-4">
      {/* Avatar y datos de la cuenta */}
      <div className="surface p-6 text-center">
        <span
          className="mx-auto grid size-16 place-items-center rounded-full text-xl font-semibold text-primary-foreground"
          style={{ backgroundColor: usuario?.avatarColor }}
        >
          {usuario?.nombre.slice(0, 1)}
        </span>
        <p className="mt-3 font-display text-lg font-semibold">
          {usuario?.nombre}
        </p>
        <p className="text-xs text-muted-foreground">{usuario?.email}</p>
      </div>

      {/* Resumen de estadísticas */}
      <div className="surface space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Gastos registrados
          </span>
          <span className="num font-semibold">{gastos.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Categorías activas
          </span>
          <span className="num font-semibold">{categorias.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total histórico</span>
          <span className="num font-semibold">{currency(total)}</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full gap-2 text-destructive hover:text-destructive"
        onClick={() => {
          logout();
          navigate("/auth");
        }}
      >
        <LogOut className="size-4" /> Cerrar sesión
      </Button>
    </aside>
  );
};
