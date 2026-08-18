import { RouterProvider } from "react-router";
import { router } from "./router/app.router";
import { AuthProvider } from "./context/AuthContext";
import { MenudoProvider } from "./context/MenudoContext";
import { Toaster } from "sonner";

export const Menudo = () => {
  return (
    <AuthProvider>
      <MenudoProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </MenudoProvider>
    </AuthProvider>
  );
};
