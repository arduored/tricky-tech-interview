import { create } from "zustand";

type PlayerStore = {
  score: number;
  setScore: (value: number) => void;
};

export const usePlayerStore = create<PlayerStore>()((set) => ({
  score: 0,
  setScore: (value: number) => set((state) => ({ score: state.score + value })),
}));
