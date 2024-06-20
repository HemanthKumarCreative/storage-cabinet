import StorageCabinetGlb from "../modals/StorageCabinet.gltf";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function StorageCabinet(props) {
  const { nodes, materials } = useGLTF(StorageCabinetGlb);
  const doorRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y = THREE.MathUtils.lerp(
        doorRef.current.rotation.y,
        hovered ? Math.PI / 2 : 0,
        0.1
      );
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.left_plank.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
      />
      <mesh
        geometry={nodes.right_plank.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484]}
      />
      <mesh
        geometry={nodes.top_plank.geometry}
        material={materials["Material.002"]}
        position={[-0.001, 1.023, -0.744]}
      />
      <mesh
        geometry={nodes.bottom_plank.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -1.025, -0.742]}
      />
      <mesh
        geometry={nodes.back_plank.geometry}
        material={materials["Material.005"]}
        position={[-0.6, 0.001, -0.746]}
        scale={[1, 0.958, 0.946]}
      />
      <mesh
        ref={doorRef}
        geometry={nodes.door.geometry}
        material={materials["Material.001"]}
        position={[0.624, 0.033, -1.446]}
        scale={[1.166, 1, 1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <mesh
        geometry={nodes.hinge_top.geometry}
        material={materials["Material.006"]}
        position={[0.522, 0.743, -1.449]}
      />
      <mesh
        geometry={nodes.hinge_bottom.geometry}
        material={materials["Material.006"]}
        position={[0.522, -0.64, -1.449]}
      />
      <mesh
        geometry={nodes.inner_shelf.geometry}
        material={materials.Material}
        position={[-0.039, -0.202, -0.744]}
        scale={[0.893, 0.71, 0.922]}
      />
    </group>
  );
}

useGLTF.preload(StorageCabinetGlb);

export default StorageCabinet;
