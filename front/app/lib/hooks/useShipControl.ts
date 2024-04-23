import { useEffect, useState } from "react";
import { Nullable } from "../types";

export default function useShipControl() {
  const [control, setControl] = useState<Nullable<string>>(null);

  useEffect(() => {
    function filterArrowKeys(e: KeyboardEvent) {
      e.preventDefault();
      if (e.key === "a" || e.key === "arrowLeft") {
        setControl("left");
      }

      if (e.key === "d" || e.key === "arrowRight") {
        setControl("right");
      }

      if (e.key === " ") {
        setControl("shoot");
      }
    }

    function reset(e: KeyboardEvent) {
      e.preventDefault();
      setControl(null);
    }

    window.addEventListener("keydown", filterArrowKeys);
    window.addEventListener("keyup", reset);

    return () => {
      window.removeEventListener("keydown", filterArrowKeys);
      window.removeEventListener("keyup", reset);
    };
  }, []);
  return control;
}
