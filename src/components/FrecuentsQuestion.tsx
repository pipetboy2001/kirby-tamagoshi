import { Gamepad2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function FrecuentsQuestion() {
    return (
        <>
        <div className="absolute bottom-6 left-6 z-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">❓ Preguntas frecuentes</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Preguntas frecuentes</DialogTitle>
                <DialogDescription>
                  Aquí tienes respuestas a las dudas más comunes sobre Kirby Tamagotchi:
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-64 overflow-y-auto px-1 py-2 flex flex-col gap-3 text-sm text-pink-700">
                <div>
                  <strong>¿Qué hago para mantener a Tamagotchi vivo?</strong><br />
                  Debes cuidar sus necesidades básicas: alimentarlo, jugar con él, dejarlo dormir y mantener su salud alta. Usa los botones correspondientes para cada acción.
                </div>
                <div>
                  <strong>¿Cuánto tiempo tengo para mantener a Tamagotchi vivo?</strong><br />
                  Puedes mantenerlo vivo indefinidamente si lo cuidas bien, pero si descuidas sus necesidades puede morir por hambre, enfermedad o vejez.
                </div>
                <div>
                  <strong>¿Cómo puedo saber si Tamagotchi está vivo o muerto?</strong><br />
                  Si Tamagotchi está vivo verás sus estadísticas y animaciones. Si muere, el juego se reiniciará y deberás empezar de nuevo.
                </div>
                <div>
                  <strong>¿Cómo puedo saber si Tamagotchi está hambriento, triste o enfermo?</strong><br />
                  Observa las barras de hambre, ánimo, energía y salud. Si alguna está baja, Tamagotchi mostrará alertas y su estado general cambiará.
                </div>
                <div>
                  <strong>¿Cómo puedo saber si Tamagotchi ha muerto de viejo, de hambre o de enfermedad?</strong><br />
                  El motivo de la muerte se muestra en la pantalla final antes de reiniciar. Mantén sus necesidades cubiertas para evitar muertes prematuras.
                </div>
                <div>
                  <strong>¿Cómo alimento a Kirby?</strong><br />
                  Usa el botón "Alimentar" para darle comida y mejorar su hambre.
                </div>
                <div>
                  <strong>¿Por qué está triste?</strong><br />
                  Si su ánimo está bajo, juega con él usando el botón "Jugar".
                </div>
                <div>
                  <strong>¿Cómo recupera energía?</strong><br />
                  Haz que duerma con el botón "Dormir".
                </div>
                <div>
                  <strong>¿Qué pasa si la salud es baja?</strong><br />
                  Mantén sus necesidades cubiertas para evitar que la salud baje demasiado.
                </div>
                <div>
                  <strong>¿Puedo reiniciar el juego?</strong><br />
                  Usa el botón de reinicio en el menú de estadísticas.
                </div>
              </div>
              <div className="mt-6 p-3 rounded-lg bg-pink-50 border border-pink-200 text-xs text-pink-700 flex flex-col gap-2">
                <strong>Nota especial:</strong> Esta versión es una actualización de uno de mis primeros proyectos como programador.<br />
                <span className="flex items-center gap-1">
                  <Gamepad2 size={16} className="text-pink-500" />
                  aún puedes jugarlo en
                  <a href="https://kirby-tamagoshi-classic.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline text-pink-500 font-semibold">kirby-tamagoshi-classic</a>
                </span>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        </>
    );
}