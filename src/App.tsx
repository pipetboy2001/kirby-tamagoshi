import { Toaster } from "@/components/ui/sonner";
import ConfigDialog from "./components/ConfigDialog";
import { FrecuentsQuestion } from "./components/FrecuentsQuestion";
import Tamagotchi from "./components/tamagotchi/Tamagotchi";

function App() {
  return (
    <div className="relative flex h-[100dvh] min-h-[100dvh] w-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100">
      <Toaster />
      <ConfigDialog />
      <FrecuentsQuestion />
      <Tamagotchi />
    </div>
  );
}

export default App;
