import { Clock, Gamepad2, Heart, Smile, Utensils, Zap } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Progress } from "../ui/progress";

interface KirbyStatsPopoverProps {
  state: any;
  playTime: number;
  formatElapsedTime: (seconds: number) => string;
}

export function KirbyStatsPopover({
  state,
  playTime,
  formatElapsedTime
}: KirbyStatsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="character-name flex w-full cursor-pointer items-center justify-center gap-2 font-extrabold text-2xl text-pink-500 drop-shadow-lg transition-transform hover:scale-105">
          <Smile size={24} />
          Kirby
        </span>
      </PopoverTrigger>
      <PopoverContent className="border-pink-200 bg-white/95 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2 font-bold text-pink-500">
          <Smile size={18} />
          Estadísticas de Kirby
        </div>
        <div className="mb-2 flex items-center gap-1 font-semibold text-pink-600 text-xs">
          <Clock size={14} /> Última actualización:{" "}
          {new Date(state.lastUpdated).toLocaleTimeString()}
        </div>
        <div className="mb-3 flex items-center gap-1 font-semibold text-pink-600 text-xs">
          <Gamepad2 size={14} /> Tiempo de juego: {formatElapsedTime(playTime)}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex w-16 items-center gap-1 text-green-600 text-xs">
              <Heart size={14} />
              Salud
            </span>
            <Progress
              value={state.health}
              className="flex-1 bg-green-100"
            />
            <span className="w-8 text-right font-bold text-xs">
              {state.health}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex w-16 items-center gap-1 text-pink-600 text-xs">
              <Smile size={14} />
              Ánimo
            </span>
            <Progress
              value={state.happiness}
              className="flex-1 bg-pink-100"
            />
            <span className="w-8 text-right font-bold text-xs">
              {state.happiness}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex w-16 items-center gap-1 text-blue-600 text-xs">
              <Zap size={14} />
              Energía
            </span>
            <Progress
              value={state.energy}
              className="flex-1 bg-blue-100"
            />
            <span className="w-8 text-right font-bold text-xs">
              {state.energy}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex w-16 items-center gap-1 text-xs text-yellow-600">
              <Utensils size={14} />
              Hambre
            </span>
            <Progress
              value={state.hunger}
              className="flex-1 bg-yellow-100"
            />
            <span className="w-8 text-right font-bold text-xs">
              {state.hunger}
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
