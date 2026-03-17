import {useMemo, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {generatePositions, ROTATION_SPEED, STAR_COUNT, STAR_SIZE} from './ParticleStars.constants';

// ---------------------------------------------------
// Stars mesh — renders all particles as a single Points object
// ---------------------------------------------------

function Stars() {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => generatePositions(), []);

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
            camera={{position: [0, 0, 1], fov: 60}}
            style={{background: 'transparent'}}
            gl={{alpha: true, antialias: false}}
            dpr={[1, 1.5]}
        >
            <Stars/>
        </Canvas>
    );
}

