"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Performance detection
function usePerformanceLevel() {
  const [level, setLevel] = useState<"high" | "medium" | "low">("high");
  
  useEffect(() => {
    const isMobile = /(Android|iPhone|iPad|Mobile)/i.test(navigator.userAgent);
    const hasLowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    if (isMobile || hasLowCores) {
      setLevel("medium");
    }
  }, []);
  
  return level;
}

// Floating Particles
function Particles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, mouse } = useThree();
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * viewport.width * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    
    return [pos, vel];
  }, [count, viewport]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      positions[i3] += velocities[i3] + Math.sin(time * 0.2 + i * 0.1) * 0.001;
      positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.15 + i * 0.1) * 0.001;
      positions[i3 + 2] += velocities[i3 + 2];
      
      const dx = positions[i3] - mouse.x * viewport.width * 0.8;
      const dy = positions[i3 + 1] - mouse.y * viewport.height * 0.8;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        positions[i3] += dx * 0.02;
        positions[i3 + 1] += dy * 0.02;
      }
      
      const boundX = viewport.width * 2.5;
      const boundY = viewport.height * 2.5;
      
      if (positions[i3] > boundX) positions[i3] = -boundX;
      if (positions[i3] < -boundX) positions[i3] = boundX;
      if (positions[i3 + 1] > boundY) positions[i3 + 1] = -boundY;
      if (positions[i3 + 1] < -boundY) positions[i3 + 1] = boundY;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#10b981" transparent opacity={0.7} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

// Neural Network
function NeuralNetwork({ mouse }: { mouse: THREE.Vector2 }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  const nodes = useMemo(() => {
    const items = [];
    for (let x = -5; x <= 5; x++) {
      for (let y = -5; y <= 5; y++) {
        if (Math.random() > 0.6) continue;
        items.push({
          x: x * 2.5 + (Math.random() - 0.5),
          y: y * 2.5 + (Math.random() - 0.5),
          z: (Math.random() - 0.5) * 6,
          color: ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6"][Math.floor(Math.random() * 4)]
        });
      }
    }
    return items;
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const pulse = Math.sin(time * 0.8 + i * 0.2) * 0.5 + 0.5;
        
        const dx = child.position.x - mouse.x * viewport.width * 0.5;
        const dy = child.position.y - mouse.y * viewport.height * 0.5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const mouseGlow = dist < 4 ? (1 - dist / 4) * 0.5 : 0;
        child.scale.setScalar(0.06 + pulse * 0.03 + mouseGlow * 0.04);
        
        const material = child.material as THREE.MeshBasicMaterial;
        material.opacity = 0.25 + pulse * 0.35 + mouseGlow;
      }
    });
  });
  
  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

// Camera drift
function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x = Math.sin(time * 0.05) * 0.5;
    camera.position.y = Math.cos(time * 0.03) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main Scene
function Scene() {
  const mouse = useMemo(() => new THREE.Vector2(), []);
  const performanceLevel = usePerformanceLevel();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouse]);
  
  const particleCount = performanceLevel === "high" ? 200 : performanceLevel === "medium" ? 100 : 50;
  
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.5} />
      <Particles count={particleCount} />
      <NeuralNetwork mouse={mouse} />
    </>
  );
}

// Main Component
export function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
