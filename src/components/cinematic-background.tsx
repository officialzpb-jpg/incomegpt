"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Floating coins
function Coins({ count = 50 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const coins = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        floatSpeed: 0.5 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, [count]);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const coin = coins[i];
        
        // Rotate coin
        child.rotation.x += coin.rotSpeedX;
        child.rotation.y += coin.rotSpeedY;
        child.rotation.z += coin.rotSpeedZ;
        
        // Float up and down
        child.position.y += Math.sin(time * coin.floatSpeed + coin.floatOffset) * 0.01;
        
        // Slowly drift
        child.position.x += Math.sin(time * 0.2 + i) * 0.002;
      }
    });
    
    // Rotate entire group slowly
    groupRef.current.rotation.y = time * 0.02;
  });
  
  return (
    <group ref={groupRef}>
      {coins.map((coin, i) => (
        <mesh key={i} position={[coin.x, coin.y, coin.z]}>
          <cylinderGeometry args={[0.15, 0.15, 0.03, 32]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#C0C0C0" : "#B87333"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Neural network nodes
function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 15,
        z: (Math.random() - 0.5) * 5,
      });
    }
    return items;
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const pulse = Math.sin(time * 2 + i) * 0.5 + 0.5;
        child.scale.setScalar(0.1 + pulse * 0.05);
      }
    });
  });
  
  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#10b981" : "#06b6d4"}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Coins count={60} />
      <NeuralNodes />
    </>
  );
}

// Error boundary wrapper
function ErrorFallback() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black z-0" />
  );
}

export function CinematicBackground() {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Check if WebGL is supported
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        console.log("WebGL not supported, using fallback");
        setHasError(true);
      }
    } catch {
      setHasError(true);
    }
  }, []);
  
  if (hasError) {
    return <ErrorFallback />;
  }
  
  return (
    <div className="fixed inset-0 z-0" style={{ background: "#000000" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={1}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: "transparent" }}
        onError={() => setHasError(true)}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
