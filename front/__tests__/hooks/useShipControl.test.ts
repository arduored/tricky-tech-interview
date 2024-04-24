import useShipControl from "@/app/lib/hooks/useShipControl";
import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("shipControl hook", () => {
  it("should return left", async () => {
    const { result: hook } = renderHook(() => useShipControl());

    await keyDownEvent("a");
    expect(hook.current).toBe("left");
    await keyUpEvent("a");

    await keyDownEvent("ArrowLeft");
    expect(hook.current).toBe("left");
    await keyUpEvent("ArrowLeft");
  });

  it("should return right", async () => {
    const { result: hook } = renderHook(() => useShipControl());

    await keyDownEvent("d");
    expect(hook.current).toBe("right");
    await keyUpEvent("d");

    await keyDownEvent("ArrowRight");
    expect(hook.current).toBe("right");
    await keyUpEvent("ArrowRight");
  });
});

async function keyDownEvent(key: string): Promise<void> {
  await user.keyboard(`{${key}>}`);
}

async function keyUpEvent(key: string): Promise<void> {
  await user.keyboard(`{${key}/}`);
}
