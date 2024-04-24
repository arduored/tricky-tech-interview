import { ConeBufferGeometryProps } from "@react-three/fiber";
import { Vector3 } from "three";

/**
 * Game Contants
 *
 */
export const INITIAL_POS = new Vector3(0, -3.6, 0);
export const LEFT = new Vector3(-0.1, 0, 0);
export const UP = new Vector3(0, 0.1, 0);
export const RIGHT = new Vector3(0.1, 0, 0);
export const NULL_VECTOR = new Vector3(0, 0, 0);

export const INITIAL_SHIP = [0.1, 0.3, 5] as ConeBufferGeometryProps["args"];
export const INITIAL_WORKLOAD = [0.03, 0.2, 1, 3];
export const INITIAL_TASK = [0.3, 0.3, 0];
export const TASK_SPAWN_RATE = 2;
/** */
