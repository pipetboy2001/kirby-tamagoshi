import { Card, CardHeader } from "../ui/card";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Clock,
  Calendar,
  Smile,
  BatteryFull,
  Utensils,
  Gamepad2,
  Heart,
  AlertTriangle,
} from "lucide-react";
import { useEffect } from "react";
import { useTamagotchiUI } from "@/hooks/useTamagotchiUI";
import { KIRBY_GIFS } from "@/const/kirbyState";
import { KirbyStatsPopover } from "./KirbyStatsPopover";

export default function Tamagotchi() {
  const {
    state,
    startGame,
    playTime,
    resetGame,
    currentAction,
    showDeathDialog,
    setShowDeathDialog,
    deathReason,
    getCurrentGif,
    formatElapsedTime,
    kirbyEmotion,
    kirbyMood,
    handleAction,
  } = useTamagotchiUI();

  // Mostrar toasts en el componente
  useEffect(() => {
    if (!state) return;
    const alerts = [];
    if (state.hunger < 20)
      alerts.push({ icon: Utensils, text: "¡Kirby tiene hambre!", color: "text-red-500" });
    if (state.energy < 20)
      alerts.push({ icon: BatteryFull, text: "Kirby está cansado", color: "text-orange-500" });
    if (state.happiness < 20)
      alerts.push({ icon: Heart, text: "Kirby está triste", color: "text-purple-500" });
    if (state.health < 30)
      alerts.push({ icon: AlertTriangle, text: "¡Salud crítica!", color: "text-red-600" });
    alerts.forEach((alert) => {
      toast(
        <div className="flex items-center gap-2">
          <alert.icon className={`${alert.color} w-4 h-4`} />
          <span>{alert.text}</span>
        </div>,
        { duration: 4000 }
      );
    });
  }, [state]);

  if (showDeathDialog || !state) {
    return (
      <>
        <Card className="w-[20rem] h-[32rem] rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="text-6xl mb-4">💀</div>
          <span className="text-2xl font-bold text-pink-500 mb-4">
            Kirby ha muerto
          </span>
          <span className="mb-6 text-pink-400 text-center px-4">
            {deathReason ||
              "Kirby ha muerto. Reinicia el juego para volver a jugar."}
          </span>
          <Button
            onClick={() => {
              setShowDeathDialog(false);
              resetGame();
              setTimeout(() => {
                startGame();
              }, 100);
            }}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500 shadow-lg px-6 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Reiniciar juego
          </Button>
        </Card>
      </>
    );
  }

  return (
    <Card className="w-[20rem] h-[32rem] rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <CardHeader className="w-full flex flex-col items-center justify-center mb-2 py-2 px-4 gap-1">
        <div className="w-full flex flex-row items-center justify-between mb-1">
          <span className="text-xs text-pink-600 font-semibold flex items-center gap-1">
            <Clock size={15} />
            {new Date().toLocaleTimeString()}
          </span>
          <span className="text-xs text-pink-600 font-semibold flex items-center gap-1">
            <Calendar size={15} /> {state.age} días
          </span>
        </div>
        <KirbyStatsPopover
          state={state}
          playTime={playTime}
          formatElapsedTime={formatElapsedTime}
          resetGame={resetGame}
        />
      </CardHeader>

      <div className="w-full max-w-[18rem] bg-white/80 rounded-3xl shadow-xl flex flex-col items-center justify-center border-2 border-pink-200 backdrop-blur-sm overflow-hidden p-6">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center border border-pink-100 mb-4">
          <img
            src={getCurrentGif()}
            alt={`Kirby ${currentAction}`}
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              (e.target as HTMLImageElement).src = KIRBY_GIFS.idle[0];
            }}
          />
        </div>
        <div className={`text-sm font-bold ${kirbyMood?.color} text-center px-2 flex items-center justify-center gap-2`}>
          {currentAction === "eating" && (<><span>¡Ñam ñam ñam!</span> <Utensils size={18} /></>)}
          {currentAction === "playing" && (<><span>¡Jugando feliz!</span> <Gamepad2 size={18} /></>)}
          {currentAction === "sleeping" && (<><span>Zzz...</span> <BatteryFull size={18} /></>)}
          {!["eating", "playing", "sleeping"].includes(currentAction) && (<><span>{kirbyEmotion?.message}</span> <Smile size={18} /></>)}
        </div>
      </div>

      <div className="flex gap-2 mx-auto mt-4 justify-center w-fit">
        <Button
          onClick={() => handleAction("play")}
          className="bg-gradient-to-r from-pink-300 to-pink-400 text-white hover:from-pink-400 hover:to-pink-500 shadow flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
          disabled={state.energy < 10}
        >
          <Gamepad2 size={16} /> Jugar
        </Button>
        <Button
          onClick={() => handleAction("feed")}
          className="bg-gradient-to-r from-blue-200 to-blue-300 text-pink-700 hover:from-blue-300 hover:to-blue-400 shadow flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
        >
          <Utensils size={16} /> Alimentar
        </Button>
        <Button
          onClick={() => handleAction("sleep")}
          className="bg-gradient-to-r from-yellow-200 to-yellow-300 text-pink-700 hover:from-yellow-300 hover:to-yellow-400 shadow flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
        >
          <BatteryFull size={16} /> Dormir
        </Button>
      </div>
      <div className="text-center mt-4 text-xs text-pink-400">
        Estado general:{" "}
        {Math.round(
          (state.hunger + state.happiness + state.energy + state.health) / 4
        )}
        %
      </div>
    </Card>
  );
}
