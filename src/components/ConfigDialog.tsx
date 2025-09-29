import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";

export default function ConfigDialog() {
  return (
    
    <div className="absolute top-6 right-6 flex gap-2 z-10">
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-white/60 hover:bg-white shadow p-2 rounded-full absolute top-8 right-8 z-10">
          <Settings size={24} className="text-pink-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/90 flex flex-col gap-4 items-center">
        <DialogHeader>
          <DialogTitle className="font-semibold text-pink-500">Configuración</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </div>
  );
}
