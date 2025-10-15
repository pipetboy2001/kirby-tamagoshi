import type { TamagotchiState } from "@/types/tamagotchi"

export const MAX_STATS = 100
export const MAX_AGE = 60
export const INITIAL_STATS = 80

// Efectos de las acciones
export const ACTION_EFFECTS = {
  play: { happiness: 15, energy: -10, health: 2, playTime: 30 },
  feed: { hunger: 20, happiness: 5, health: 3 },
  sleep: { energy: 30, health: 1, hunger: -10 },
  health: { health: 20, happiness: 5, energy: -5, hunger: 10 },
} as const

type ActionKey = keyof typeof ACTION_EFFECTS
type ActionEffect = Partial<Record<keyof TamagotchiState, number>> & {
  playTime?: number
}

// Decaimiento natural por minuto
export const DECAY_RATES = {
  hunger: 2,
  happiness: 1,
  energy: 1,
  healthFromHunger: 2,
  healthFromEnergy: 2,
  healthFromHappiness: 1,
}

// Inicializa un nuevo Tamagotchi
export function createInitialState(): TamagotchiState {
  const now = Date.now()
  return {
    hunger: INITIAL_STATS,
    happiness: INITIAL_STATS,
    energy: INITIAL_STATS,
    health: INITIAL_STATS,
    age: 0,
    lastUpdated: now,
    playTime: 0,
  }
}

// Aplica una acción al Tamagotchi
export function applyAction(state: TamagotchiState, action: ActionKey): TamagotchiState {
  const effect = ACTION_EFFECTS[action] as ActionEffect

  return {
    ...state,
    hunger: clamp(state.hunger + (effect.hunger ?? 0)),
    happiness: clamp(state.happiness + (effect.happiness ?? 0)),
    energy: clamp(state.energy + (effect.energy ?? 0)),
    health: clamp(state.health + (effect.health ?? 0)),
    playTime: state.playTime + (effect.playTime ?? 0),
    lastUpdated: Date.now(),
  }
}

// Decaimiento natural de las stats
export function decayStats(state: TamagotchiState): TamagotchiState {
  let health = state.health
  if (state.hunger < 30) health -= 3
  if (state.energy < 20) health -= 2
  if (state.happiness < 25) health -= 1

  return {
    ...state,
    hunger: Math.max(0, state.hunger - DECAY_RATES.hunger),
    energy: Math.max(0, state.energy - DECAY_RATES.energy),
    happiness: Math.max(0, state.happiness - DECAY_RATES.happiness),
    health: clamp(health),
  }
}

// Actualiza el estado tras el tiempo transcurrido
export function tick(state: TamagotchiState, elapsedMs: number): TamagotchiState {
  const minutes = Math.floor(elapsedMs / 60000)
  if (minutes <= 0) return state

  let hunger = Math.max(0, state.hunger - minutes * DECAY_RATES.hunger)
  let happiness = Math.max(0, state.happiness - minutes * DECAY_RATES.happiness)
  let energy = Math.max(0, state.energy - minutes * DECAY_RATES.energy)
  let health = state.health

  if (hunger < 20) health -= DECAY_RATES.healthFromHunger * minutes
  if (energy < 20) health -= DECAY_RATES.healthFromEnergy * minutes
  if (happiness < 20) health -= DECAY_RATES.healthFromHappiness * minutes

  // Penalización por vejez si salud baja
  let vejezMultiplier = 1
  if (state.age >= 30 && health < 50) {
    vejezMultiplier = 1.25
    health -= Math.floor(minutes * 0.25)
  }

  const totalMinutes = state.age * 1440 + Math.floor(minutes * vejezMultiplier)
  const newAge = Math.floor(totalMinutes / 1440)

  // Muerte por vejez o enfermedad
  if (newAge >= MAX_AGE || health <= 0) {
    return {
      ...state,
      hunger: 0,
      happiness: 0,
      energy: 0,
      health: 0,
      age: newAge,
      lastUpdated: Date.now(),
    }
  }

  return {
    ...state,
    hunger: Math.floor(hunger),
    happiness: Math.floor(happiness),
    energy: Math.floor(energy),
    health: clamp(Math.floor(health)),
    age: newAge,
    lastUpdated: Date.now(),
  }
}

// Helper: limita valores entre min y max
function clamp(value: number, min = 0, max = MAX_STATS) {
  return Math.max(min, Math.min(max, value))
}
