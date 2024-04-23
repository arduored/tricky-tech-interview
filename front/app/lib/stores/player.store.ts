import { create } from "zustand";

type PlayerStore = {
  lifes: number;
  score: number;
  setScore: (value: number) => void;
  die: () => void;
};

export const usePlayerStore = create<PlayerStore>()((set) => ({
  lifes: 3,
  score: 0,
  setScore: (value: number) => set((state) => ({ score: state.score + value })),
  die: () => set((state) => ({ lifes: state.lifes - 1 })),
}));
