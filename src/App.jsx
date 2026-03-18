import { Suspense } from "react";
import { Loader, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AssetsPreload, Experience, UI } from "./components";

// import Preloader from "./components/Preloader";

function App() {
  return (
    <>
      <Loader />
      <Canvas shadows camera={{ position: [1, 6, 12], fov: 50 }}>
        <fog attach="fog" args={["#574f5e", 8, 22]} />
        <color attach="background" args={["#574f5e"]} />
        <Stats />
        <AssetsPreload />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <UI />
    </>
  );
}

export default App;
