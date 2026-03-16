import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

const STAR_COUNT = 600;
const SPHERE_RADIUS = 50;
const ROTATION_SPEED = 0.00015;
const STAR_SIZE = 0.12;

// ---------------------------------------------------
// Stars mesh — renders all particles as a single Points object
// ---------------------------------------------------

function Stars() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions distributed inside a sphere
  const positions = useMemo(() => {
    const positionArray = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      const index = i * 3;

      // Uniform distribution inside a sphere using rejection sampling
      let x: number;
      let y: number;
      let z: number;

      do {
        x = (Math.random() - 0.5) * 2;
        y = (Math.random() - 0.5) * 2;
        z = (Math.random() - 0.5) * 2;
      } while (x * x + y * y + z * z > 1);

      positionArray[index] = x * SPHERE_RADIUS;
      positionArray[index + 1] = y * SPHERE_RADIUS;
      positionArray[index + 2] = z * SPHERE_RADIUS;
    }

    return positionArray;
  }, []);

  // Slow rotation every frame
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += ROTATION_SPEED;
      pointsRef.current.rotation.x += ROTATION_SPEED * 0.3;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={STAR_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={STAR_SIZE}
        color="#d4a853"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ---------------------------------------------------
// Canvas wrapper — default export for React.lazy
// ---------------------------------------------------

export default function ParticleStarsCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
    >
      <Stars />
    </Canvas>
  );
}

