import { useEffect } from "react";
import CalendarIcon from "./icons/calendar";
import { useGameStore } from "../lib/stores/game.store";

interface LifesProps {
  value: number;
}
export default function Lifes({ value }: LifesProps) {
  const { gameOver } = useGameStore();

  useEffect(() => {
    if (value === 0) {
      gameOver();
    }
  }, [value]);

  const renderIcons = () => {
    const totalLifes = [];
    for (let i = 0; i < value; i++) {
      totalLifes.push(<CalendarIcon key={i} />);
    }
    return totalLifes;
  };

  return <div className="w-full flex justify-around">{renderIcons()}</div>;
}
