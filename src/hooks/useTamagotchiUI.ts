import { AlertTriangle, BatteryFull, Heart, Utensils } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { KIRBY_GIFS } from "@/const/kirbyState";
import { getKirbyEmotion, getKirbyGif } from "@/lib/kirbyEmotion";
import { useTamagotchi } from "./useTamagotchi";

type ActionState = "idle" | "eating" | "playing" | "sleeping";

const CRITICAL_THRESHOLDS = {
  hunger: 20,
  energy: 20,
  happiness: 20,
  health: 30
};

const ACTION_DURATION = 5000;
const GIF_CHANGE_INTERVAL = 8000;

export function useTamagotchiUI() {
  const tamagotchi = useTamagotchi();
  const [currentAction, setCurrentAction] = useState<ActionState>("idle");
  const [gifIndex, setGifIndex] = useState(0);
  const [showDeathDialog, setShowDeathDialog] = useState(false);
  const [deathReason, setDeathReason] = useState("");

  const kirbyEmotion = tamagotchi.state
    ? getKirbyEmotion(tamagotchi.state)
    : null;

  // 🔹 Selección de GIF
  const getCurrentGif = useCallback(() => {
    if (!kirbyEmotion) return KIRBY_GIFS.idle[0];
    return getKirbyGif(currentAction, kirbyEmotion, gifIndex);
  }, [currentAction, kirbyEmotion, gifIndex]);

  // 🔹 Rotación de GIFs cada cierto tiempo
  useEffect(() => {
    if (currentAction !== "idle") return;
    const interval = setInterval(() => {
      const gifs = KIRBY_GIFS[currentAction];
      setGifIndex(Math.floor(Math.random() * gifs.length));
    }, GIF_CHANGE_INTERVAL);

    return () => clearInterval(interval);
  }, [currentAction]);

  // 🔹 Formateo del tiempo jugado
  const formatElapsedTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? `${h}h ` : ""}${m > 0 ? `${m}m ` : ""}${s}s`;
  }, []);

  // 🔹 Acciones del jugador
  const handleAction = useCallback(
    (action: "play" | "feed" | "sleep") => {
      const map = {
        play: "playing",
        feed: "eating",
        sleep: "sleeping"
      } as const;

      const newAction = map[action];
      setCurrentAction(newAction);
      tamagotchi.doAction(action);

      setTimeout(() => setCurrentAction("idle"), ACTION_DURATION);
    },
    [tamagotchi]
  );

  // 🔹 Alertas críticas
  const alerts = useMemo(() => {
    if (!tamagotchi.state) return [];
    const { hunger, energy, happiness, health } = tamagotchi.state;

    const result = [];
    if (hunger < CRITICAL_THRESHOLDS.hunger)
      result.push({
        icon: Utensils,
        text: "¡Kirby tiene hambre!",
        color: "text-red-500"
      });
    if (energy < CRITICAL_THRESHOLDS.energy)
      result.push({
        icon: BatteryFull,
        text: "Kirby está cansado",
        color: "text-orange-500"
      });
    if (happiness < CRITICAL_THRESHOLDS.happiness)
      result.push({
        icon: Heart,
        text: "Kirby está triste",
        color: "text-purple-500"
      });
    if (health < CRITICAL_THRESHOLDS.health)
      result.push({
        icon: AlertTriangle,
        text: "¡Salud crítica!",
        color: "text-red-600"
      });

    return result;
  }, [tamagotchi.state]);

  // 🔹 Muerte visual (cuando el core deja de tener estado)
  useEffect(() => {
    if (!tamagotchi.isPlaying && !tamagotchi.state) {
      setDeathReason("Kirby ha fallecido 💀. Cuídalo mejor la próxima vez.");
      setShowDeathDialog(true);
    }
  }, [tamagotchi.isPlaying, tamagotchi.state]);

  const handleRestart = useCallback(() => {
    tamagotchi.resetGame();
    setShowDeathDialog(false);
    tamagotchi.startGame();
  }, [tamagotchi]);

  return {
    ...tamagotchi,
    currentAction,
    getCurrentGif,
    kirbyEmotion,
    kirbyMood: kirbyEmotion?.mood,
    formatElapsedTime,
    handleAction,
    showDeathDialog,
    deathReason,
    handleRestart,
    alerts
  };
}
