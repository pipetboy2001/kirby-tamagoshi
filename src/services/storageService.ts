import type { TamagotchiState } from "@/types/tamagotchi"

const TAMAGOTCHI_KEY = "tamagotchi"
const IS_PLAYING_KEY = "isPlaying"

export function loadTamagotchiState(): TamagotchiState | null {
  try {
    const saved = localStorage.getItem(TAMAGOTCHI_KEY)
    if (!saved) return null
    return JSON.parse(saved) as TamagotchiState
  } catch (error) {
    localStorage.removeItem(TAMAGOTCHI_KEY)
    return null
  }
}

export function saveTamagotchiState(state: TamagotchiState) {
  try {
    localStorage.setItem(TAMAGOTCHI_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn("❌ Error guardando estado:", error)
  }
}

export function loadIsPlaying(): boolean {
  try {
    return localStorage.getItem(IS_PLAYING_KEY) === "true"
  } catch {
    return false
  }
}

export function saveIsPlaying(isPlaying: boolean) {
  try {
    localStorage.setItem(IS_PLAYING_KEY, isPlaying ? "true" : "false")
  } catch (error) {
    console.warn("❌ Error guardando isPlaying:", error)
  }
}

export function clearTamagotchiStorage() {
  localStorage.removeItem(TAMAGOTCHI_KEY)
  localStorage.removeItem(IS_PLAYING_KEY)
}
