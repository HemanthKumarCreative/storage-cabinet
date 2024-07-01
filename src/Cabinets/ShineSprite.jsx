/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 .\src\modals\ShineSprite.gltf 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import ShineSpriteGlb from "../modals/ShineSprite.gltf";

export default function Model(props) {
  const { nodes, materials } = useGLTF(ShineSpriteGlb);
  return (
    <group
      {...props}
      dispose={null}
      scale={[0.3, 0.3, 0.3]}
      position={[0, 0.2, -0.7]}
    >
      <group rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <mesh geometry={nodes.Torus002.geometry} material={materials.Gold} />
        <mesh geometry={nodes.Torus002_1.geometry} material={materials.Eyes} />
      </group>
    </group>
  );
}

useGLTF.preload(ShineSpriteGlb);