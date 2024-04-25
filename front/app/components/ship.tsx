import { useFrame, useThree } from "@react-three/fiber";
import {
  Box3,
  CapsuleGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "three";
import useShipControl from "../lib/hooks/useShipControl";
import { useEffect, useRef, useState } from "react";
import useGameHelper from "../lib/hooks/useGameHelper";
import { useGameStore } from "../lib/stores/game.store";
import { Maybe } from "../lib/types";
import {
  INITIAL_SHIP,
  INITIAL_WORKLOAD,
  LEFT,
  NULL_VECTOR,
  RIGHT,
  UP,
} from "../lib/contants";

export default function Ship() {
  const { scene } = useThree();
  const shipRef = useRef<any>();
  const control = useShipControl();
  const {
    isInFieldOfView,
    canMove,
    getShipInitialPosition,
    updateBoundingBox,
  } = useGameHelper();
  const { state, workLoads, setWorkLoads } = useGameStore();

  const [initialPosition] = useState<Vector3>(getShipInitialPosition());
  const [direction, setDirection] = useState<Vector3>();
  const [meshes, setMeshes] = useState(new Group());

  useEffect(() => {
    setMeshes((state) => {
      state.name = "workLoads";
      return state;
    });
  }, []);

  useEffect(() => {
    if (!control) {
      setDirection(NULL_VECTOR);
    }
    if (control === "left") {
      setDirection(LEFT);
    }
    if (control === "right") {
      setDirection(RIGHT);
    }
    if (control === "shoot") {
      shoot();
    }
  }, [control]);

  useFrame(() => {
    if (state === "RUNNING") {
      move(direction);
      updateProjectiles();
    }
  });

  const move = (direction: Maybe<Vector3>): void => {
    if (direction && canMove(direction, shipRef.current)) {
      shipRef.current.position.add(direction);
    }
  };

  const shoot = (): void => {
    const mesh = new Mesh(
      new CapsuleGeometry(...INITIAL_WORKLOAD),
      new MeshBasicMaterial()
    );
    const {
      current: {
        position: { x, y },
      },
    } = shipRef;
    mesh.userData = { value: 10 };
    mesh.position.set(x, y, 0);

    const box = new Box3(new Vector3(), new Vector3());
    box.setFromObject(mesh);

    setMeshes((state) => state.add(mesh));
    setWorkLoads({ mesh, bb: box });

    scene.add(meshes);
  };

  const updateProjectiles = () => {
    const projectiles = scene.getObjectById(meshes.id);
    if (projectiles) {
      for (const projectile of projectiles?.children) {
        projectile.position.add(UP);

        workLoads.forEach((wl) => updateBoundingBox(wl, projectile));

        if (!isInFieldOfView(projectile)) {
          projectile.removeFromParent();
        }
      }
    }
  };

  return (
    <mesh ref={shipRef} position={initialPosition} name="ship">
      <coneGeometry args={INITIAL_SHIP} />
      <meshBasicMaterial />
    </mesh>
  );
}
