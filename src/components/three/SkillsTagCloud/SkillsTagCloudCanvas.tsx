import { useRef, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

const SPHERE_RADIUS = 4;
const AUTO_ROTATION_SPEED = 0.002;
const DRAG_SENSITIVITY = 0.008;
const INERTIA_DAMPING = 0.95;

// Colors matching the mana palette — cycled across tags
const TAG_COLORS = [
  '#60a5fa', // blue
  '#f87171', // red
  '#4ade80', // green
  '#a78bfa', // purple
  '#d6d3d1', // white
  '#d4a853', // gold
];

// ---------------------------------------------------
// Distribute points evenly on a sphere (Fibonacci sphere)
// ---------------------------------------------------

function fibonacciSpherePoints(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    // y goes from 1 to -1
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }

  return points;
}

// ---------------------------------------------------
// Single tag label — uses Html inside Billboard for reliable rendering
// ---------------------------------------------------

interface TagLabelProps {
  text: string;
  position: THREE.Vector3;
  color: string;
}

function TagLabel({ text, position, color }: TagLabelProps) {
  return (
    <Billboard position={position}>
      <Html
        center
        distanceFactor={8}
        style={{
          color,
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          textShadow: '0 0 8px rgba(0,0,0,0.3)',
        }}
      >
        {text}
      </Html>
    </Billboard>
  );
}

// ---------------------------------------------------
// Rotating sphere group with drag-to-rotate interaction
//
// - Auto-rotates slowly when idle
// - Click & drag to spin the sphere in any direction
// - Releases with inertia (velocity decays smoothly)
// ---------------------------------------------------

interface RotatingCloudProps {
  skillNames: string[];
}

function RotatingCloud({ skillNames }: RotatingCloudProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  // Drag state stored in refs to avoid re-renders every frame
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // Calculate sphere positions for each skill
  const positions = useMemo(() => {
    return fibonacciSpherePoints(skillNames.length, SPHERE_RADIUS);
  }, [skillNames.length]);

  // --- Pointer handlers ---

  const handlePointerDown = useCallback(
    (event: PointerEvent) => {
      isDragging.current = true;
      previousPointer.current = { x: event.clientX, y: event.clientY };

      // Capture pointer so we receive move/up events even outside the canvas
      gl.domElement.setPointerCapture(event.pointerId);
    },
    [gl.domElement],
  );

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (!isDragging.current) return;

    const deltaX = event.clientX - previousPointer.current.x;
    const deltaY = event.clientY - previousPointer.current.y;

    // Store velocity for inertia when released
    velocity.current = {
      x: deltaX * DRAG_SENSITIVITY,
      y: deltaY * DRAG_SENSITIVITY,
    };

    previousPointer.current = { x: event.clientX, y: event.clientY };
  }, []);

  const handlePointerUp = useCallback(
    (event: PointerEvent) => {
      isDragging.current = false;
      gl.domElement.releasePointerCapture(event.pointerId);
    },
    [gl.domElement],
  );

  // Attach/detach native pointer events on the canvas DOM element
  // (using R3F's gl.domElement for reliable capture outside the canvas)
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [gl.domElement, handlePointerDown, handlePointerMove, handlePointerUp]);

  // Rotate the group each frame
  useFrame(() => {
    if (!groupRef.current) return;

    if (isDragging.current) {
      // Apply drag velocity directly
      groupRef.current.rotation.y += velocity.current.x;
      groupRef.current.rotation.x += velocity.current.y;
    } else {
      // Apply inertia: velocity decays over time
      velocity.current.x *= INERTIA_DAMPING;
      velocity.current.y *= INERTIA_DAMPING;

      groupRef.current.rotation.y += velocity.current.x + AUTO_ROTATION_SPEED;
      groupRef.current.rotation.x += velocity.current.y;
    }
  });

  return (
    <group ref={groupRef}>
      {skillNames.map((name, index) => (
        <TagLabel
          key={name}
          text={name}
          position={positions[index]}
          color={TAG_COLORS[index % TAG_COLORS.length]}
        />
      ))}
    </group>
  );
}

// ---------------------------------------------------
// Canvas wrapper — default export for React.lazy
// ---------------------------------------------------

interface SkillsTagCloudCanvasProps {
  skillNames: string[];
}

export default function SkillsTagCloudCanvas({ skillNames }: SkillsTagCloudCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.8} />
      <RotatingCloud skillNames={skillNames} />
    </Canvas>
  );
}


