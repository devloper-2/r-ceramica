"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Faucet-like geometric model ───────────────────────────── */
function FaucetModel({ finish = "chrome" }: { finish?: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  const metalColor = {
    chrome:      "#e8e8e8",
    "gold-pvd":  "#c5a059",
    "black-matt":"#1a1a1a",
    "black-chrome":"#2a2a2a",
    "blush-gold":"#b8896a",
  }[finish] ?? "#e8e8e8";

  const roughness = finish === "black-matt" ? 0.8 : 0.05;
  const metalness = finish === "black-matt" ? 0.4 : 0.95;

  return (
    <group ref={groupRef}>
      {/* Base plate */}
      <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.38, 0.1, 32]} />
        <meshStandardMaterial color={metalColor} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Main body stem */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 1.4, 32]} />
        <meshStandardMaterial color={metalColor} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Shoulder junction */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color={metalColor} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Spout arm */}
      <mesh position={[0.35, 0.32, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.7, 24]} />
        <meshStandardMaterial color={metalColor} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Spout tip aerator */}
      <mesh position={[0.72, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.07, 0.18, 24]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Handle */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 24]} />
        <meshStandardMaterial color={metalColor} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Handle knob */}
      <mesh position={[0, 0.98, 0]} castShadow>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color={metalColor} roughness={0.2} metalness={metalness} />
      </mesh>
    </group>
  );
}

function AutoRotate({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return <group ref={ref}>{children}</group>;
}

/* ── Public component ───────────────────────────────────────── */
export default function ProductViewer3D({
  finish = "chrome",
  autoRotate = true,
}: {
  finish?: string;
  autoRotate?: boolean;
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [3, 1.5, 3], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow
        shadow-mapSize={[2048, 2048]} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Float speed={autoRotate ? 0 : 1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          {autoRotate ? (
            <AutoRotate>
              <FaucetModel finish={finish} />
            </AutoRotate>
          ) : (
            <FaucetModel finish={finish} />
          )}
        </Float>
        <ContactShadows position={[0, -1.3, 0]} opacity={0.4} scale={4} blur={2} far={2} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={autoRotate}
        autoRotateSpeed={1.5}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
}
