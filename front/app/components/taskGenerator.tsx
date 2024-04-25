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
import { DOWN, INITIAL_TASK, TASK_SPAWN_RATE } from "../lib/contants";

export default function TaskGenerator() {
  const { scene } = useThree();
  const { checkCollision, updateBoundingBox, chooseTaskConfig } =
    useGameHelper();
  const { tasks, setTasks, worldWidth, worldHeight } = useGameStore();

  const [meshes, setMeshes] = useState(new Group());

  let delay = 0;
  useFrame((_, delta) => {
    if (delay > TASK_SPAWN_RATE) {
      delay = 0;
      generateTask();
    }
    updateTasksPosition();
    checkCollision(tasks);
    delay += delta;
  });

  const generateTask = (): void => {
    const { color, ...data } = chooseTaskConfig();
    const ambivalent = Math.random() > 0.5 ? 1 : -1;

    const mesh = new Mesh(
      new BoxGeometry(...INITIAL_TASK),
      new MeshBasicMaterial({ color: color })
    );

    mesh.userData = data;
    mesh.position.set(
      Math.floor(Math.random() * worldWidth * ambivalent),
      worldHeight / 2,
      0
    );

    const box = new Box3(new Vector3(), new Vector3());
    box.setFromObject(mesh);

    setMeshes((state) => state.add(mesh));
    setTasks({ mesh, bb: box });

    scene.add(meshes);
  };

  const updateTasksPosition = (): void => {
    for (const taskMesh of meshes.children) {
      taskMesh.position.add(DOWN);

      tasks.forEach((t) => updateBoundingBox(t, taskMesh));
    }
  };
  return null;
}
