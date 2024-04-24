export interface IScore {
  score: number;
}

export default function Score(props: IScore) {
  return (
    <div className="flex align-middle justify-around">
      <p>SCORE: </p>
      <p>{props.score}</p>
    </div>
  );
}
