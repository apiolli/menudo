import { LogOut } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  currencyExact,
  type Category,
  type Expense,
} from "../../../../data/finance-types";
import { useNavigate } from "react-router";

interface Props {
  user: any | null;
  expenses: Expense[];
  logout: () => void;
  total: number;
  categories: Category[];
}

export const SideColum = ({
  user,
  expenses,
  logout,
  total,
  categories,
}: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className="space-y-4">
      {/* Avatar y datos de la cuenta */}
      <div className="surface p-6 text-center">
        <span
          className="mx-auto grid size-16 place-items-center rounded-full text-xl font-semibold text-primary-foreground"
          style={{ backgroundColor: user?.avatarColor ?? "#22c55e" }}
        >
          {user?.name?.slice(0, 1).toUpperCase()}
        </span>
        <p className="mt-3 font-display text-lg font-semibold">{user?.name}</p>
        <p className="text-xs text-muted-foreground">{user?.email}</p>
      </div>

      {/* Resumen de estadísticas */}
      <div className="surface space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Gastos registrados
          </span>
          <span className="num font-semibold">{expenses.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Categorías activas
          </span>
          <span className="num font-semibold">{categories.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total histórico</span>
          <span className="num font-semibold">{currencyExact(total)}</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full gap-2 text-destructive hover:text-destructive"
        onClick={handleLogout}
      >
        <LogOut className="size-4" /> Cerrar sesión
      </Button>
    </aside>
  );
};
