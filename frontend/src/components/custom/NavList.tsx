import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "../../lib/utils";
import { nav } from "../../data/finance-store";

export const NavList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => {
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => navigate({ pathname })}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              pathname === item.to &&
                "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_3px_0_0_0_var(--sidebar-primary)]",
            )}
          >
            <item.icon className="size-4.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
