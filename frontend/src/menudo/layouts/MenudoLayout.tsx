import { SidebarBody } from "./SideBarBody";

import { Outlet } from "react-router";

export const MenudoLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-65.5 shrink-0 lg:block">
        <SidebarBody />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* {finance.loading ? (
            <div className="flex h-[50vh] items-center justify-center space-x-2">
              <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <span className="text-muted-foreground font-medium">
                Cargando...
              </span>
            </div>
          ) : (
            children
          )} */}
        <Outlet />
      </div>
    </div>
  );
};
