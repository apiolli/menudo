import { createBrowserRouter } from "react-router";
import { AuthPage } from "../menudo/pages/auth/AuthPage";
import { DashboardPage } from "../menudo/pages/dashboard/DashboardPage";

// const SearchPage = lazy(() => import("@/herores/pages/search/SearchPage"));

export const router = createBrowserRouter([
  //   {
  //     path: "/auth",
  //     element: <HeroesLayout />,
  //     children: [
  //       {
  //         index: true,
  //         element: <HomePage />,
  //       },
  //       {
  //         path: "heroes/1",
  //         element: <HeroPage />,
  //       },
  //       {
  //         path: "search",
  //         element: <SearchPage />,
  //       },
  //     ],
  //   },

  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <DashboardPage />,
  },
]);
