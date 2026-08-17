import { LogOut, Wallet } from "lucide-react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { MenudoContext } from "../../context/MenudoContext";
import { NavList } from "./NavList";
import { Button } from "../../components/ui/button";

export const SidebarBody = () => {
  const { usuario, logout } = useContext(MenudoContext);
  const navigate = useNavigate();
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
          {/* <p className="text-[11px] text-sidebar-foreground/60">
            Gastos personales
          </p> */}
        </div>
      </div>

      <NavList />

      <div className="mt-auto space-y-3 border-t border-sidebar-border pt-4">
        {usuario && (
          <div className="flex items-center gap-3 px-2">
            <span className="grid size-9 place-items-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground">
              {usuario.nombre.slice(0, 1)}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {usuario.nombre}
              </p>
              <p className="truncate text-[11px] text-sidebar-foreground/60">
                {usuario.email}
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => {
            logout();
            navigate("/auth");
          }}
        >
          <LogOut className="size-4.5" /> Cerrar sesión
        </Button>
      </div>
    </div>
  );
};
