// src/Cupboard.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Cupboard = () => {
  const woodTexture = new THREE.TextureLoader().load(
    "https://threejsfundamentals.org/threejs/resources/images/wall.jpg"
  );
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1, 1);

  return (
    <Canvas
      camera={{ position: [3, 3, 5], fov: 50 }}
      shadows
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <pointLight position={[-10, -10, -10]} />

      {/* Bottom Shelf */}
      <mesh position={[0, -1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Top Shelf */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Left Side */}
      <mesh position={[-1.45, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 1.9, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Right Side */}
      <mesh position={[1.45, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 1.9, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Back Side */}
      <mesh position={[0, 0, -0.45]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.9, 0.1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
};

export default Cupboard;
