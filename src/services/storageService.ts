import type { TamagotchiState } from "@/types/tamagotchi"

const STATE_KEY = "tamagotchi_state"
const PLAYING_KEY = "tamagotchi_isPlaying"

export function saveTamagotchiState(state: TamagotchiState) {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)) } 
  catch (e) { console.warn("❌ Error guardando estado:", e) }
}

export function loadTamagotchiState(): TamagotchiState | null {
  try { return JSON.parse(localStorage.getItem(STATE_KEY) || "null") } 
  catch (e) { localStorage.removeItem(STATE_KEY); return null }
}

export function saveIsPlaying(isPlaying: boolean) {
  try { localStorage.setItem(PLAYING_KEY, JSON.stringify(isPlaying)) } 
  catch (e) { console.warn("❌ Error guardando isPlaying:", e) }
}

export function loadIsPlaying(): boolean {
  try { return JSON.parse(localStorage.getItem(PLAYING_KEY) || "false") } 
  catch { return false }
}

export function clearTamagotchiStorage() {
  localStorage.removeItem(STATE_KEY)
  localStorage.removeItem(PLAYING_KEY)
}
