import { Card, CardHeader } from "../ui/card";
import { toast } from "sonner";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Clock, Calendar, Smile, BatteryFull, Utensils, Gamepad2, Heart, Zap, AlertTriangle } from "lucide-react";
import { useTamagotchi } from "@/hooks/useTamagotchi";
import { useState, useEffect, useRef } from "react";
import { KIRBY_GIFS } from "@/const/kirbyState";



export default function Tamagotchi() {
  const { state, doAction, isPlaying, startGame, playTime, resetGame } = useTamagotchi();
  const [currentAction, setCurrentAction] = useState<string>("idle");
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const shownAlertsRef = useRef<string[]>([])

  function handleAction(action: "play" | "feed" | "sleep") {
    const actionMap = {
      play: "playing",
      feed: "eating", 
      sleep: "sleeping"
    };
    
    setCurrentAction(actionMap[action]);
    setCurrentGifIndex(Math.floor(Math.random() * KIRBY_GIFS[actionMap[action] as keyof typeof KIRBY_GIFS].length));
    
    doAction(action);
    
      setTimeout(() => {
        setCurrentAction(getIdleState());
        setCurrentGifIndex(Math.floor(Math.random() * KIRBY_GIFS.idle.length));
      }, 5000);
  }

  function getIdleState() {
    if (!state) return "idle";
    const avgStats = (state.hunger + state.happiness + state.energy + state.health) / 4;
    if (avgStats >= 60) return "happy";
    if (avgStats < 30) return "sad";
    return "idle";
  }

  useEffect(() => {
    if (currentAction === "idle" || currentAction === "happy" || currentAction === "sad") {
      const interval = setInterval(() => {
        const availableGifs = KIRBY_GIFS[currentAction as keyof typeof KIRBY_GIFS];
        setCurrentGifIndex(Math.floor(Math.random() * availableGifs.length));
      }, 8000); // Cambiar cada 8 segundos

      return () => clearInterval(interval);
    }
  }, [currentAction]);

  useEffect(() => {
    if (state && currentAction === "idle") {
      setCurrentAction(getIdleState());
    }
  }, [state]);

  function getCurrentGif() {
    const gifs = KIRBY_GIFS[currentAction as keyof typeof KIRBY_GIFS] || KIRBY_GIFS.idle;
    return gifs[currentGifIndex] || gifs[0];
  }

  function formatElapsedTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + 'h ' : ''}${m > 0 ? m + 'm ' : ''}${s}s`;
  }

  function getKirbyMood() {
    if (!state) return { emoji: "😴", status: "durmiendo", color: "text-gray-400" }
    
    const avgStats = (state.hunger + state.happiness + state.energy + state.health) / 4
    
    if (avgStats >= 80) return { emoji: "😊", status: "muy feliz", color: "text-green-500" }
    if (avgStats >= 60) return { emoji: "🙂", status: "contento", color: "text-blue-500" }
    if (avgStats >= 40) return { emoji: "😐", status: "normal", color: "text-yellow-500" }
    if (avgStats >= 20) return { emoji: "😟", status: "triste", color: "text-orange-500" }
    return { emoji: "😵", status: "muy mal", color: "text-red-500" }
  }

   useEffect(() => {
    if (!state) return

    const alerts = getCriticalAlerts()

    alerts.forEach((alert) => {
      if (!shownAlertsRef.current.includes(alert.text)) {
        toast(
          <div className="flex items-center gap-2">
            <alert.icon className={`${alert.color} w-4 h-4`} />
            <span>{alert.text}</span>
          </div>,
          {
            duration: 4000,
          }
        )
        shownAlertsRef.current.push(alert.text)
      }
    })

    // limpiar alerts viejos si ya no aplican
    shownAlertsRef.current = shownAlertsRef.current.filter(text =>
      alerts.some(a => a.text === text)
    )
  }, [state])

  function getCriticalAlerts() {
    if (!state) return []
    
    const alerts = []
    if (state.hunger < 20) alerts.push({ icon: Utensils, text: "¡Kirby tiene hambre!", color: "text-red-500" })
    if (state.energy < 20) alerts.push({ icon: BatteryFull, text: "Kirby está cansado", color: "text-orange-500" })
    if (state.happiness < 20) alerts.push({ icon: Heart, text: "Kirby está triste", color: "text-purple-500" })
    if (state.health < 30) alerts.push({ icon: AlertTriangle, text: "¡Salud crítica!", color: "text-red-600" })
    
    return alerts
  }

  const kirbyMood = getKirbyMood()

  if (!isPlaying || !state) {
    return (
      <Card className="w-[20rem] h-[32rem] rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-6xl mb-4">🌸</div>
        <span className="text-2xl font-bold text-pink-500 mb-4">¡Bienvenido!</span>
        <span className="mb-6 text-pink-400 text-center px-4">
          Presiona el botón para comenzar a jugar con Kirby Tamagotchi
        </span>
        <Button 
        
          onClick={startGame} 
          className="bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500 shadow-lg px-6 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
        >
        Jugar por primera vez
        </Button>
      </Card>
    );
  }

  return (
    <Card className="w-[22rem] min-h-[34rem] rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50">
      <CardHeader className="w-full flex flex-col items-center justify-center mb-2 py-2 px-4 gap-1">
        <div className="w-full flex flex-row items-center justify-between mb-1">
          <span className="text-xs text-pink-600 font-semibold flex items-center gap-1">
            <Clock size={15} />
            {new Date().toLocaleTimeString()}
          </span>
          <span className="text-xs text-pink-600 font-semibold flex items-center gap-1">
            <Calendar size={15} /> {state.age} días
          </span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <span className="text-2xl font-extrabold text-yellow-500 drop-shadow-lg cursor-pointer flex items-center gap-2 character-name hover:scale-105 transition-transform justify-center w-full">
              <Smile size={24} />Kirby
            </span>
          </PopoverTrigger>
          <PopoverContent className="bg-white/95 backdrop-blur-sm border-pink-200">
            <div className="mb-3 text-pink-500 font-bold flex items-center gap-2">
              <Smile size={18} />Estadísticas de Kirby
            </div>
            <div className="mb-2 text-xs text-pink-600 font-semibold flex items-center gap-1">
              <Clock size={14} /> Última actualización: {new Date(state.lastUpdated).toLocaleTimeString()}
            </div>
            <div className="mb-3 text-xs text-pink-600 font-semibold flex items-center gap-1">
              <Gamepad2 size={14} /> Tiempo de juego: {formatElapsedTime(playTime)}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-600 flex items-center gap-1 w-16">
                  <Heart size={14} />Salud
                </span>
                <Progress value={state.health} className="bg-green-100 flex-1" />
                <span className="text-xs font-bold w-8 text-right">{state.health}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-pink-600 flex items-center gap-1 w-16">
                  <Smile size={14} />Ánimo
                </span>
                <Progress value={state.happiness} className="bg-pink-100 flex-1" />
                <span className="text-xs font-bold w-8 text-right">{state.happiness}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-600 flex items-center gap-1 w-16">
                  <Zap size={14} />Energía
                </span>
                <Progress value={state.energy} className="bg-blue-100 flex-1" />
                <span className="text-xs font-bold w-8 text-right">{state.energy}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-yellow-600 flex items-center gap-1 w-16">
                  <Utensils size={14} />Hambre
                </span>
                <Progress value={state.hunger} className="bg-yellow-100 flex-1" />
                <span className="text-xs font-bold w-8 text-right">{state.hunger}</span>
              </div>
            </div>
            {/* Botón de reset en el popover */}
            <Button 
              onClick={resetGame} 
              variant="outline" 
              size="sm" 
              className="mt-3 w-full text-xs border-pink-200 hover:bg-pink-50"
            >
              🔄 Reiniciar juego
            </Button>
          </PopoverContent>
        </Popover>
      </CardHeader>

      <div className="w-full max-w-[18rem] h-72 bg-white/80 rounded-3xl shadow-xl flex flex-col items-center justify-center border-2 border-pink-200 mx-auto my-4 backdrop-blur-sm overflow-hidden">
        <div className="w-56 h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center border border-pink-100">
          <img 
            src={getCurrentGif()} 
            alt={`Kirby ${currentAction}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = KIRBY_GIFS.idle[0];
            }}
          />
        </div>
        <div className={`text-sm font-bold ${kirbyMood.color} mt-2 text-center`}>
          {currentAction === "eating" && "¡Ñam ñam ñam! 🍽️"}
          {currentAction === "playing" && "¡Jugando feliz! 🎮"}
          {currentAction === "sleeping" && "Zzz... 😴"}
          {currentAction === "happy" && `Kirby está ${kirbyMood.status} ✨`}
          {currentAction === "sad" && `Kirby está ${kirbyMood.status} 💔`}
          {currentAction === "idle" && `Kirby está ${kirbyMood.status}`}
        </div>
      </div>

      <div className="flex gap-2 mx-auto mt-4 justify-center w-fit">
        <Button 
          onClick={() => handleAction("play")} // ← Esto llama a la función con animaciones
          className="bg-gradient-to-r from-pink-300 to-pink-400 text-white hover:from-pink-400 hover:to-pink-500 shadow flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
          disabled={state.energy < 10}
        >
          <Gamepad2 size={16} /> Jugar
        </Button>
        <Button 
          onClick={() => handleAction("feed")}
          className="bg-gradient-to-r from-blue-200 to-blue-300 text-pink-700 hover:from-blue-300 hover:to-blue-400 shadow flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
        >
          <Utensils size={16} /> Alimentar
        </Button>
        <Button 
          onClick={() => handleAction("sleep")}
          className="bg-gradient-to-r from-yellow-200 to-yellow-300 text-pink-700 hover:from-yellow-300 hover:to-yellow-400 shadow flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
        >
          <BatteryFull size={16} /> Dormir
        </Button>
      </div>
      <div className="text-center mt-4 text-xs text-pink-400">
        Estado general: {Math.round((state.hunger + state.happiness + state.energy + state.health) / 4)}%
      </div>
    </Card>
  );
}