import Tamagotchi from "./components/tamagotchi/Tamagotchi";
import ConfigDialog from "./components/ConfigDialog";

function App() {
  return (
    <div className="min-h-[100dvh] h-[100dvh] w-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 relative">
      <ConfigDialog />
      <Tamagotchi />
    </div>
  );
}

export default App;