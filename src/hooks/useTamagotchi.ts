import { useState, useCallback, useEffect } from "react";
import { createInitialState, applyAction, tick } from "../services/tamagotchiService";
import type { TamagotchiState } from "@/types/tamagotchi";
import {
  loadTamagotchiState,
  saveTamagotchiState,
  loadIsPlaying,
  saveIsPlaying,
  clearTamagotchiStorage,
} from "@/services/storageService";

const MAX_AGE = 60;

export function useTamagotchi() {
  const [state, setState] = useState<TamagotchiState | null>(() => {
    const saved = loadTamagotchiState();
    const isPlaying = loadIsPlaying();

    if (isPlaying && saved) {
      const elapsed = Date.now() - saved.lastUpdated;
      return tick(saved, elapsed);
    }
    return null;
  });

  const [isPlaying, setIsPlaying] = useState(() => loadIsPlaying());

  // Persistencia automática
  useEffect(() => {
    if (state) saveTamagotchiState(state);
  }, [state]);

  useEffect(() => {
    saveIsPlaying(isPlaying);
  }, [isPlaying]);

  // Timer integrado (30 segundos)
  useEffect(() => {
    if (!isPlaying || !state) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - state.lastUpdated;
      const newState = tick(state, elapsed);

      // Condiciones de muerte
      if (newState.age >= MAX_AGE || newState.health <= 0 || newState.hunger <= 0) {
        clearTamagotchiStorage();
        setState(null);
        setIsPlaying(false);
        return;
      }

      setState(newState);
    }, 30000);

    return () => clearInterval(interval);
  }, [isPlaying, state]);

  // Acciones del jugador
  const doAction = useCallback(
    (action: "play" | "feed" | "sleep") => {
      if (!state) return;
      setState((prev) => (prev ? applyAction(prev, action) : prev));
    },
    [state]
  );

  const startGame = useCallback(() => {
    const initialState = createInitialState();
    setState(initialState);
    setIsPlaying(true);
  }, []);

  const resetGame = useCallback(() => {
    clearTamagotchiStorage();
    setState(null);
    setIsPlaying(false);
  }, []);

  return {
    state,
    isPlaying,
    doAction,
    startGame,
    resetGame,
    playTime: state?.playTime ?? 0,
  };
}
