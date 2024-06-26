export default function Rules() {
  return (
    <div className="flex flex-col my-10">
      <h3 className="text-3xl mb-20"># - Rules</h3>

      <ol className="list-decimal list-inside leading-loose flex flex-col gap-4">
        <li>The goal is to make the maximum of point.</li>

        <li>
          To make points you must shoot filled tasks down. Each color earn you a
          different amount of points.
        </li>
        <li>
          White tasks take longer to destroy but give 0 point. If a white task
          riches the ground, it gets stuck and prevent you from moving passed
          it. To destroy it, you must shoot an white circle.
        </li>
        <li>
          For each task that passes behind your ship, you&apos;ll lose a
          vacation day. You have 3 vacation day to start. One more mistake after
          that and its the burnout!
        </li>
      </ol>
    </div>
  );
}
