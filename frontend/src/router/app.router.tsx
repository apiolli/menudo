import { createBrowserRouter, Navigate } from "react-router";
import { AuthPage } from "../menudo/pages/auth/AuthPage";
import { DashboardPage } from "../menudo/pages/dashboard/DashboardPage";
import { ExpensesPage } from "../menudo/pages/expenses/ExpensesPage";
import { CategoriesPage } from "../menudo/pages/categories/CategoriesPage";
import { PaymentMethodsPage } from "../menudo/pages/paymentMethods/PaymentMethodsPage";
import { ProfilePage } from "../menudo/pages/profile/ProfilePage";
import { ReportsPage } from "../menudo/pages/reports/ReportsPage";
import { MenudoLayout } from "../menudo/layouts/MenudoLayout";
import { AuthenticatedRoute } from "./protected/AuthenticatedRoute";

// const SearchPage = lazy(() => import("@/herores/pages/search/SearchPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <MenudoLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/expenses",
        element: <ExpensesPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/paymentMethods",
        element: <PaymentMethodsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/reports",
        element: <ReportsPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
