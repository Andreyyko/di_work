import { create } from "zustand";
import type { Tab } from "@/components/MakCardsPage/Tabs";

type MakCardsUiState = {
  tab: Tab;
  query: string;
  activeCardId: string | null;
  setTab: (tab: Tab) => void;
  setQuery: (query: string) => void;
  openCard: (id: string) => void;
  closeCard: () => void;
};

export const useMakCardsUiStore = create<MakCardsUiState>((set) => ({
  tab: "all",
  query: "",
  activeCardId: null,

  setTab: (tab) => set({ tab, activeCardId: null }),

  setQuery: (query) => set({ query }),
  openCard: (id) => set({ activeCardId: id }),
  closeCard: () => set({ activeCardId: null }),
}));

export const useMakCardsTab = () => useMakCardsUiStore((s) => s.tab);
export const useMakCardsQuery = () => useMakCardsUiStore((s) => s.query);
export const useMakCardsActiveId = () => useMakCardsUiStore((s) => s.activeCardId);
