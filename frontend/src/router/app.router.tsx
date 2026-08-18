import { createBrowserRouter } from "react-router";
import { AuthPage } from "../menudo/pages/auth/AuthPage";
import { DashboardPage } from "../menudo/pages/dashboard/DashboardPage";
import { ExpensesPage } from "../menudo/pages/expenses/ExpensesPage";
import { CategoriesPage } from "../menudo/pages/categories/CategoriesPage";
import { PaymentMethodsPage } from "../menudo/pages/paymentMethods/PaymentMethodsPage";
import { ProfilePage } from "../menudo/pages/profile/ProfilePage";
import { ReportsPage } from "../menudo/pages/reports/ReportsPage";

// const SearchPage = lazy(() => import("@/herores/pages/search/SearchPage"));

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/",
    element: <AuthPage />,
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
]);
