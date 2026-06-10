import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AICore3D from "./AICore3D";

function HeroCanvas() {
  return (
    <div
      style={{
        width: "923px",
height: "993px",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.7} />

       <pointLight
  position={[0, 0, 0]}
  intensity={60}
  color="#60A5FA"
/>

        <pointLight
          position={[-5, -5, -5]}
          intensity={20}
          color="#2563EB"
        />

        <AICore3D />

        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableZoom={false}
        />
      </Canvas>
    </div>
  );
}

export default HeroCanvas;