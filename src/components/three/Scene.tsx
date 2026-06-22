'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({
  position,
  geometry,
  color,
  speed,
  rotationSpeed,
}: {
  position: [number, number, number];
  geometry: 'icosahedron' | 'torus' | 'octahedron' | 'tetrahedron';
  color: string;
  speed: number;
  rotationSpeed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
    meshRef.current.rotation.y += delta * rotationSpeed;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'icosahedron': return new THREE.IcosahedronGeometry(1, 0);
      case 'torus': return new THREE.TorusGeometry(0.8, 0.25, 8, 16);
      case 'octahedron': return new THREE.OctahedronGeometry(1);
      case 'tetrahedron': return new THREE.TetrahedronGeometry(1);
    }
  }, [geometry]);

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} geometry={geo}>
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

const shapes = [
  { position: [-4, 2, -3] as [number, number, number], geometry: 'icosahedron' as const, color: '#6366f1', speed: 1.5, rotationSpeed: 0.3 },
  { position: [4, -1, -4] as [number, number, number], geometry: 'torus' as const, color: '#22d3ee', speed: 2, rotationSpeed: 0.5 },
  { position: [-2, -3, -2] as [number, number, number], geometry: 'octahedron' as const, color: '#8b5cf6', speed: 1.2, rotationSpeed: 0.4 },
  { position: [3, 3, -5] as [number, number, number], geometry: 'tetrahedron' as const, color: '#6366f1', speed: 1.8, rotationSpeed: 0.2 },
  { position: [0, -2, -6] as [number, number, number], geometry: 'icosahedron' as const, color: '#22d3ee', speed: 1.3, rotationSpeed: 0.6 },
  { position: [-5, 0, -5] as [number, number, number], geometry: 'torus' as const, color: '#8b5cf6', speed: 2.2, rotationSpeed: 0.35 },
];

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#ffffff" />
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
      <CameraRig />
    </Canvas>
  );
}
