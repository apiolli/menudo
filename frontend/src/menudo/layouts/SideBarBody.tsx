import { LogOut, Wallet } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { NavList } from "./NavList";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";

export const SidebarBody = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-full flex-col bg-sidebar p-4">
      <div className="mb-6 flex items-center gap-2.5 px-2 pt-2">
        <span className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
          <Wallet className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-[15px] font-semibold text-sidebar-foreground">
            menudo
          </p>
        </div>
      </div>

      <NavList />

      <div className="mt-auto space-y-3 border-t border-sidebar-border pt-4">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <span className="grid size-9 place-items-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground">
              {user.name.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {user.name}
              </p>
              <p className="truncate text-[11px] text-sidebar-foreground/60">
                {user.email}
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleLogout}
        >
          <LogOut className="size-4.5" /> Cerrar sesión
        </Button>
      </div>
    </div>
  );
};
