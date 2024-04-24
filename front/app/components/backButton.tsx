"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import ChevronLeft from "./icons/chevronLeft";
import Link from "next/link";

export default function BackButton() {
  const segment = useSelectedLayoutSegment();

  return !segment ? null : (
    <Link href="/" className="flex justify-start w-2/3 mt-4 mx-auto">
      <ChevronLeft />
      <h3>HOME</h3>
    </Link>
  );
}
