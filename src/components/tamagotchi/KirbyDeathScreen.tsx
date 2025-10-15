import { Button } from "../ui/button";
import { Card } from "../ui/card";

export function KirbyDeathScreen({ onRestart, deathReason }: { onRestart: () => void; deathReason?: string }) {
  return (
    <Card className="w-[20rem] h-[32rem] rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-6xl mb-4">💀</div>
      <span className="text-2xl font-bold text-pink-500 mb-4">Kirby ha muerto</span>
      <span className="mb-6 text-pink-400 text-center px-4">
        {deathReason || "Kirby ha muerto. Reinicia el juego para volver a jugar."}
      </span>
      <Button onClick={onRestart} className="bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500 shadow-lg px-6 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
        Reiniciar juego
      </Button>
    </Card>
  );
}
