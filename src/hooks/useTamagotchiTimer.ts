import { useEffect, useRef } from "react"
import type { TamagotchiState } from "@/types/tamagotchi"
import { tick } from "../services/tamagotchiService"

interface UseTamagotchiTimerOptions {
  isPlaying: boolean
  state: TamagotchiState | null
  onTick: (newState: TamagotchiState) => void
}

export function useTamagotchiTimer({ isPlaying, state, onTick }: UseTamagotchiTimerOptions) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => {
    if (!isPlaying || !state) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = undefined
      }
      return
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const elapsed = now - state.lastUpdated
      const newState = tick(state, elapsed)
      onTick(newState)
    }, 30000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = undefined
      }
    }
  }, [isPlaying, state?.lastUpdated])
}
