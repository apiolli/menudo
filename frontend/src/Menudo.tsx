import { RouterProvider } from "react-router";
import { router } from "./router/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { CheckAuthProvider } from "./context/CheckAuthProvider";

const queryClient = new QueryClient();

export const Menudo = () => {
  return (
    <>
      {/* <MenudoProvider/> */}
      <QueryClientProvider client={queryClient}>
        <CheckAuthProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
        </CheckAuthProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};
