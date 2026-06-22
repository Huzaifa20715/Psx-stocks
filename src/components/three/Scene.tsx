'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[-2.5, 0.5, -1]}>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          emissive="#6366f1"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  )
}

function FloatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.05
  })

  return (
    <Float speed={1.0} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[2.5, -0.5, -2]}>
        <torusKnotGeometry args={[0.7, 0.22, 100, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={2.0} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[0.5, 1.5, -3]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[-1.0, -1.8, -1.5]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          opacity={0.7}
          transparent
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 120
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[-3, 3, 2]} color="#6366f1" intensity={3} />
        <pointLight position={[3, -3, 2]} color="#22d3ee" intensity={3} />
        <pointLight position={[0, 0, 4]} color="#ffffff" intensity={0.5} />

        <FloatingIcosahedron />
        <FloatingTorusKnot />
        <FloatingOctahedron />
        <FloatingSphere />
        <Particles />
      </Canvas>
    </div>
  )
}
