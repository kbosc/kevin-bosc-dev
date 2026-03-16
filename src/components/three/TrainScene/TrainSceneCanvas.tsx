import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ---------------------------------------------------
// Constants — SNCF brand colors & dimensions
// ---------------------------------------------------

const SNCF_RED = '#cf0a2c';
const SNCF_DARK_RED = '#a00820';
const SNCF_GRAY = '#4a4a4a';
const SNCF_SILVER = '#c0c0c0';
const RAIL_COLOR = '#888888';

// Train starts off-screen left, crosses to off-screen right, then loops
const TRAIN_START_X = -20;
const TRAIN_END_X = 20;
const TRAIN_SPEED = 0.06;

// ---------------------------------------------------
// Low-poly locomotive built with primitive geometries
// ---------------------------------------------------

function Locomotive() {
  const groupRef = useRef<THREE.Group>(null);

  // Animate the train crossing automatically
  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.position.x += TRAIN_SPEED;

    // Loop: when train goes off-screen right, reset to left
    if (groupRef.current.position.x > TRAIN_END_X) {
      groupRef.current.position.x = TRAIN_START_X;
    }
  });

  return (
    <group ref={groupRef} position={[TRAIN_START_X, 0, 0]}>
      {/* --- Locomotive body --- */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[4, 1.8, 1.8]} />
        <meshStandardMaterial color={SNCF_RED} />
      </mesh>

      {/* --- Cabin (taller rear section) --- */}
      <mesh position={[1.6, 1.8, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.6]} />
        <meshStandardMaterial color={SNCF_DARK_RED} metalness={0.3} roughness={0.6} />
      </mesh>

      {/* --- Cabin window --- */}
      <mesh position={[1.6, 2.0, 0.81]}>
        <planeGeometry args={[0.8, 0.5]} />
        <meshStandardMaterial color="#87ceeb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* --- Chimney --- */}
      <mesh position={[-1.2, 2.4, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.8, 8]} />
        <meshStandardMaterial color={SNCF_GRAY} />
      </mesh>

      {/* --- Front nose --- */}
      <mesh position={[-2.3, 0.8, 0]}>
        <boxGeometry args={[0.6, 1.0, 1.6]} />
        <meshStandardMaterial color={SNCF_RED} />
      </mesh>

      {/* --- Headlight --- */}
      <mesh position={[-2.6, 1.2, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#ffdd44" emissive="#ffdd44" emissiveIntensity={0.8} />
      </mesh>

      {/* --- Wheels (locomotive) --- */}
      <AnimatedWheels />

      {/* --- Wagon 1 --- */}
      <Wagon positionX={5.5} />

      {/* --- Wagon 2 --- */}
      <Wagon positionX={9.5} />
    </group>
  );
}

// ---------------------------------------------------
// Animated wheels — rotate continuously
// ---------------------------------------------------

function AnimatedWheels() {
  const wheelsRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!wheelsRef.current) return;

    for (const child of wheelsRef.current.children) {
      child.rotation.z -= 0.08;
    }
  });

  const wheelPositions = [-1.3, -0.4, 0.4, 1.3];

  return (
    <group ref={wheelsRef}>
      {wheelPositions.map((x) => (
        <mesh key={x} position={[x, 0.05, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.15, 12]} />
          <meshStandardMaterial color={SNCF_GRAY} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------
// Passenger wagon
// ---------------------------------------------------

interface WagonProps {
  positionX: number;
}

function Wagon({ positionX }: WagonProps) {
  return (
    <group position={[positionX, 0, 0]}>
      {/* Wagon body */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[3.5, 1.5, 1.7]} />
        <meshStandardMaterial color={SNCF_SILVER} metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Windows */}
      {[-0.8, 0, 0.8].map((wx) => (
        <mesh key={wx} position={[wx, 1.3, 0.86]}>
          <planeGeometry args={[0.5, 0.4]} />
          <meshStandardMaterial color="#87ceeb" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Accent stripe */}
      <mesh position={[0, 0.55, 0.86]}>
        <planeGeometry args={[3.5, 0.12]} />
        <meshStandardMaterial color={SNCF_RED} />
      </mesh>

      {/* Wheels */}
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} position={[x, 0.1, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.12, 10]} />
          <meshStandardMaterial color={SNCF_GRAY} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------
// Rails — tracks + sleepers
// ---------------------------------------------------

function Rails() {
  const railLength = 60;

  const sleepers = useMemo(() => {
    const count = 40;
    const spacing = railLength / count;
    const result: number[] = [];

    for (let i = 0; i < count; i++) {
      result.push(-railLength / 2 + i * spacing);
    }

    return result;
  }, []);

  return (
    <group position={[0, -0.15, 0]}>
      {/* Left rail */}
      <mesh position={[0, 0, 0.7]}>
        <boxGeometry args={[railLength, 0.06, 0.08]} />
        <meshStandardMaterial color={RAIL_COLOR} metalness={0.8} />
      </mesh>

      {/* Right rail */}
      <mesh position={[0, 0, -0.7]}>
        <boxGeometry args={[railLength, 0.06, 0.08]} />
        <meshStandardMaterial color={RAIL_COLOR} metalness={0.8} />
      </mesh>

      {/* Sleepers (ties) */}
      {sleepers.map((x) => (
        <mesh key={x} position={[x, -0.05, 0]}>
          <boxGeometry args={[0.15, 0.06, 1.8]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------
// Canvas wrapper — default export for React.lazy
// ---------------------------------------------------

export default function TrainSceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 3.5, 10], fov: 40 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <pointLight position={[-5, 5, 3]} intensity={0.3} color="#d4a853" />

      <Rails />
      <Locomotive />
    </Canvas>
  );
}


