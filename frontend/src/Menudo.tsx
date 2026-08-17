import { RouterProvider } from "react-router";
import { router } from "./router/app.router";

export const Menudo = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
