import { create } from "zustand";
import type { AuthUser } from "@/api/auth-api";
import { getJwt, getStoredUser } from "@/api/auth-api";

type AuthState = {
  jwt: string | null;
  user: AuthUser | null;
  hydrated: boolean;
  setSession: (jwt: string, user: AuthUser) => void;
  setUser: (user: AuthUser) => void;
  clearSession: () => void;
  hydrateFromStorage: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  jwt: null,
  user: null,
  hydrated: false,

  setSession: (jwt, user) => {
    set({ jwt, user, hydrated: true });
  },

  setUser: (user) => {
    set({ user });
  },

  clearSession: () => {
    set({ jwt: null, user: null, hydrated: true });
  },

  hydrateFromStorage: () => {
    set({
      jwt: getJwt(),
      user: getStoredUser(),
      hydrated: true,
    });
  },
}));

/** Підписка лише на поля auth — менше зайвих ре-рендерів презентаційних компонентів. */
export const useAuthUser = () => useAuthStore((s) => s.user);
export const useAuthJwt = () => useAuthStore((s) => s.jwt);
export const useIsAuthenticated = () => useAuthStore((s) => Boolean(s.jwt));
