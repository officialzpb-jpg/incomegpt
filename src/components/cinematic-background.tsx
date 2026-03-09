"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Create $100 bill texture
function createBillTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 220;
  const ctx = canvas.getContext("2d")!;
  
  // Bill background (green tint)
  ctx.fillStyle = "#85bb65";
  ctx.fillRect(0, 0, 512, 220);
  
  // Border
  ctx.strokeStyle = "#2d5016";
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 504, 212);
  
  // Inner border
  ctx.strokeStyle = "#3d6b22";
  ctx.lineWidth = 3;
  ctx.strokeRect(15, 15, 482, 190);
  
  // "100" in corners
  ctx.fillStyle = "#1a3d0a";
  ctx.font = "bold 48px serif";
  ctx.textAlign = "left";
  ctx.fillText("100", 25, 55);
  ctx.textAlign = "right";
  ctx.fillText("100", 487, 55);
  ctx.textAlign = "left";
  ctx.fillText("100", 25, 200);
  ctx.textAlign = "right";
  ctx.fillText("100", 487, 200);
  
  // Center "ONE HUNDRED DOLLARS"
  ctx.textAlign = "center";
  ctx.font = "bold 28px serif";
  ctx.fillText("ONE HUNDRED DOLLARS", 256, 110);
  
  // Large "100" in center
  ctx.font = "bold 80px serif";
  ctx.fillStyle = "#1a3d0a";
  ctx.fillText("100", 256, 165);
  
  // Decorative patterns
  ctx.strokeStyle = "#4a7c2a";
  ctx.lineWidth = 2;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(60 + i * 40, 30);
    ctx.lineTo(60 + i * 40, 190);
    ctx.stroke();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

// Floating $100 bills
function DollarBills({ count = 40 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => createBillTexture(), []);
  
  const bills = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: (Math.random() - 0.5) * 25,
        y: (Math.random() - 0.5) * 25,
        z: (Math.random() - 0.5) * 15,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        floatSpeed: 0.3 + Math.random() * 0.4,
        floatOffset: Math.random() * Math.PI * 2,
        scale: 0.7 + Math.random() * 0.4,
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
        
        // Gentle rotation like falling money
        child.rotation.x += bill.rotSpeedX;
        child.rotation.y += bill.rotSpeedY;
        child.rotation.z += bill.rotSpeedZ;
        
        // Float up and down
        child.position.y += Math.sin(time * bill.floatSpeed + bill.floatOffset) * 0.008;
        
        // Gentle drift
        child.position.x += Math.sin(time * 0.1 + i) * 0.002;
        child.position.z += Math.cos(time * 0.08 + i) * 0.001;
      }
    });
    
    // Slow group rotation
    groupRef.current.rotation.y = time * 0.008;
  });
  
  return (
    <group ref={groupRef}>
      {bills.map((bill, i) => (
        <mesh 
          key={i} 
          position={[bill.x, bill.y, bill.z]} 
          scale={bill.scale}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * 0.5]}
        >
          <planeGeometry args={[2.3, 1]} />
          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            metalness={0.1}
            roughness={0.6}
            side={THREE.DoubleSide}
            transparent
            opacity={0.95}
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
