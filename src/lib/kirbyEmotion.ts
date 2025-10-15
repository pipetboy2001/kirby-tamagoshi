import { KIRBY_GIFS } from "@/const/kirbyState";
import type { TamagotchiState } from "@/types/tamagotchi";

type KirbyMood = {
  emoji: string;
  status: string;
  color: string;
};

type KirbyEmotionResult = {
  mood: KirbyMood;
  gifType: keyof typeof KIRBY_GIFS;
  message: string;
};

export function getKirbyEmotion(state: TamagotchiState | null): KirbyEmotionResult {
  if (!state) return {
    mood: { emoji: "😴", status: "durmiendo", color: "text-gray-400" },
    gifType: "idle",
    message: "Kirby está durmiendo 😴"
  };
  // Si alguna estadística crítica está baja, mostrar muy mal aunque el promedio sea alto
  if (state.hunger < 20 || state.health < 30 || state.energy < 20 || state.happiness < 20) {
    return {
      mood: { emoji: "😵", status: "muy mal", color: "text-red-500" },
      gifType: "sad",
      message: "Kirby está muy mal 😵 ¡Cuídalo urgente!"
    };
  }
  const avgStats = (state.hunger + state.happiness + state.energy + state.health) / 4;
  if (avgStats >= 80) return {
    mood: { emoji: "😊", status: "muy feliz", color: "text-green-500" },
    gifType: "happy",
    message: "Kirby está muy feliz ✨"
  };
  if (avgStats >= 60) return {
    mood: { emoji: "🙂", status: "contento", color: "text-blue-500" },
    gifType: "happy",
    message: "Kirby está contento ✨"
  };
  if (avgStats >= 40) return {
    mood: { emoji: "😐", status: "normal", color: "text-yellow-500" },
    gifType: "idle",
    message: "Kirby está normal"
  };
  if (avgStats >= 20) return {
    mood: { emoji: "😟", status: "triste", color: "text-orange-500" },
    gifType: "sad",
    message: "Kirby está triste 💔"
  };
  return {
    mood: { emoji: "😵", status: "muy mal", color: "text-red-500" },
    gifType: "sad",
    message: "Kirby está muy mal 😵 ¡Cuídalo urgente!"
  };
}

export function getKirbyGif(
  currentAction: string,
  emotion: KirbyEmotionResult,
  currentGifIndex: number
): string {
  // Prioridad: gif de acción si existe, si no, gif de emoción
  if (currentAction === "eating") return KIRBY_GIFS.eating[currentGifIndex % KIRBY_GIFS.eating.length];
  if (currentAction === "playing") return KIRBY_GIFS.playing[currentGifIndex % KIRBY_GIFS.playing.length];
  if (currentAction === "sleeping") return KIRBY_GIFS.sleeping[currentGifIndex % KIRBY_GIFS.sleeping.length];
  if (emotion.gifType && Object.prototype.hasOwnProperty.call(KIRBY_GIFS, emotion.gifType)) {
    const gifs = KIRBY_GIFS[emotion.gifType];
    return gifs[currentGifIndex % gifs.length] || gifs[0];
  }
  return KIRBY_GIFS.idle[currentGifIndex % KIRBY_GIFS.idle.length];
}
