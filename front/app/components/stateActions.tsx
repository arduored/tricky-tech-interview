import { useGameStore } from "../lib/stores/game.store";
import { GameState, Nullable } from "../lib/types";

interface StateActionsProps {
  state: Nullable<GameState>;
}

export default function StateActions({ state }: StateActionsProps) {
  const { setGameState } = useGameStore();

  const renderPlayButton = () => {
    return (
      <button className="border p-2" onClick={() => setGameState("RUNNING")}>
        PLAY
      </button>
    );
  };

  const renderButtons = (s: GameState) => {
    return (
      <button className="border p-2" onClick={() => setGameState("PAUSED")}>
        PAUSE
      </button>
    );
  };

  return (
    <div className="flex justify-around">
      {!state || state !== "RUNNING"
        ? renderPlayButton()
        : renderButtons(state)}
    </div>
  );
}
