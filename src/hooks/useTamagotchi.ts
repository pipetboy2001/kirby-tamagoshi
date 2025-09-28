import { useState, useCallback, useEffect } from "react"
import { createInitialState, applyAction, tick } from "../services/tamagotchiService"
import type { TamagotchiState } from "@/types/tamagotchi"
import {
  loadTamagotchiState,
  saveTamagotchiState,
  loadIsPlaying,
  saveIsPlaying,
  clearTamagotchiStorage
} from "@/services/storageService"
import { useTamagotchiTimer } from "./useTamagotchiTimer"

export function useTamagotchi() {
  const [state, setState] = useState<TamagotchiState | null>(() => {
    const saved = loadTamagotchiState()
    const isPlaying = loadIsPlaying()
    if (isPlaying && saved) {
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
      return
    }
    setState(prev => prev ? applyAction(prev, action) : prev)
  }, [state])

  const startGame = useCallback(() => {
    const initialState = createInitialState()
    setState(initialState)
    setIsPlaying(true)
  }, [])

  const resetGame = useCallback(() => {
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