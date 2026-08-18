import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  const { token, user, login, logout, isAuthenticated, setUser } =
    useAuthContext();

  return {
    token,
    user,
    login,
    logout,
    isAuthenticated,
    setUser,
  };
}
