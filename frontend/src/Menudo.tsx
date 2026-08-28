import { RouterProvider } from "react-router";
import { router } from "./router/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext";
import { MenudoProvider } from "./context/MenudoContext";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const Menudo = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MenudoProvider>
            <RouterProvider router={router} />
            <Toaster richColors position="top-right" />
          </MenudoProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
