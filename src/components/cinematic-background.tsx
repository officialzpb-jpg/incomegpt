"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Create minimalist $100 bill texture
function createBillTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 110;
  const ctx = canvas.getContext("2d")!;
  
  // Subtle green background
  ctx.fillStyle = "#1a2f1a";
  ctx.fillRect(0, 0, 256, 110);
  
  // Very subtle border
  ctx.strokeStyle = "#2d4a2d";
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 252, 106);
  
  // Minimal "100" text
  ctx.fillStyle = "#3d6b3d";
  ctx.font = "24px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("100", 128, 60);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

// Minimalist floating dollar bills
function DollarBills({ count = 25 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => createBillTexture(), []);
  
  const bills = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
        z: (Math.random() - 0.5) * 20,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
        floatSpeed: 0.2 + Math.random() * 0.3,
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
        const bill = bills[i];
        
        child.rotation.x += bill.rotSpeedX;
        child.rotation.y += bill.rotSpeedY;
        child.rotation.z += bill.rotSpeedZ;
        
        child.position.y += Math.sin(time * bill.floatSpeed + bill.floatOffset) * 0.005;
      }
    });
  });
  
  return (
    <group ref={groupRef}>
      {bills.map((bill, i) => (
        <mesh 
          key={i} 
          position={[bill.x, bill.y, bill.z]} 
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <planeGeometry args={[0.8, 0.35]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Neural network nodes (kept for ambiance)
function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
      });
    }
    return items;
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const pulse = Math.sin(time * 1.5 + i) * 0.5 + 0.5;
        child.scale.setScalar(0.08 + pulse * 0.04);
      }
    });
  });
  
  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#10b981" : "#06b6d4"}
            transparent
            opacity={0.4}
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
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#85bb65" />
      <DollarBills count={40} />
      <NeuralNodes />
    </>
  );
}

// Error fallback
function ErrorFallback() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-green-950/20 to-black z-0" />
  );
}

export function CinematicBackground() {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
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
        camera={{ position: [0, 0, 10], fov: 60 }}
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
