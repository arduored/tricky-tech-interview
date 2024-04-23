"use client";

import Title from "./components/title";
import Menu from "./components/menu";
import Info from "./info/pages";

export default function Home() {
  return (
    <main className="flex flex-col items-center my-24">
      <Menu />
      <Info />
    </main>
  );
}
