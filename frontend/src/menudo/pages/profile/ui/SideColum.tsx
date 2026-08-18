import { LogOut } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  currency,
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
  return (
    <aside className="space-y-4">
      {/* Avatar y datos de la cuenta */}
      <div className="surface p-6 text-center">
        <span
          className="mx-auto grid size-16 place-items-center rounded-full text-xl font-semibold text-primary-foreground"
          style={{ backgroundColor: user?.avatarColor }}
        >
          {user?.name?.slice(0, 1)}
        </span>
        <p className="mt-3 font-display text-lg font-semibold">{user?.name}</p>
        <p className="text-xs text-muted-foreground">{user?.email}</p>
      </div>

      {/* Resumen de estadÃ­sticas */}
      <div className="surface space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Expenses registrados
          </span>
          <span className="num font-semibold">{expenses.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            CategorÃ­as activas
          </span>
          <span className="num font-semibold">{categories.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Total histÃ³rico
          </span>
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
        <LogOut className="size-4" /> Cerrar sesiÃ³n
      </Button>
    </aside>
  );
};
