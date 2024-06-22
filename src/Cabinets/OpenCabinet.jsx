import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import OpenCabinetGlb from "../modals/OpenCabinet.glb";

function OpenCabinet(props) {
  const { nodes, materials } = useGLTF(OpenCabinetGlb);

  // Destructure depth from props
  const { depth } = props;

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
    <group {...props} dispose={null}>
      {/* Top Plank */}
      <mesh
        geometry={nodes.top_plank002.geometry}
        material={materials["Material.002"]}
        position={[-0.001, 1.023, -0.744]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      {/* Left Plank */}
      <mesh
        geometry={nodes.left_plank002.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      {/* Bottom Plank */}
      <mesh
        geometry={nodes.bottom_plank002.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -0.267, -0.742]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      {/* Right Plank */}
      <mesh
        geometry={nodes.right_plank002.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      {/* Existing Back Plank */}
      <mesh
        geometry={nodes.back_plank002.geometry}
        material={materials["Material.005"]}
        position={[-0.6, 0.315, -0.746]}
        scale={[1, 0.958, 0.946]}
      />
    </group>
  );
}

export default OpenCabinet;

useGLTF.preload(OpenCabinetGlb);
