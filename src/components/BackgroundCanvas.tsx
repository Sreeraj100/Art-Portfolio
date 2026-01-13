'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
    const ref = useRef<THREE.Points>(null!);
    const { mouse } = useThree();

    // Generate random particles
    const { positions, originalPositions } = useMemo(() => {
        const count = 3000;
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;
        }
        return { positions, originalPositions };
    }, []);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Organic rotation
        ref.current.rotation.x -= delta / 80;
        ref.current.rotation.y -= delta / 100;

        const positionsArray = ref.current.geometry.attributes.position.array as Float32Array;

        // Subtle breathing/floating effect per particle
        for (let i = 0; i < 3000; i++) {
            const i3 = i * 3;
            const x = originalPositions[i3];
            const y = originalPositions[i3 + 1];

            // Add sine wave motion based on time
            positionsArray[i3 + 1] = y + Math.sin(state.clock.elapsedTime * 0.5 + x) * 0.2;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;

        // Mouse Parallax (Ease towards mouse)
        const targetX = mouse.x * 0.5;
        const targetY = mouse.y * 0.5;
        ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.02;
        ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.02;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export default function BackgroundCanvas() {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            opacity: 0.6 // Subtle background
        }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]} // Optimize for high DPI screens
            >
                <ParticleField />
            </Canvas>
        </div>
    );
}
