import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { SidebarBody } from "./SideBarBody";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { useMenudo } from "../../context/MenudoContext";

export const AppShell = ({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const finance = useMenudo();
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-65.5 shrink-0 lg:block">
        <SidebarBody />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-border bg-background/85 px-5 py-4 backdrop-blur md:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-65.5 border-none p-0">
              <SheetTitle className="sr-only">NavegaciÃ³n</SheetTitle>
              <SidebarBody />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-semibold md:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>

        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
          {finance.loading ? (
            <div className="flex h-[50vh] items-center justify-center space-x-2">
              <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <span className="text-muted-foreground font-medium">
                Cargando...
              </span>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};
