import { Card, CardHeader } from "../ui/card";
import { toast } from "sonner";
import { KirbyActions } from "./KirbyActions";
import { Clock, Calendar, Smile, Utensils, Gamepad2, BatteryFull } from "lucide-react";
import { useEffect } from "react";
import { useTamagotchiUI } from "@/hooks/useTamagotchiUI";
import { KirbyStatsPopover } from "./KirbyStatsPopover";
import { KirbyDeathScreen } from "./KirbyDeathScreen";

export default function Tamagotchi() {
  const {
    state,
    currentAction,
    getCurrentGif,
    kirbyMood,
    kirbyEmotion,
    formatElapsedTime,
    handleAction,
    showDeathDialog,
    deathReason,
    handleRestart,
    alerts,
    playTime,
  } = useTamagotchiUI();

  // Mostrar toasts solo cuando hay alertas críticas
  useEffect(() => {
    alerts.forEach(alert =>
      toast(
        <div className="flex items-center gap-2">
          <alert.icon className={`${alert.color} w-4 h-4`} />
          <span>{alert.text}</span>
        </div>,
        { duration: 4000 }
      )
    );
  }, [alerts]);

  // Pantalla de muerte
  if (showDeathDialog || !state) {
    return <KirbyDeathScreen onRestart={handleRestart} deathReason={deathReason} />;
  }

  return (
    <Card className="w-[20rem] h-[32rem] rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header con tiempo y edad */}
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
        />
      </CardHeader>

      {/* GIF de Kirby y estado emocional */}
      <div className="w-full max-w-[18rem] bg-white/80 rounded-3xl shadow-xl flex flex-col items-center justify-center border-2 border-pink-200 backdrop-blur-sm overflow-hidden p-6">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center border border-pink-100 mb-4">
          <img
            src={getCurrentGif()}
            alt={`Kirby ${currentAction}`}
            className="w-full h-full object-contain p-2"
            onError={(e) => (e.currentTarget.src = getCurrentGif())}
          />
        </div>

        <div className={`text-sm font-bold ${kirbyMood?.color} text-center px-2 flex items-center justify-center gap-2`}>
          {currentAction === "eating" && (<><span>¡Ñam ñam ñam!</span> <Utensils size={18} /></>)}
          {currentAction === "playing" && (<><span>¡Jugando feliz!</span> <Gamepad2 size={18} /></>)}
          {currentAction === "sleeping" && (<><span>Zzz...</span> <BatteryFull size={18} /></>)}
          {!["eating", "playing", "sleeping"].includes(currentAction) && (<><span>{kirbyEmotion?.message}</span> <Smile size={18} /></>)}
        </div>
      </div>

      {/* Botones de acción */}
      <KirbyActions onAction={handleAction} disabled={state.energy < 10} />

      {/* Estado general */}
      <div className="text-center mt-4 text-xs text-pink-400">
        Estado general:{" "}
        {Math.round((state.hunger + state.happiness + state.energy + state.health) / 4)}%
      </div>
    </Card>
  );
}
