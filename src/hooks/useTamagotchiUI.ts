import { useState, useEffect, useCallback } from "react"
import { useTamagotchi } from "./useTamagotchi"
import { KIRBY_GIFS } from "@/const/kirbyState"
import { getKirbyEmotion, getKirbyGif } from "@/lib/kirbyEmotion"
import { Utensils, BatteryFull, Heart, AlertTriangle } from "lucide-react"

type ActionState = "idle" | "eating" | "playing" | "sleeping"
type DeathCause = "age" | "health" | "hunger"

// Constantes para evitar magic numbers
const CRITICAL_THRESHOLDS = {
  hunger: 20,
  energy: 20, 
  happiness: 20,
  health: 30,
  maxAge: 60
} as const

const ACTION_DURATION = 5000
const GIF_CHANGE_INTERVAL = 8000

export function useTamagotchiUI() {
  const tamagotchi = useTamagotchi()
  const [currentAction, setCurrentAction] = useState<ActionState>("idle")
  const [currentGifIndex, setCurrentGifIndex] = useState(0)
  const [showDeathDialog, setShowDeathDialog] = useState(false)
  const [deathReason, setDeathReason] = useState("")

  const kirbyEmotion = tamagotchi.state ? getKirbyEmotion(tamagotchi.state) : null
  
  // Funciones helper
  const getCurrentGif = useCallback(() => {
    if (!kirbyEmotion) return KIRBY_GIFS.idle[0]
    return getKirbyGif(currentAction, kirbyEmotion, currentGifIndex)
  }, [currentAction, kirbyEmotion, currentGifIndex])

  const formatElapsedTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h > 0 ? h + "h " : ""}${m > 0 ? m + "m " : ""}${s}s`
  }, [])

  const getCriticalAlerts = useCallback(() => {
    if (!tamagotchi.state) return []
    
    const { hunger, energy, happiness, health } = tamagotchi.state
    const alerts = []

    if (hunger < CRITICAL_THRESHOLDS.hunger) {
      alerts.push({ icon: Utensils, text: "¡Kirby tiene hambre!", color: "text-red-500" })
    }
    if (energy < CRITICAL_THRESHOLDS.energy) {
      alerts.push({ icon: BatteryFull, text: "Kirby está cansado", color: "text-orange-500" })
    }
    if (happiness < CRITICAL_THRESHOLDS.happiness) {
      alerts.push({ icon: Heart, text: "Kirby está triste", color: "text-purple-500" })
    }
    if (health < CRITICAL_THRESHOLDS.health) {
      alerts.push({ icon: AlertTriangle, text: "¡Salud crítica!", color: "text-red-600" })
    }

    return alerts
  }, [tamagotchi.state])

  const getDeathReason = useCallback((cause: DeathCause): string => {
    const reasons = {
      age: "Kirby ha muerto de vejez. ¡Felicidades por cuidarlo tanto tiempo! 👴",
      health: "Kirby ha muerto por enfermedad. ¡Cuida mejor su salud la próxima vez! 🏥", 
      hunger: "Kirby ha muerto de hambre. ¡No olvides alimentarlo! 🍽️"
    }
    return reasons[cause]
  }, [])

  // Manejo de acciones
  const handleAction = useCallback((action: "play" | "feed" | "sleep") => {
    const actionMap = {
      play: "playing" as const,
      feed: "eating" as const,
      sleep: "sleeping" as const,
    }
    
    const newAction = actionMap[action]
    setCurrentAction(newAction)
    setCurrentGifIndex(Math.floor(Math.random() * KIRBY_GIFS[newAction].length))
    
    tamagotchi.doAction(action)
    
    setTimeout(() => {
      setCurrentAction("idle")
      setCurrentGifIndex(Math.floor(Math.random() * KIRBY_GIFS.idle.length))
    }, ACTION_DURATION)
  }, [tamagotchi])

  useEffect(() => {
    if (!["idle", "happy", "sad"].includes(currentAction)) return

    const interval = setInterval(() => {
      const availableGifs = KIRBY_GIFS[currentAction as keyof typeof KIRBY_GIFS]
      setCurrentGifIndex(Math.floor(Math.random() * availableGifs.length))
    }, GIF_CHANGE_INTERVAL)

    return () => clearInterval(interval)
  }, [currentAction])

  // Detección de muerte
  useEffect(() => {
    if (!tamagotchi.state) return
    const { age, health, hunger } = tamagotchi.state
    if (age >= CRITICAL_THRESHOLDS.maxAge) {
      setDeathReason(getDeathReason("age"))
      setShowDeathDialog(true)
    } else if (health === 0) {
      setDeathReason(getDeathReason("health"))  
      setShowDeathDialog(true)
    } else if (hunger === 0) {
      setDeathReason(getDeathReason("hunger"))
      setShowDeathDialog(true)
    }
  }, [tamagotchi.state, getDeathReason])

  return {
    ...tamagotchi,
    currentAction,
    showDeathDialog,
    setShowDeathDialog,
    deathReason,
    getCurrentGif,
    formatElapsedTime,
    getCriticalAlerts,
    kirbyEmotion,
    kirbyMood: kirbyEmotion?.mood,
    handleAction,
    }

}