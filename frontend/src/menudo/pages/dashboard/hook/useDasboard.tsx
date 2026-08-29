import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../../../api/dashboard-actions";
import { useMenudo } from "../../../../context/MenudoContext";

export const useDashboard = () => {
  const { expenses } = useMenudo();
  const {
    data: dashboardData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["dashboard", expenses],
    queryFn: getDashboardData,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return {
    dashboardData,
    isError,
    isLoading,
  };
};
