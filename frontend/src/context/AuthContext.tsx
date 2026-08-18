import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { apiClient } from "../lib/api";

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("jwt_token");
  });
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (token) {
      apiClient<UserProfile>("/api/users/me")
        .then((data) => setUser(data))
        .catch(() => {
          // If token is invalid or expired
          logout();
        });
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("jwt_token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt_token");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated: !!token, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext debe de ser usado dentro de AuthProvider");
  }
  return context;
}
