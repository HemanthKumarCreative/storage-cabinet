/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 .\src\modals\CandleStickGlb.glb 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import CandleStickGlb from "../modals/CandleStickGlb.glb";

export default function Model(props) {
  const { nodes, materials } = useGLTF(CandleStickGlb);
  return (
    <group
      {...props}
      dispose={null}
      scale={[0.03, 0.03, 0.03]}
      position={[0, -0.2, -0.7]}
    >
      <mesh
        geometry={nodes.Object01.geometry}
        material={materials.Plastic_white}
      >
        <meshStandardMaterial color="#528881" attach="material" />
      </mesh>
      <mesh geometry={nodes.Object03.geometry} material={materials.Fabric} />
      <mesh geometry={nodes.Object02.geometry} material={materials.Chrome} />
      <mesh geometry={nodes.Object02_1.geometry} material={materials.Wax} />
    </group>
  );
}

useGLTF.preload(CandleStickGlb);
