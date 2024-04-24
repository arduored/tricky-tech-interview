import useGameHelper from "@/app/lib/hooks/useGameHelper";
import { renderHook } from "@testing-library/react";
import { Object3D } from "three";

describe("GameHelper Hook", () => {
  it.skip("should say it's in field of view", () => {
    const { result } = renderHook(useGameHelper);
    const obj = new Object3D();

    const res = result.current.isInFieldOfView(obj);
    expect(res).toBeTruthy();
  });
});
