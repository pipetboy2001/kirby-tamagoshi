import { useState, useCallback, useEffect } from "react"
import { createInitialState, applyAction, tick } from "../services/tamagotchiService"
import type { TamagotchiState } from "@/types/tamagotchi"
import {
  loadTamagotchiState,
  saveTamagotchiState,
  loadIsPlaying,
  saveIsPlaying,
  clearTamagotchiStorage
} from "../services/storageService"
import { useTamagotchiTimer } from "./useTamagotchiTimer"

export function useTamagotchi() {
  // Estado inicial usando storageService
  const [state, setState] = useState<TamagotchiState | null>(() => {
    const saved = loadTamagotchiState()
    const isPlaying = loadIsPlaying()
    if (isPlaying && saved) {
      console.log("🎮 Estado cargado desde localStorage:", saved)
      const elapsed = Date.now() - saved.lastUpdated
      return tick(saved, elapsed)
    }
    return null
  })

  const [isPlaying, setIsPlaying] = useState(() => loadIsPlaying())
  
  useEffect(() => {
    if (state) saveTamagotchiState(state)
  }, [state])

  useEffect(() => {
    saveIsPlaying(isPlaying)
  }, [isPlaying])

  useTamagotchiTimer({
    isPlaying,
    state,
    onTick: (newState) => {
      setState(newState)
    }
  })

  const doAction = useCallback((action: "play" | "feed" | "sleep") => {
    if (!state) {
      console.log("❌ No se puede hacer acción, no hay estado")
      return
    }
    console.log(`🎯 Acción: ${action}`)
    setState(prev => prev ? applyAction(prev, action) : prev)
  }, [state])

  const startGame = useCallback(() => {
    console.log("🚀 Iniciando nuevo juego")
    const initialState = createInitialState()
    setState(initialState)
    setIsPlaying(true)
  }, [])

  const resetGame = useCallback(() => {
    console.log("🔄 Reseteando juego")
    clearTamagotchiStorage()
    setState(null)
    setIsPlaying(false)
  }, [])

  const playTime = state?.playTime ?? 0

  return { 
    state, 
    doAction, 
    isPlaying, 
    startGame, 
    resetGame,
    playTime 
  }
}