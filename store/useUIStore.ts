"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  theme: "dark" | "light";
  language: "en" | "ta" | "hi" | "es";
  sidebarOpen: boolean;
  mobileNavOpen: boolean;
  searchOpen: boolean;

  setTheme: (theme: "dark" | "light") => void;
  setLanguage: (lang: "en" | "ta" | "hi" | "es") => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  setMobileNavOpen: (open: boolean) => void;
  toggleSearch: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "dark",
      language: "en",
      sidebarOpen: false,
      mobileNavOpen: false,
      searchOpen: false,

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
      toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),
    }),
    {
      name: "ui-store",
      partialize: (state) => ({ theme: state.theme, language: state.language }),
    }
  )
);
