import { create } from "zustand";
import type { User } from "../../../../types/user.interface";
import { checkStatusAction } from "../actions/check-status.action";
import { loginAction } from "../actions/login.action";
import { registerAction } from "../actions/register.action";

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

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  authStatus: "cheking",
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("jwt_token", data.token);
      set({
        user: data,
        token: data.token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      localStorage.removeItem("jwt_token");

      return false;
    }
  },
  checkAuthStatus: async () => {
    try {
      const data = await checkStatusAction();

      set({
        user: data,
        token: data.token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });
      throw error;
    }
  },
  logout: () => {
    set({
      user: null,
      token: null,
      authStatus: "not-authenticated",
    });
    localStorage.removeItem("jwt_token");
  },
  register: async (name: string, email: string, password: string) => {
    try {
      const data = await registerAction(name, email, password);
      localStorage.setItem("jwt_token", data.token);
      set({
        user: data,
        token: data.token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      localStorage.removeItem("jwt_token");

      return false;
    }
  },
}));
