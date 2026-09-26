import { useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { SidebarBody } from "../../menudo/layouts/SideBarBody";
import { Button } from "../ui/button";

interface Props {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const CustomHeader = ({ title, subtitle, actions }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-border bg-background/85 px-5 py-4 backdrop-blur md:px-8">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="outline" size="icon" className="lg:hidden" />
          }
        >
          <Menu className="size-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-65.5 border-none p-0">
          <SheetTitle className="sr-only">Navegacion</SheetTitle>
          <SidebarBody />
        </SheetContent>
      </Sheet>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-xl font-semibold md:text-2xl">{title}</h1>
        {subtitle && (
          <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
};
