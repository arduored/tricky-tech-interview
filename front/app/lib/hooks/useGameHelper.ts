import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { Frustum, Matrix4, Object3D, Vector3 } from "three";
import { Collidable } from "../types";
import { useGameStore } from "../stores/game.store";
import { usePlayerStore } from "../stores/player.store";

interface GameHelper {
  isInFieldOfView: (object: Object3D) => boolean;
  canMove: (v: Vector3, object: Object3D) => boolean;
  checkCollision: (group: Array<Collidable>) => void;
}

export default function useGameHelper(): GameHelper {
  const { camera } = useThree();
  const { workLoads, deleteWorkLoad, deleteTask } = useGameStore();
  const { setScore } = usePlayerStore();

  const [frustum] = useState(new Frustum());
  const [cameraViewProjectionMatrix] = useState(new Matrix4());

  camera.updateMatrixWorld();
  camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
  cameraViewProjectionMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

  const isInFieldOfView = (object: Object3D): boolean =>
    frustum.intersectsObject(object);

  const checkCollision = (group: Array<Collidable>): void => {
    for (const task of group) {
      for (const workLoad of workLoads) {
        if (task.bb.intersectsBox(workLoad.bb)) {
          task.mesh.userData.life -= workLoad.mesh.userData.value;
          deleteWorkLoad(workLoad);
          if (task.mesh.userData.life === 0) {
            setScore(task.mesh.userData.value);
            deleteTask(task);
          }
        }
      }
    }
  };

  const canMove = (v: Vector3, object: Object3D): boolean => {
    const {
      position: { x },
    } = object;
    const projection = x + v.x;

    return projection > -3.6 && projection < 3.6;
  };

  return {
    isInFieldOfView,
    canMove,
    checkCollision,
  };
}
