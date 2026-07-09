import { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Palette ─────────────────────────────────────────────────── */
const DARK_TILE   = "#1c2333";   // deep slate-navy wall tile
const DARK_TILE_2 = "#161b28";   // alternating darker strip
const FLOOR_COLOR = "#e8e4dc";   // large-format cream marble floor
const FLOOR_VEIN  = "#d4cfc6";   // subtle veining
const CHROME      = "#d8d8d8";
const CHROME_DARK = "#b0b0b0";
const CERAMIC_W   = "#f5f5f3";   // pure white ceramic
const VANITY_DARK = "#111418";   // dark cabinet
const GOLD_ACC    = "#c5a059";   // brand gold accents
const GLASS_COL   = "#8ab0c0";
const LED_WARM    = "#fff3cc";   // warm LED strip colour

/* ── Luxury Wall with Vertical Tile Ridges ───────────────────── */
function LuxuryWall({
  width, height, position, rotation = [0, 0, 0], receiveShadow = true,
}: {
  width: number; height: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  receiveShadow?: boolean;
}) {
  const stripeCount = Math.floor(width / 0.06);
  const stripes = useMemo(() => Array.from({ length: stripeCount }, (_, i) => i), [stripeCount]);

  return (
    <group position={position} rotation={rotation as any}>
      {/* Base wall */}
      <mesh receiveShadow={receiveShadow}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={DARK_TILE} roughness={0.18} metalness={0.12} />
      </mesh>

      {/* Vertical tile ridges */}
      {stripes.map((i) => (
        <mesh key={i} position={[(i - stripeCount / 2 + 0.5) * 0.06, 0, 0.004]}>
          <boxGeometry args={[0.025, height, 0.006]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? DARK_TILE : DARK_TILE_2}
            roughness={0.1} metalness={0.2}
          />
        </mesh>
      ))}

      {/* Skirting chrome strip at bottom */}
      <mesh position={[0, -height / 2 + 0.02, 0.01]}>
        <boxGeometry args={[width, 0.04, 0.015]} />
        <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.05} />
      </mesh>
    </group>
  );
}

