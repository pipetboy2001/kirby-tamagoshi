import { BatteryFullIcon, Gamepad2Icon, UtensilsIcon } from "lucide-react";
import { Button } from "../ui/button";

export function KirbyActions({
  onAction,
  disabled
}: {
  onAction: (action: "play" | "feed" | "sleep") => void;
  disabled?: boolean;
}) {
  return (
    <div className="mx-auto mt-4 flex w-fit justify-center gap-2">
      <Button
        onClick={() => onAction("play")}
        disabled={disabled}
        className="... bg-gradient-to-r from-pink-300 to-pink-400 text-white">
        <Gamepad2Icon size={16} /> Jugar
      </Button>
      <Button
        onClick={() => onAction("feed")}
        className="... bg-gradient-to-r from-blue-200 to-blue-300 text-pink-700">
        <UtensilsIcon size={16} /> Alimentar
      </Button>
      <Button
        onClick={() => onAction("sleep")}
        className="... bg-gradient-to-r from-yellow-200 to-yellow-300 text-pink-700">
        <BatteryFullIcon size={16} /> Dormir
      </Button>
    </div>
  );
}
