"use client";

import { Canvas } from "@react-three/fiber";
import Ship from "../components/ship";
import { usePlayerStore } from "../lib/stores/player.store";
import Score from "../components/score";
import TaskGenerator from "../components/taskGenerator";
import { useGameStore } from "../lib/stores/game.store";
import StateActions from "../components/stateActions";
import Lifes from "../components/lifes";
import GameOver from "../components/gameOver";

export default function Game() {
  const { score } = usePlayerStore();
  const { lifes, state } = useGameStore();

  const renderGame = () => (
    <Canvas>
      <ambientLight />
      <TaskGenerator />
      <Ship />
    </Canvas>
  );

  const renderOver = () => <GameOver />;

  return (
    <div className="my-10 flex justify-center">
      <div className="w-1/5 p-2 flex flex-col justify-between">
        <Score score={score} />
        <StateActions state={state} />
      </div>
      <div className="w-2/5 border-2 border-white h-96">
        {state === "OVER" ? renderOver() : renderGame()}
      </div>
      <div className="w-1/5 p-2 flex ">
        <Lifes value={lifes} />
      </div>
    </div>
  );
}
