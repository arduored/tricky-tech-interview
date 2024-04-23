import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import {
  Box3,
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "three";
import useGameHelper from "../lib/hooks/useGameHelper";
import { useGameStore } from "../lib/stores/game.store";
import { debounce } from "../lib/utils";

export default function TaskGenerator() {
  const { scene } = useThree();
  const { checkCollision } = useGameHelper();
  const [meshes, setMeshes] = useState(new Group());
  const { tasks, setTasks } = useGameStore();

  let delay = 0;
  useFrame((_, delta) => {
    if (delay > 2) {
      delay = 0;
      generateTask();
    }
    checkCollision(tasks);
    delay += delta;
  });

  const generateTask = (): void => {
    const mesh = new Mesh(
      new BoxGeometry(0.3, 0.3, 0),
      new MeshBasicMaterial()
    );

    mesh.userData = { value: 10, life: 50 };
    mesh.position.set(Math.random(), Math.random(), 0);

    const box = new Box3(new Vector3(), new Vector3());
    box.setFromObject(mesh);

    setMeshes((state) => state.add(mesh));
    setTasks({ mesh, bb: box });

    scene.add(meshes);
  };
  return null;
}
