import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Frustum, Matrix4, Object3D, Object3DEventMap, Vector3 } from "three";
import { Collidable } from "../types";
import { useGameStore } from "../stores/game.store";
import { usePlayerStore } from "../stores/player.store";

interface GameHelper {
  isInFieldOfView: (object: Object3D) => boolean;
  canMove: (v: Vector3, object: Object3D) => boolean;
  checkCollision: (group: Array<Collidable>) => void;
  getShipInitialPosition: () => Vector3;
  updateBoundingBox: (c: Collidable, o: Object3D<Object3DEventMap>) => void;
}

export default function useGameHelper(): GameHelper {
  const { camera, viewport } = useThree();
  const {
    workLoads,
    worldWidth,
    setWorldWidth,
    setWorldHeight,
    deleteWorkLoad,
    deleteTask,
  } = useGameStore();
  const { setScore } = usePlayerStore();

  const [frustum] = useState(new Frustum());
  const [cameraViewProjectionMatrix] = useState(new Matrix4());

  useEffect(() => {
    camera.updateMatrixWorld();
    camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
    cameraViewProjectionMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);
    return () => {
      camera.removeFromParent();
    };
  }, []);

  useEffect(() => {
    setWorldWidth(viewport.width);
  }, []);

  useEffect(() => {
    setWorldHeight(viewport.height);
  }, []);

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

    return projection > -worldWidth && projection < worldWidth;
  };

  const getShipInitialPosition = (): Vector3 => {
    //TODO: find why using calculated height equals 0
    return new Vector3(0, -3.6, 0);
  };

  const updateBoundingBox = (
    collidable: Collidable,
    obj: Object3D<Object3DEventMap>
  ): void => {
    if (collidable.mesh.id === obj.id && collidable.mesh.geometry.boundingBox) {
      collidable.bb
        .copy(collidable.mesh.geometry.boundingBox)
        .applyMatrix4(collidable.mesh.matrixWorld);
    }
  };

  return {
    isInFieldOfView,
    canMove,
    checkCollision,
    getShipInitialPosition,
    updateBoundingBox,
  };
}
