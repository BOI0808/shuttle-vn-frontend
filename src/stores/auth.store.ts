"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserAccount, UserRole, Employee, Customer } from "@/types";
import Cookies from "js-cookie";

// 1. Định nghĩa kiểu User đầy đủ cho Store
export interface AuthUser extends UserAccount {
  id?: string;
  name?: string;
  role: UserRole;
  employee?: Employee | null;
  customer?: Customer | null;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthActions {
  setAuth: (user: AuthUser) => void;
  clearAuth: () => void;
  setUser: (user: AuthUser) => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setAuth: (user) => {
        set({
          user,
          isAuthenticated: true,
          isAdmin: user.role === "Admin",
        });

        Cookies.set("userRole", user.role, { sameSite: "strict" });
      },

      clearAuth: () => {
        set(initialState);
        Cookies.remove("userRole");
      },

      setUser: (user) => {
        Cookies.set("userRole", user.role, { sameSite: "strict" });
        set((state) => ({
          ...state,
          user,
          isAdmin: user.role === "Admin",
        }));
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);
