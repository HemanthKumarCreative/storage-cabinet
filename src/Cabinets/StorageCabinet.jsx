import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import StorageCabinetGlb from "../modals/StorageCabinet.gltf";

function StorageCabinet(props) {
  const { nodes, materials } = useGLTF(StorageCabinetGlb);
  const doorRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // Destructure props to get depth
  const { depth } = props;

  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y = THREE.MathUtils.lerp(
        doorRef.current.rotation.y,
        isHovered ? Math.PI / 2 : 0,
        0.1
      );
    }
  });

  // Adjust scales based on depth
  let depthScale = 1;

  switch (depth) {
    case "24cm":
      depthScale = 1;
      break;
    case "32cm":
      depthScale = 1.33;
      break;
    case "40cm":
      depthScale = 1.66;
      break;
    default:
      break;
  }

  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <mesh
        geometry={nodes.left_plank.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.right_plank.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.top_plank.geometry}
        material={materials["Material.002"]}
        position={[-0.001, 1.023, -0.744]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.bottom_plank.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -1.025, -0.742]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
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
