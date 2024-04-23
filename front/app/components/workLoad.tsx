import { Vector3 } from "three";

export default function WorkLoad() {
  return (
    <mesh position={new Vector3(0, -2, 0)}>
      <meshBasicMaterial />
      <capsuleGeometry args={[0.04, 0.04, 1, 3]} />
    </mesh>
  );
}
