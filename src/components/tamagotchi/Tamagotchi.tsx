import {
  BatteryFull,
  Calendar,
  Clock,
  Gamepad2,
  Smile,
  Utensils
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTamagotchiUI } from "@/hooks/useTamagotchiUI";
import { Card, CardHeader } from "../ui/card";
import { KirbyActions } from "./KirbyActions";
import { KirbyDeathScreen } from "./KirbyDeathScreen";
import { KirbyStatsPopover } from "./KirbyStatsPopover";

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
    playTime
  } = useTamagotchiUI();

  // Mostrar toasts solo cuando hay alertas críticas
  useEffect(() => {
    for (const alert of alerts) {
      toast(
        <div className="flex items-center gap-2">
          <alert.icon className={`${alert.color} h-4 w-4`} />
          <span>{alert.text}</span>
        </div>,
        { duration: 4000 }
      );
    }
  }, [alerts]);

  // Pantalla de muerte
  if (showDeathDialog || !state) {
    return (
      <KirbyDeathScreen
        onRestart={handleRestart}
        deathReason={deathReason}
      />
    );
  }

  return (
    <Card className="flex h-[32rem] w-[20rem] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header con tiempo y edad */}
      <CardHeader className="mb-2 flex w-full flex-col items-center justify-center gap-1 px-4 py-2">
        <div className="mb-1 flex w-full flex-row items-center justify-between">
          <span className="flex items-center gap-1 font-semibold text-pink-600 text-xs">
            <Clock size={15} />
            {new Date().toLocaleTimeString()}
          </span>
          <span className="flex items-center gap-1 font-semibold text-pink-600 text-xs">
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
      <div className="flex w-full max-w-[18rem] flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-pink-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-center overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-100 to-purple-100">
          <img
            src={getCurrentGif()}
            alt={`Kirby ${currentAction}`}
            className="h-full w-full object-contain p-2"
            onError={(e) => {
              e.currentTarget.src = getCurrentGif();
            }}
          />
        </div>

        <div
          className={`font-bold text-sm ${kirbyMood?.color} flex items-center justify-center gap-2 px-2 text-center`}>
          {currentAction === "eating" && (
            <>
              <span>¡Ñam ñam ñam!</span> <Utensils size={18} />
            </>
          )}
          {currentAction === "playing" && (
            <>
              <span>¡Jugando feliz!</span> <Gamepad2 size={18} />
            </>
          )}
          {currentAction === "sleeping" && (
            <>
              <span>Zzz...</span> <BatteryFull size={18} />
            </>
          )}
          {!["eating", "playing", "sleeping"].includes(currentAction) && (
            <>
              <span>{kirbyEmotion?.message}</span> <Smile size={18} />
            </>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <KirbyActions
        onAction={handleAction}
        disabled={state.energy < 10}
      />

      {/* Estado general */}
      <div className="mt-4 text-center text-pink-400 text-xs">
        Estado general:{" "}
        {Math.round(
          (state.hunger + state.happiness + state.energy + state.health) / 4
        )}
        %
      </div>
    </Card>
  );
}
