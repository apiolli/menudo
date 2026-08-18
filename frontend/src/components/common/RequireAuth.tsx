import { useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  children: ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};
