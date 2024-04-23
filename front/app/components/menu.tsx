import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();

  const navigate = (segment: string): void => {
    router.push(`/${segment}`);
  };

  return (
    <div className="w-full flex align-middle justify-center p-6">
      <button
        onClick={() => navigate("game")}
        className="outline outline-offset-2 outline-pink-500 mx-5 p-2"
      >
        PLAY
      </button>{" "}
      <button
        onClick={() => navigate("rules")}
        className="outline outline-offset-2 outline-yellow-500 mx-5 p-2"
      >
        RULES
      </button>
    </div>
  );
}
