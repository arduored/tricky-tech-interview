"use client";

import { Canvas } from "@react-three/fiber";
import Ship from "../components/ship";
import { usePlayerStore } from "../lib/stores/player.store";
import CalendarIcon from "../components/icons/calendar";
import Score from "../components/score";
import TaskGenerator from "../components/taskGenerator";
import { useGameStore } from "../lib/stores/game.store";
import StateActions from "../components/StateActions";

export default function Game() {
  const { lifes, score } = usePlayerStore();
  const { state } = useGameStore();

  const renderLifes = () => {
    const totalLifes = [];
    for (let i = 0; i < lifes; i++) {
      totalLifes.push(<CalendarIcon key={i} />);
    }

    return <div className="w-full flex justify-around">{totalLifes}</div>;
  };
  return (
    <div className="my-10 flex justify-center">
      <div className="w-1/5 p-2 flex flex-col justify-between">
        <Score score={score} />
        <StateActions state={state} />
      </div>
      <div className="w-2/5 border-2 border-white h-96">
        <Canvas>
          {state === "RUNNING" ? (
            <>
              <ambientLight />
              <TaskGenerator />
              <Ship />
            </>
          ) : null}
        </Canvas>
      </div>
      <div className="w-1/5 p-2 flex ">{renderLifes()}</div>
    </div>
  );
}
