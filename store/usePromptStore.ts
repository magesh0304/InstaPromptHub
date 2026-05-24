"use client";

import { create } from "zustand";
import type { PromptFilters, Prompt } from "@/types";

interface PromptState {
  filters: PromptFilters;
  selectedPrompt: Prompt | null;
  searchQuery: string;
  suggestions: string[];

  setFilters: (filters: Partial<PromptFilters>) => void;
  resetFilters: () => void;
  setSelectedPrompt: (prompt: Prompt | null) => void;
  setSearchQuery: (query: string) => void;
  setSuggestions: (suggestions: string[]) => void;
}

const defaultFilters: PromptFilters = {
  aiModel: "ALL",
  category: "ALL",
  sort: "latest",
  search: "",
  isPremium: undefined,
  page: 1,
};

export const usePromptStore = create<PromptState>()((set) => ({
  filters: defaultFilters,
  selectedPrompt: null,
  searchQuery: "",
  suggestions: [],

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters, page: 1 } })),
  resetFilters: () => set({ filters: defaultFilters }),
  setSelectedPrompt: (prompt) => set({ selectedPrompt: prompt }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSuggestions: (suggestions) => set({ suggestions }),
}));
