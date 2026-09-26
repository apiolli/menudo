import { useQuery } from "@tanstack/react-query";
import { getDashboardAction } from "../actions/get-dashboard-data.action";

export const useDashboard = () => {
  const {
    data: dashboardData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAction,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return {
    dashboardData,
    isError,
    isLoading,
  };
};
