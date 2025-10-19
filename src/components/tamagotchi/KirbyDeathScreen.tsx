import { Button } from "../ui/button";
import { Card } from "../ui/card";

export function KirbyDeathScreen({
  onRestart,
  deathReason
}: {
  onRestart: () => void;
  deathReason?: string;
}) {
  return (
    <Card className="flex h-[32rem] w-[20rem] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="mb-4 text-6xl">💀</div>
      <span className="mb-4 font-bold text-2xl text-pink-500">
        Kirby ha muerto
      </span>
      <span className="mb-6 px-4 text-center text-pink-400">
        {deathReason ||
          "Kirby ha muerto. Reinicia el juego para volver a jugar."}
      </span>
      <Button
        onClick={onRestart}
        className="transform rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-3 text-lg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-pink-500 hover:to-purple-500">
        Reiniciar juego
      </Button>
    </Card>
  );
}
