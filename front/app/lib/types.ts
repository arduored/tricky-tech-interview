import { Box3, Mesh } from "three";

export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;

export type Collidable = { mesh: Mesh; bb: Box3 };

export type GameState = "START" | "STOP" | "PAUSED" | "RUNNING" | "OVER ";
