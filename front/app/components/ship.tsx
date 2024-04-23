import { useFrame, useThree } from "@react-three/fiber";
import {
  Box3,
  Box3Helper,
  CapsuleGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Vector3,
} from "three";
import useShipControl from "../lib/hooks/useShipControl";
import { useEffect, useRef, useState } from "react";
import useGameHelper from "../lib/hooks/useGameHelper";
import { useGameStore } from "../lib/stores/game.store";
import { Maybe } from "../lib/types";

const INITIAL_POS = new Vector3(0, -3.6, 0);
const LEFT = new Vector3(-0.1, 0, 0);
const UP = new Vector3(0, 0.1, 0);
const RIGHT = new Vector3(0.1, 0, 0);
const NULL_VECTOR = new Vector3(0, 0, 0);

export default function Ship() {
  const { scene } = useThree();
  const shipRef = useRef<any>();
  const control = useShipControl();
  const { isInFieldOfView, canMove } = useGameHelper();
  const { workLoads, setWorkLoads } = useGameStore();

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
    move(direction);

    updateProjectiles();
  });

  const move = (direction: Maybe<Vector3>): void => {
    if (direction && canMove(direction, shipRef.current)) {
      shipRef.current.position.add(direction);
    }
  };

  const shoot = (): void => {
    const mesh = new Mesh(
      new CapsuleGeometry(0.03, 0.2, 1, 3),
      new MeshBasicMaterial()
    );
    const {
      current: {
        position: { x, y },
      },
    } = shipRef;
    mesh.userData = { value: 10 };
    mesh.position.set(x, y + 0.1, 0);

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
        workLoads.forEach((wl) => {
          if (wl.mesh.id === projectile.id && wl.mesh.geometry.boundingBox) {
            wl.bb
              .copy(wl.mesh.geometry.boundingBox)
              .applyMatrix4(wl.mesh.matrixWorld);
          }
        });
        if (!isInFieldOfView(projectile)) {
          projectile.removeFromParent();
        }
      }
    }
  };

  return (
    <mesh ref={shipRef} position={INITIAL_POS} name="ship">
      <coneGeometry args={[0.1, 0.3, 5]} />
      <meshBasicMaterial />
    </mesh>
  );
}
