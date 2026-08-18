import { RouterProvider } from "react-router";
import { router } from "./router/app.router";
import { AuthProvider } from "./context/AuthContext";
import { MenudoProvider } from "./context/MenudoContext";

export const Menudo = () => {
  return (
    <AuthProvider>
      <MenudoProvider>
        <RouterProvider router={router} />
      </MenudoProvider>
    </AuthProvider>
  );
};
