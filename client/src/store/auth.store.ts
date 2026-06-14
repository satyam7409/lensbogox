import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {      
  _id: string;
  phone: string;
  displayName: string;
  avatarInitials: string;
  areaName: string;
  pinCode: string;
  hasMembership: boolean;
}

interface AuthState {
  // ── state ─────────────────────────────────────────────────────
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isOnboarded: boolean;

  // ── actions ───────────────────────────────────────────────────
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setOnboarded: () => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // initial values
      token: null,
      user: null,
      isOnboarded: false,
      isLoggedIn: false,

      // called after OTP verified — save Firebase JWT (not fully logged in yet)
      setToken: (token) => set({ token }),

      // called after backend returns user — fully logged in
      setUser: (user) => set({ user, isLoggedIn: true }),

      //set isLoggin to truw when we got the token

      // called after profile setup complete
      setOnboarded: () => set({ isOnboarded: true }),

      // called when editing profile — only updates changed fields
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      // called on logout — wipes everything
      logout: () =>
        set({
          token: null,
          user: null,
          isOnboarded: false,
          isLoggedIn: false,
        }),
    }),
    {
      name: "lenbogo-auth", // key used in localStorage
      storage: createJSONStorage(() => localStorage),

      // only persist data — not functions
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isOnboarded: state.isOnboarded,
        isLoggedIn: state.isLoggedIn
      }),
    },
  ),
);