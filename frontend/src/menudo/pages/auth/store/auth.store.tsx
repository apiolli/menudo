import { create } from "zustand";
import type { User } from "../../../../types/user.interface";

type AuthStatus = "authenticated" | "not-authenticated" | "cheking";

type AuthState = {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  login: (email: string, password: string) => Promise<boolean>;
  checkAuthStatus: () => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "cheking",
  login: async (email: string, password: string) => {
    return true;
  },
  checkAuthStatus: async () => true,
  logout: () => {},
  register: async (name: string, email: string, password: string) => true,
}));
