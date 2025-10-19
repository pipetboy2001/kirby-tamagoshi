import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";

export default function ConfigDialog() {
  return (
    <div className="absolute top-6 right-6 z-10 flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-8 right-8 z-10 rounded-full bg-white/60 p-2 shadow hover:bg-white">
            <Settings
              size={24}
              className="text-pink-400"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center gap-4 bg-white/90">
          <DialogHeader>
            <DialogTitle className="font-semibold text-pink-500">
              Configuración
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button
              disabled
              className="w-48 bg-black text-white">
              Cambiar tema
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