/* ── Marble Floor ────────────────────────────────────────────── */
function MarbleFloor({ width, depth }: { width: number; depth: number }) {
  const tilesX = Math.floor(width / 1.2);
  const tilesZ = Math.floor(depth / 1.2);
  const tiles = useMemo(() => {
    const arr = [];
    for (let x = 0; x < tilesX; x++) {
      for (let z = 0; z < tilesZ; z++) {
        arr.push([x, z]);
      }
    }
    return arr;
  }, [tilesX, tilesZ]);

  return (
    <group>
      {/* Base floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={FLOOR_COLOR} roughness={0.08} metalness={0.05} />
      </mesh>
      {/* Large-format tile grid lines */}
      {tiles.map(([x, z]) => (
        <mesh key={`${x}-${z}`} rotation={[-Math.PI / 2, 0, 0]}
          position={[(x - tilesX / 2 + 0.5) * 1.2, 0.001, (z - tilesZ / 2 + 0.5) * 1.2]}>
          <planeGeometry args={[1.18, 1.18]} />
          <meshStandardMaterial
            color={(x + z) % 2 === 0 ? FLOOR_COLOR : FLOOR_VEIN}
            roughness={0.06} metalness={0.08}
          />
        </mesh>
      ))}
      {/* Floor grout lines */}
      {tiles.map(([x, z]) => (
        <mesh key={`grout-${x}-${z}`} rotation={[-Math.PI / 2, 0, 0]}
          position={[(x - tilesX / 2 + 0.5) * 1.2, 0.0005, (z - tilesZ / 2 + 0.5) * 1.2]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshStandardMaterial color="#c8c3bc" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ── LED Cove Ceiling Strip ──────────────────────────────────── */
function CoveLighting({ width, depth, height }: { width: number; depth: number; height: number }) {
  const inset = 0.3;
  const strips = [
    { pos: [0, height - 0.01, -depth / 2 + inset] as [number, number, number], rot: [Math.PI / 2, 0, 0] as [number, number, number], w: width - inset * 2, h: 0.05 },
    { pos: [0, height - 0.01, depth / 2 - inset]  as [number, number, number], rot: [Math.PI / 2, 0, 0] as [number, number, number], w: width - inset * 2, h: 0.05 },
    { pos: [-width / 2 + inset, height - 0.01, 0] as [number, number, number], rot: [Math.PI / 2, 0, Math.PI / 2] as [number, number, number], w: depth - inset * 2, h: 0.05 },
    { pos: [width / 2 - inset, height - 0.01, 0]  as [number, number, number], rot: [Math.PI / 2, 0, Math.PI / 2] as [number, number, number], w: depth - inset * 2, h: 0.05 },
  ];
  return (
    <group>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* LED strips — emissive */}
      {strips.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot}>
          <planeGeometry args={[s.w, s.h]} />
          <meshStandardMaterial color={LED_WARM} emissive={LED_WARM} emissiveIntensity={2.5} />
        </mesh>
      ))}
      {/* Invisible rect lights approximation via point lights */}
      <pointLight position={[0, height - 0.1, -depth / 2 + inset]} intensity={0.8} color={LED_WARM} distance={6} decay={2} />
      <pointLight position={[0, height - 0.1, depth / 2 - inset]}  intensity={0.8} color={LED_WARM} distance={6} decay={2} />
      <pointLight position={[-width / 2 + inset, height - 0.1, 0]} intensity={0.6} color={LED_WARM} distance={5} decay={2} />
      <pointLight position={[width / 2 - inset, height - 0.1, 0]}  intensity={0.6} color={LED_WARM} distance={5} decay={2} />
    </group>
  );
}

/* ── Freestanding Oval Bathtub ───────────────────────────────── */
function LuxuryBathtub({ position }: { position: [number, number, number] }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const r = t < 0.5
        ? 0.02 + t * 0.4           // sides curve out
        : 0.02 + (1 - t) * 0.4;    // sides curve back
      pts.push(new THREE.Vector2(r, (t - 0.5) * 1.5));
    }
    return pts;
  }, []);

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Outer shell */}
      <mesh castShadow>
        <latheGeometry args={[points, 64]} />
        <meshStandardMaterial color={CERAMIC_W} roughness={0.04} metalness={0.0} side={THREE.DoubleSide} />
      </mesh>

      {/* Tub base platform */}
      <mesh position={[0, -0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.52, 0.08, 64]} />
        <meshStandardMaterial color="#e0ddd8" roughness={0.3} />
      </mesh>

      {/* Floor spout / drain */}
      <mesh position={[0, -0.71, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, -0.5, 0.3]}>
        <cylinderGeometry args={[0.06, 0.05, 0.04, 16]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Shelf behind tub */}
      <mesh position={[0, 0.1, -0.55]} castShadow>
        <boxGeometry args={[1.0, 0.04, 0.15]} />
        <meshStandardMaterial color="#d8d4cc" roughness={0.2} />
      </mesh>
      {/* Decorative plants (sphere stand-in) */}
      <mesh position={[-0.3, 0.22, -0.55]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#3a5a3a" roughness={0.8} />
      </mesh>
      <mesh position={[0.3, 0.19, -0.55]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#4a6a4a" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ── Floating Vanity with Double Basin ───────────────────────── */
function FloatingVanity({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Cabinet body */}
      <mesh castShadow position={[0, 0.44, 0]}>
        <boxGeometry args={[1.6, 0.72, 0.48]} />
        <meshStandardMaterial color={VANITY_DARK} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Wall bracket (shadow gap illusion) */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.56, 0.04, 0.44]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>

      {/* Countertop */}
      <mesh castShadow position={[0, 0.82, 0]}>
        <boxGeometry args={[1.64, 0.04, 0.52]} />
        <meshStandardMaterial color={CERAMIC_W} roughness={0.05} metalness={0.02} />
      </mesh>

      {/* Basin Left */}
      <mesh castShadow position={[-0.45, 0.88, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 0.1, 32]} />
        <meshStandardMaterial color={CERAMIC_W} roughness={0.04} side={THREE.DoubleSide} />
      </mesh>
      {/* Faucet left */}
      <mesh castShadow position={[-0.45, 1.02, -0.14]}>
        <cylinderGeometry args={[0.02, 0.025, 0.2, 16]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh castShadow position={[-0.38, 1.0, -0.04]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.012, 0.012, 0.22, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Basin Right */}
      <mesh castShadow position={[0.45, 0.88, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 0.1, 32]} />
        <meshStandardMaterial color={CERAMIC_W} roughness={0.04} side={THREE.DoubleSide} />
      </mesh>
      {/* Faucet right */}
      <mesh castShadow position={[0.45, 1.02, -0.14]}>
        <cylinderGeometry args={[0.02, 0.025, 0.2, 16]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh castShadow position={[0.52, 1.0, -0.04]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.012, 0.012, 0.22, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Mirror */}
      <mesh position={[0, 1.55, -0.235]}>
        <boxGeometry args={[1.5, 0.9, 0.018]} />
        <meshStandardMaterial color="#6090a8" metalness={0.9} roughness={0.02} />
      </mesh>
      {/* Mirror frame chrome */}
      <mesh position={[0, 1.55, -0.228]}>
        <boxGeometry args={[1.54, 0.94, 0.01]} />
        <meshStandardMaterial color={CHROME_DARK} metalness={0.85} roughness={0.1} />
      </mesh>

      {/* Under-cabinet LED */}
      <mesh position={[0, 0.82, 0.22]}>
        <boxGeometry args={[1.55, 0.01, 0.01]} />
        <meshStandardMaterial color={LED_WARM} emissive={LED_WARM} emissiveIntensity={3} />
      </mesh>

      {/* Open shelf in cabinet */}
      <mesh position={[0, 0.44, 0.22]} castShadow>
        <boxGeometry args={[1.58, 0.01, 0.06]} />
        <meshStandardMaterial color="#1a1e24" roughness={0.3} />
      </mesh>
      {/* Towels on shelf */}
      {[-0.4, 0, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.44, 0.24]} castShadow>
          <boxGeometry args={[0.28, 0.06, 0.04]} />
          <meshStandardMaterial color="#f0f0ee" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Frameless Glass Shower ──────────────────────────────────── */
function GlassShower({ position }: { position: [number, number, number] }) {
  const h = 2.5;
  const glassProps = {
    color: GLASS_COL, transparent: true, opacity: 0.12,
    roughness: 0.0, metalness: 0.05,
    side: THREE.DoubleSide,
  };
  return (
    <group position={position}>
      {/* Tray */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[1.1, 0.1, 1.1]} />
        <meshStandardMaterial color="#d8d5d0" roughness={0.3} />
      </mesh>
      {/* Tray inner surface */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[1.06, 0.005, 1.06]} />
        <meshStandardMaterial color="#c8c5bf" roughness={0.2} />
      </mesh>

      {/* Glass side panels */}
      <mesh position={[0.55, h / 2 + 0.1, 0]} castShadow>
        <boxGeometry args={[0.012, h, 1.1]} />
        <meshStandardMaterial {...glassProps} />
      </mesh>
      <mesh position={[0, h / 2 + 0.1, -0.55]} castShadow>
        <boxGeometry args={[1.1, h, 0.012]} />
        <meshStandardMaterial {...glassProps} />
      </mesh>

      {/* Glass door (slight angle) */}
      <mesh position={[-0.3, h / 2 + 0.1, 0.55]} rotation={[0, -0.15, 0]} castShadow>
        <boxGeometry args={[0.5, h, 0.012]} />
        <meshStandardMaterial {...glassProps} />
      </mesh>

      {/* Chrome edge profiles */}
      {[
        { pos: [0.55, h / 2 + 0.1, -0.55] as [number,number,number], rot: [0,0,0] as [number,number,number], args: [0.02, h, 0.02] as [number,number,number] },
        { pos: [0.55, h / 2 + 0.1, 0.55]  as [number,number,number], rot: [0,0,0] as [number,number,number], args: [0.02, h, 0.02] as [number,number,number] },
        { pos: [-0.55, h / 2 + 0.1, -0.55] as [number,number,number], rot: [0,0,0] as [number,number,number], args: [0.02, h, 0.02] as [number,number,number] },
      ].map((p, i) => (
        <mesh key={i} position={p.pos} rotation={p.rot} castShadow>
          <boxGeometry args={p.args} />
          <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.05} />
        </mesh>
      ))}

      {/* Rainfall shower head */}
      <mesh position={[0, h + 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 48]} />
        <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.08} />
      </mesh>
      {/* Shower arm */}
      <mesh position={[0.3, h + 0.06, -0.42]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.5, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.05} />
      </mesh>

      {/* Body jet */}
      <mesh position={[0.52, 1.2, -0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
        <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.08} />
      </mesh>

      {/* Controls panel */}
      <mesh position={[0.52, 1.6, -0.2]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.16, 0.22, 0.04]} />
        <meshStandardMaterial color={VANITY_DARK} roughness={0.3} />
      </mesh>
      <mesh position={[0.545, 1.62, -0.2]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
        <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Niche shelf */}
      <mesh position={[-0.52, 1.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.18, 0.12]} />
        <meshStandardMaterial color={DARK_TILE} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[-0.46, 1.4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.38, 0.14, 0.01]} />
        <meshStandardMaterial color={CHROME} metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

/* ── Water Closet Luxury ─────────────────────────────────────── */
function LuxuryWC({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Wall-hung base */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[0.38, 0.35, 0.58]} />
        <meshStandardMaterial color={CERAMIC_W} roughness={0.04} metalness={0.0} />
      </mesh>
      {/* Rounded front */}
      <mesh castShadow position={[0, 0.5, 0.2]}>
        <cylinderGeometry args={[0.19, 0.19, 0.35, 32, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={CERAMIC_W} roughness={0.04} />
      </mesh>
      {/* Seat */}
      <mesh castShadow position={[0, 0.69, 0.05]}>
        <boxGeometry args={[0.35, 0.03, 0.5]} />
        <meshStandardMaterial color="#eeeeec" roughness={0.1} />
      </mesh>
      {/* Soft close lid */}
      <mesh castShadow position={[0, 0.72, -0.15]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.36, 0.02, 0.28]} />
        <meshStandardMaterial color={CERAMIC_W} roughness={0.04} />
      </mesh>
      {/* Concealed tank in wall */}
      <mesh castShadow position={[0, 1.1, -0.25]}>
        <boxGeometry args={[0.36, 0.4, 0.12]} />
        <meshStandardMaterial color={DARK_TILE_2} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Flush plate */}
      <mesh position={[0, 1.12, -0.2]}>
        <boxGeometry args={[0.22, 0.12, 0.015]} />
        <meshStandardMaterial color={CHROME} metalness={0.88} roughness={0.06} />
      </mesh>
      {/* Flush buttons */}
      <mesh position={[-0.04, 1.12, -0.195]}>
        <cylinderGeometry args={[0.028, 0.028, 0.01, 16]} />
        <meshStandardMaterial color={CERAMIC_W} roughness={0.1} />
      </mesh>
      <mesh position={[0.05, 1.12, -0.195]}>
        <cylinderGeometry args={[0.038, 0.038, 0.01, 16]} />
        <meshStandardMaterial color={CERAMIC_W} roughness={0.1} />
      </mesh>
      {/* Chrome wall rail */}
      <mesh castShadow position={[0.3, 0.7, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.44, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.05} />
      </mesh>
    </group>
  );
}

/* ── Towel Warmer Rail ───────────────────────────────────────── */
function TowelWarmer({ position }: { position: [number, number, number] }) {
  const rails = [-0.25, -0.05, 0.15, 0.35];
  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Side arms */}
      <mesh castShadow position={[-0.35, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.06, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.05} />
      </mesh>
      <mesh castShadow position={[0.35, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.06, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.05} />
      </mesh>
      {/* Vertical frame */}
      <mesh castShadow position={[-0.35, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.75, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.05} />
      </mesh>
      <mesh castShadow position={[0.35, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.75, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.05} />
      </mesh>
      {/* Horizontal rails */}
      {rails.map((y) => (
        <mesh key={y} castShadow position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 12]} />
          <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.05} />
        </mesh>
      ))}
      {/* Towel on middle rail */}
      <mesh castShadow position={[0, -0.05, 0.04]}>
        <boxGeometry args={[0.6, 0.04, 0.24]} />
        <meshStandardMaterial color="#f0eeec" roughness={0.9} />
      </mesh>
      {/* Warm glow from heated rail */}
      <pointLight position={[0, 0, 0.1]} intensity={0.15} color="#ffddaa" distance={1.2} decay={2} />
    </group>
  );
}

/* ── Luxury Bathroom Room ────────────────────────────────────── */
function LuxuryRoom({ fixtures }: { fixtures: Set<string> }) {
  const W = 5.5, H = 3.2, D = 5.0;

  return (
    <group>
      <MarbleFloor width={W} depth={D} />
      <CoveLighting width={W} depth={D} height={H} />

      {/* Back wall */}
      <LuxuryWall width={W} height={H} position={[0, H / 2, -D / 2]} />

      {/* Left wall */}
      <LuxuryWall width={D} height={H} position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]} />

      {/* Right wall partial (lighter to open space) */}
      <mesh position={[W / 2, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color={DARK_TILE} roughness={0.3} metalness={0.08} />
      </mesh>

      {/* Accent chrome wall strip (back wall centrepiece) */}
      <mesh position={[0, H / 2, -D / 2 + 0.02]}>
        <boxGeometry args={[0.04, H, 0.015]} />
        <meshStandardMaterial color={CHROME} metalness={0.88} roughness={0.1} />
      </mesh>

      {/* Fixtures */}
      {fixtures.has("bathtub") && <LuxuryBathtub position={[-1.4, 0, 0.6]} />}
      {fixtures.has("vanity")  && <FloatingVanity position={[0.6, 0.08, -2.1]} />}
      {fixtures.has("shower")  && <GlassShower    position={[1.9, 0, 0.8]} />}
      {fixtures.has("toilet")  && <LuxuryWC       position={[-2.0, 0, -1.8]} />}
      {fixtures.has("towel")   && <TowelWarmer     position={[-2.3, 1.3, -0.6]} />}
    </group>
  );
}

/* ── Config panel options ────────────────────────────────────── */
const FIXTURE_OPTIONS = [
  { id: "bathtub", label: "Freestanding Bathtub", sub: "Oval stone-resin",  icon: "🛁" },
  { id: "vanity",  label: "Floating Double Vanity",sub: "With mirrors",    icon: "🪞" },
  { id: "shower",  label: "Frameless Glass Shower",sub: "Rain + body jets", icon: "🚿" },
  { id: "toilet",  label: "Wall-Hung WC",          sub: "Concealed cistern",icon: "🚽" },
  { id: "towel",   label: "Heated Towel Rail",     sub: "Chrome finish",   icon: "🏷️" },
] as const;

/* ── Public component ───────────────────────────────────────── */
export default function BathroomVisualizer3D() {
  const [fixtures, setFixtures] = useState<Set<string>>(
    new Set(["bathtub", "vanity", "shower", "toilet"])
  );

  function toggleFixture(id: string) {
    setFixtures((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[620px]">

      {/* ── 3D Canvas ── */}
      <div className="flex-1 relative">
        <Canvas
          shadows="soft"
          camera={{ position: [6.5, 4.5, 6.5], fov: 36 }}
          style={{ background: "transparent" }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        >
          {/* Base ambient */}
          <ambientLight intensity={0.18} color="#c8d8f0" />

          {/* Key light (simulates window from right) */}
          <directionalLight
            position={[6, 7, 3]} intensity={0.9} color="#fffaf0"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.1} shadow-camera-far={25}
            shadow-camera-left={-7} shadow-camera-right={7}
            shadow-camera-top={7} shadow-camera-bottom={-7}
            shadow-bias={-0.001}
          />
          {/* Fill light */}
          <directionalLight position={[-4, 3, 5]} intensity={0.25} color="#d0e8ff" />

          {/* Accent / rim */}
          <pointLight position={[0, 2.8, 2]} intensity={0.6} color="#fff5e0" distance={8} decay={2} />

          <Suspense fallback={null}>
            <LuxuryRoom fixtures={fixtures} />
          </Suspense>

          <OrbitControls
            enablePan
            minDistance={3.5}
            maxDistance={14}
            minPolarAngle={0.15}
            maxPolarAngle={Math.PI / 2.05}
            enableDamping
            dampingFactor={0.06}
            target={[0, 1.2, 0]}
          />
        </Canvas>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-white/20 pointer-events-none whitespace-nowrap">
          Drag to orbit · Scroll to zoom · Right-drag to pan
        </div>
      </div>

      {/* ── Fixture Panel ── */}
      <div className="lg:w-60 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col bg-[#0c0c0c]">
        <div className="px-5 py-5 border-b border-white/5">
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#c5a059] mb-1">Configure Room</p>
          <p className="text-[10px] text-white/30 leading-relaxed">Toggle fixtures to visualise your luxury space</p>
        </div>

        <div className="flex-1 px-4 py-5 space-y-2 overflow-y-auto">
          {FIXTURE_OPTIONS.map(({ id, label, sub, icon }) => {
            const active = fixtures.has(id);
            return (
              <button key={id} onClick={() => toggleFixture(id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 border transition-all duration-200 text-left group
                  ${active
                    ? "border-[#c5a059]/40 bg-[#c5a059]/5"
                    : "border-white/5 bg-white/[0.01] hover:border-white/10"
                  }`}
              >
                <span className="text-xl flex-shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-[9px] uppercase tracking-[0.2em] font-medium leading-tight ${active ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
                    {label}
                  </p>
                  <p className={`text-[8px] uppercase tracking-[0.15em] mt-0.5 ${active ? "text-[#c5a059]" : "text-white/20"}`}>
                    {active ? sub : "Hidden"}
                  </p>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${active ? "bg-[#c5a059]" : "bg-white/10"}`} />
              </button>
            );
          })}
        </div>

        <div className="px-5 py-4 border-t border-white/5">
          <p className="text-[8px] uppercase tracking-[0.15em] text-white/15 leading-relaxed">
            Visualisation guide only. Dimensions are indicative.
          </p>
        </div>
      </div>
    </div>
  );
}
