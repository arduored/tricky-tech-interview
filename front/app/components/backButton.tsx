"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import ChevronLeft from "./icons/chevronLeft";

export default function BackButton() {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  const back = () => {
    router.back();
  };

  return !segment ? null : (
    <div className="flex justify-start w-2/3 mt-4 mx-auto">
      <ChevronLeft />
      <button onClick={back}>BACK</button>
    </div>
  );
}
