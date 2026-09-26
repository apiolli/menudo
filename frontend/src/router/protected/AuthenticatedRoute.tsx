import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../../store/auth.store";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "cheking") return null;

  if (authStatus === "not-authenticated") return <Navigate to={"/auth"} />;

  return children;
};
