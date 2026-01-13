'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ENHANCED PARTICLE FIELD
 * World-class visual effects with:
 * - Dynamic particle waves
 * - Mouse interaction
 * - Depth-based opacity
 * - Smooth animations
 */

function ParticleWaves() {
    const ref = useRef<THREE.Points>(null!);
    const { mouse, viewport } = useThree();

    // Generate particles in a wave pattern
    const { positions, colors } = useMemo(() => {
        const count = 4000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Create layered depth
            const x = (Math.random() - 0.5) * 25;
            const y = (Math.random() - 0.5) * 25;
            const z = (Math.random() - 0.5) * 15;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            // Color variation (white to light gray)
            const brightness = 0.8 + Math.random() * 0.2;
            colors[i3] = brightness;
            colors[i3 + 1] = brightness;
            colors[i3 + 2] = brightness;
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (!ref.current) return;

        const time = state.clock.elapsedTime;
        const positionsArray = ref.current.geometry.attributes.position.array as Float32Array;

        // Animate particles with wave motion
        for (let i = 0; i < 4000; i++) {
            const i3 = i * 3;
            const x = positionsArray[i3];
            const z = positionsArray[i3 + 2];

            // Create flowing wave effect
            positionsArray[i3 + 1] += Math.sin(time * 0.3 + x * 0.3 + z * 0.2) * 0.003;
        }

        ref.current.geometry.attributes.position.needsUpdate = true;

        // Smooth mouse parallax
        const targetX = mouse.x * viewport.width * 0.1;
        const targetY = mouse.y * viewport.height * 0.1;

        ref.current.rotation.x += (targetY * 0.05 - ref.current.rotation.x) * 0.05;
        ref.current.rotation.y += (targetX * 0.05 - ref.current.rotation.y) * 0.05;

        // Gentle continuous rotation
        ref.current.rotation.z = time * 0.02;
    });

    return (
        <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

/**
 * FLOATING ORBS
 * Adds depth and visual interest
 */
function FloatingOrbs() {
    const orbs = useMemo(() => [
        { position: [-8, 4, -5], scale: 1.5, speed: 0.5 },
        { position: [8, -3, -8], scale: 1.2, speed: 0.7 },
        { position: [-5, -5, -6], scale: 1, speed: 0.6 },
        { position: [6, 5, -7], scale: 1.3, speed: 0.4 },
    ], []);

    return (
        <>
            {orbs.map((orb, index) => (
                <FloatingOrb key={index} {...orb} index={index} />
            ))}
        </>
    );
}

function FloatingOrb({ position, scale, speed, index }: any) {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.elapsedTime;

        // Floating motion
        ref.current.position.y = position[1] + Math.sin(time * speed + index) * 0.5;
        ref.current.position.x = position[0] + Math.cos(time * speed * 0.5 + index) * 0.3;
    });

    return (
        <Sphere ref={ref} args={[scale, 32, 32]} position={position as [number, number, number]}>
            <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.03}
                blending={THREE.AdditiveBlending}
            />
        </Sphere>
    );
}

/**
 * BACKGROUND CANVAS
 * Responsive, performant Three.js scene
 */
export default function BackgroundCanvas() {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
        }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 75 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <ParticleWaves />
                <FloatingOrbs />
            </Canvas>
        </div>
    );
}
