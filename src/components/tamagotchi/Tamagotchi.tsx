import { Card, CardHeader } from "../ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Clock, Calendar, Smile, BatteryFull, Utensils, Gamepad2 } from "lucide-react";

export default function Tamagotchi() {
  return (
    <Card className="w-[28rem] h-[32rem] rounded-2xl ">
      <CardHeader className="w-full flex flex-row items-center justify-between mb-4  py-2 px-4 gap-2">
        <span className="text-sm text-pink-600 font-semibold flex items-center gap-1"><Clock size={16} />Hora: 12:34</span>
        <Popover>
          <PopoverTrigger asChild>
            <span className="text-2xl font-extrabold text-pink-500 drop-shadow-lg cursor-pointer flex items-center gap-2"><Smile size={24} />Kirby</span>
          </PopoverTrigger>
          <PopoverContent className="bg-white/90">
            <div className="mb-2 text-pink-500 font-bold flex items-center gap-2"><Smile size={18} />Estadísticas</div>
            <div className="mb-2 text-xs text-pink-600 font-semibold flex items-center gap-1"><Clock size={14} />Tiempo de juego: 00:12:34</div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs text-pink-400 flex items-center gap-1"><Smile size={14} />Felicidad</span>
              <Progress value={80} className="bg-pink-200" />
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs text-blue-400 flex items-center gap-1"><BatteryFull size={14} />Energía</span>
              <Progress value={60} className="bg-blue-200" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-yellow-400 flex items-center gap-1"><Utensils size={14} />Hambre</span>
              <Progress value={40} className="bg-yellow-200" />
            </div>
          </PopoverContent>
        </Popover>
        <span className="text-sm text-pink-600 font-semibold flex items-center gap-1"><Calendar size={16} />Edad: 3 días</span>
      </CardHeader>
      <div className="w-full max-w-[22rem] h-64 bg-white/80 rounded-2xl shadow-lg flex items-center justify-center border-2 border-pink-200 mx-auto my-8">
        {/* Aquí irá el video de Kirby */}
        <span className="text-pink-400 font-bold">Video de Kirby</span>
      </div>
      <div className="flex gap-2 mx-auto mt-6 justify-center w-fit">
        <Button className="bg-pink-300 text-white hover:bg-pink-400 shadow flex items-center gap-2"><Gamepad2 size={16} />Jugar</Button>
        <Button className="bg-blue-200 text-pink-600 hover:bg-blue-300 shadow flex items-center gap-2"><Utensils size={16} />Alimentar</Button>
        <Button className="bg-yellow-200 text-pink-600 hover:bg-yellow-300 shadow flex items-center gap-2"><BatteryFull size={16} />Dormir</Button>
      </div>
    </Card>
  );
}
