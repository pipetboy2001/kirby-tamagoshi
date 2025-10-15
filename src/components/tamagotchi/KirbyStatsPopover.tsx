import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Progress } from "../ui/progress";
import { Smile, Gamepad2, Heart, Zap, Utensils, Clock } from "lucide-react";

interface KirbyStatsPopoverProps {
  state: any;
  playTime: number;
  formatElapsedTime: (seconds: number) => string;
}

export function KirbyStatsPopover({ state, playTime, formatElapsedTime }: KirbyStatsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="text-2xl font-extrabold text-pink-500 drop-shadow-lg cursor-pointer flex items-center gap-2 character-name hover:scale-105 transition-transform justify-center w-full">
          <Smile size={24} />
          Kirby
        </span>
      </PopoverTrigger>
      <PopoverContent className="bg-white/95 backdrop-blur-sm border-pink-200">
        <div className="mb-3 text-pink-500 font-bold flex items-center gap-2">
          <Smile size={18} />
          Estadísticas de Kirby
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
              <Heart size={14} />
              Salud
            </span>
            <Progress value={state.health} className="bg-green-100 flex-1" />
            <span className="text-xs font-bold w-8 text-right">{state.health}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-pink-600 flex items-center gap-1 w-16">
              <Smile size={14} />
              Ánimo
            </span>
            <Progress value={state.happiness} className="bg-pink-100 flex-1" />
            <span className="text-xs font-bold w-8 text-right">{state.happiness}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-600 flex items-center gap-1 w-16">
              <Zap size={14} />
              Energía
            </span>
            <Progress value={state.energy} className="bg-blue-100 flex-1" />
            <span className="text-xs font-bold w-8 text-right">{state.energy}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-yellow-600 flex items-center gap-1 w-16">
              <Utensils size={14} />
              Hambre
            </span>
            <Progress value={state.hunger} className="bg-yellow-100 flex-1" />
            <span className="text-xs font-bold w-8 text-right">{state.hunger}</span>
          </div>
        </div>
        
      </PopoverContent>
    </Popover>
  );
}