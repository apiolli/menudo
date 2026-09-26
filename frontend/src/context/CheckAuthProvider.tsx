import type { PropsWithChildren } from "react";
import { useAuthStore } from "../menudo/pages/auth/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { CustomFullScreenLoading } from "../components/custom/CustomFullScreenLoading";

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 5,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};
