import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  return <>{children}</>;
};
