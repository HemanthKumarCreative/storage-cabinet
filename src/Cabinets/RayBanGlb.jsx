/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 .\src\modals\RayBanGlb.glb 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import RayBanGlb from "../modals/RayBanGlb.glb";

/**
 * Model Component
 * This component loads and renders a 3D model of Ray-Ban glasses using GLTF.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} The 3D model of Ray-Ban glasses
 */
export default function Model(props) {
  // Load GLTF model and extract nodes and materials
  const { nodes, materials } = useGLTF(RayBanGlb);

  return (
    // Group component to hold the model with specified props and scale
    <group {...props} dispose={null} scale={[0.004, 0.005, 0.004]}>
      {/* Various mesh components representing parts of the Ray-Ban glasses */}
      <mesh geometry={nodes.Line009.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Line007.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Line006.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Line005.geometry} material={materials.Glass} />
      <mesh geometry={nodes.Line004.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Cylinder002.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Cylinder001.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Line002.geometry} material={materials.Plastic} />
      <mesh geometry={nodes.Line001.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Box002.geometry} material={materials.Plastic} />
      <mesh geometry={nodes.Box002_1.geometry} material={materials.Metal} />
    </group>
  );
}

// Preload the GLTF model to ensure it's loaded before usage
useGLTF.preload(RayBanGlb);
