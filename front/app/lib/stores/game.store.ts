import { create } from "zustand";
import { Collidable, GameState, Nullable, TaskConfig } from "../types";

type GameStore = {
  lifes: number;
  state: Nullable<GameState>;
  tasks: Array<Collidable>;
  workLoads: Array<Collidable>;
  worldWidth: number;
  worldHeight: number;
  tasksConfig: Array<TaskConfig>;
  takeVacationDay: () => void;
  setGameState: (state: GameState) => void;
  setTasks: (task: Collidable) => void;
  setWorldHeight: (height: number) => void;
  setWorkLoads: (wl: Collidable) => void;
  setWorldWidth: (width: number) => void;
  deleteWorkLoad: (wl: Collidable) => void;
  setTasksConfig: (tc: Array<TaskConfig>) => void;
  deleteTask: (task: Collidable) => void;
  gameOver: () => void;
};

export const useGameStore = create<GameStore>()((set) => ({
  state: null,
  lifes: 3,
  tasks: [],
  workLoads: [],
  worldWidth: 0,
  worldHeight: 0,
  tasksConfig: [],
  setGameState: (state: GameState) => set(() => ({ state })),
  setWorldWidth: (width: number) =>
    set(() => ({ worldWidth: Math.floor(width / 2) })),
  setWorldHeight: (height: number) => set(() => ({ worldHeight: height })),
  setTasks: (task: Collidable) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  setWorkLoads: (wl: Collidable) =>
    set((state) => ({ workLoads: [...state.workLoads, wl] })),
  setTasksConfig: (tc: Array<TaskConfig>) => set(() => ({ tasksConfig: tc })),
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
  gameOver: () =>
    set(() => ({
      lifes: 3,
      state: "OVER",
      tasks: [],
      workLoads: [],
    })),
  takeVacationDay: () => set((state) => ({ lifes: state.lifes - 1 })),
}));
