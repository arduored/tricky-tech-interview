import { create } from "zustand";
import { Collidable } from "../types";

type GameStore = {
  tasks: Array<Collidable>;
  workLoads: Array<Collidable>;
  setTasks: (task: Collidable) => void;
  setWorkLoads: (wl: Collidable) => void;
  deleteWorkLoad: (wl: Collidable) => void;
  deleteTask: (task: Collidable) => void;
};

export const useGameStore = create<GameStore>()((set) => ({
  tasks: [],
  workLoads: [],
  setTasks: (task: Collidable) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  setWorkLoads: (wl: Collidable) =>
    set((state) => ({ workLoads: [...state.workLoads, wl] })),
  deleteWorkLoad: (currentWL: Collidable) =>
    set((state) => {
      const wlToDelete = state.workLoads.findIndex(
        (wl) => wl.mesh.id === currentWL.mesh.id
      );

      if (wlToDelete > -1) {
        state.workLoads[wlToDelete].mesh.removeFromParent();
        state.workLoads.splice(wlToDelete, 1);
      }
      return state;
    }),
  deleteTask: (currentTask: Collidable) =>
    set((state) => {
      const taskToDelete = state.tasks.findIndex(
        (t) => t.mesh.id === currentTask.mesh.id
      );
      if (taskToDelete > -1) {
        state.tasks[taskToDelete].mesh.removeFromParent();
        state.tasks.splice(taskToDelete, 1);
      }
      return state;
    }),
}));
