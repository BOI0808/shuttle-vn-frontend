"use client";

import { create } from "zustand";
import { UserRole } from "@/types";

export interface AuthUser {
  accountId: string;
  fullName: string;
  phone: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthActions {
  setUser: (user: AuthUser) => void;
  clearAuth: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  ...initialState,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      isAdmin: user.role === "Admin",
    }),

  clearAuth: () => set(initialState),
}));
