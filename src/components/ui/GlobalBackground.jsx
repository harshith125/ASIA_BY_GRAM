import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { useRef } from 'react';

const ParticleField = () => {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;
        const { x, y } = state.mouse;
        groupRef.current.rotation.x = y * 0.1;
        groupRef.current.rotation.y = x * 0.1;
    });

    return (
        <group ref={groupRef}>
            <Stars
                radius={100}
                depth={50}
                count={7000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
            <Sparkles
                count={100}
                scale={15}
                size={2}
                speed={0.3}
                opacity={0.3}
                color="#E6192E"
            />
            <Sparkles
                count={50}
                scale={20}
                size={4}
                speed={0.2}
                opacity={0.2}
                color="#FFC107"
            />
        </group>
    );
};

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-white pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                {/* Darker stars for visibility on white */}
                <Stars
                    radius={100}
                    depth={50}
                    count={3000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
                <ambientLight intensity={0.5} />
                {/* Gold sparkles */}
                <Sparkles
                    count={80}
                    scale={20}
                    size={6}
                    speed={0.4}
                    opacity={0.8}
                    color="#FFC107"
                />
                {/* Dark/Black sparkles for contrast */}
                <Sparkles
                    count={50}
                    scale={15}
                    size={4}
                    speed={0.2}
                    opacity={0.6}
                    color="#000000"
                />
                {/* White Fog to blend with background */}
                <fog attach="fog" args={['#ffffff', 5, 25]} />
            </Canvas>
        </div>
    );
};

export default GlobalBackground;
