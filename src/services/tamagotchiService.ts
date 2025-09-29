import type { TamagotchiState } from "@/types/tamagotchi"

export function createInitialState(): TamagotchiState {
  return {
    hunger: 80,
    happiness: 80,
    energy: 80,
    health: 80,
    age: 0,
    lastUpdated: Date.now(),
    playTime: 0,
  }
}

export function applyAction(state: TamagotchiState, action: "play" | "feed" | "sleep"): TamagotchiState {
  switch (action) {
    case "play":
      return {
        ...state,
        happiness: Math.min(100, state.happiness + 15),
        energy: Math.max(0, state.energy - 10),
        health: Math.max(0, Math.min(100, state.health + 2)),
        playTime: state.playTime + 30, 
        lastUpdated: Date.now()
      }
    case "feed":
      return {
        ...state,
        hunger: Math.min(100, state.hunger + 20),
        health: Math.max(0, Math.min(100, state.health + 3)),
        lastUpdated: Date.now()
      }
    case "sleep":
      return {
        ...state,
        energy: Math.min(100, state.energy + 30),
        health: Math.max(0, Math.min(100, state.health + 1)),
        hunger: Math.max(0, state.hunger - 10),
        lastUpdated: Date.now()
      }
    default:
      return state
  }
}

export function tick(state: TamagotchiState, elapsedMs: number): TamagotchiState {
  const minutes = Math.floor(elapsedMs / 60000)
  if (minutes <= 0) return state

  let hunger = Math.max(0, state.hunger - minutes * 2)
  let happiness = Math.max(0, state.happiness - minutes)
  let energy = Math.max(0, state.energy - Math.floor(minutes / 2))
  let health = state.health

  if (hunger < 20) health = Math.max(0, health - 2 * minutes)
  if (energy < 20) health = Math.max(0, health - 2 * minutes)
  if (happiness < 20) health = Math.max(0, health - 1 * minutes)

  // Penalización extra por vejez si la salud está baja
  // Si la edad es mayor o igual a 30 y la salud está por debajo de la mitad, el Tamagotchi dura 25% menos
  let vejezMultiplier = 1
  if (state.age >= 30 && health < 50) {
    vejezMultiplier = 1.25
    health = Math.max(0, health - Math.floor((minutes * 0.25)))
  }

  // la edad sube cada 1440 minutos (24h)
  const totalMinutes = (state.age * 1440) + Math.floor(minutes * vejezMultiplier)
  const newAge = Math.floor(totalMinutes / 1440)

  // Muerte por vejez o enfermedad
  if (newAge >= 60 || health <= 0) {
    return {
      hunger: 0,
      happiness: 0,
      energy: 0,
      health: 0,
      age: newAge,
      lastUpdated: Date.now(),
      playTime: state.playTime,
    }
  }

  return {
    ...state,
    hunger,
    happiness,
    energy,
    health,
    age: newAge,
    lastUpdated: Date.now(),
  }
}
