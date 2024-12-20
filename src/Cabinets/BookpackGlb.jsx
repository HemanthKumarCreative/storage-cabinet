/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 .\src\modals\BookpackGlb.glb 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import BookPackGlb from "../modals/BookpackGlb.glb";

export default function Model(props) {
  const { nodes, materials } = useGLTF(BookPackGlb);
  return (
    <group
      {...props}
      dispose={null}
      scale={[0.004, 0.005, 0.004]}
      rotation={[Math.PI / 2, 0, Math.PI / 2]}
      position={[0.2, 0.3, -0.7]}
    >
      <mesh
        geometry={nodes.book001.geometry}
        material={materials["Material #100"]}
        position={[-128.84, 5.646, 0]}
      />
      <mesh
        geometry={nodes.book001_1.geometry}
        material={materials["Material #101"]}
        position={[-128.84, 5.646, 0]}
      />
      <mesh
        geometry={nodes.book002.geometry}
        material={materials["Material #119"]}
        position={[-109.546, -0.359, 0]}
      />
      <mesh
        geometry={nodes.book002_1.geometry}
        material={materials["Material #118"]}
        position={[-109.546, -0.359, 0]}
      />
      <mesh
        geometry={nodes.book003.geometry}
        material={materials["Material #112"]}
        position={[-85.454, 3.064, 0]}
      />
      <mesh
        geometry={nodes.book003_1.geometry}
        material={materials["Material #113"]}
        position={[-85.454, 3.064, 0]}
      />
      <mesh
        geometry={nodes.book004.geometry}
        material={materials["Material #114"]}
        position={[-56.719, -0.384, 0]}
      />
      <mesh
        geometry={nodes.book004_1.geometry}
        material={materials["Material #115"]}
        position={[-56.719, -0.384, 0]}
      />
      <mesh
        geometry={nodes.book005.geometry}
        material={materials["Material #98"]}
        position={[-31.465, 3.064, 0]}
      />
      <mesh
        geometry={nodes.book005_1.geometry}
        material={materials["Material #99"]}
        position={[-31.465, 3.064, 0]}
      />
      <mesh
        geometry={nodes.book006.geometry}
        material={materials["Material #97"]}
        position={[-7.598, 0.661, 0]}
      />
      <mesh
        geometry={nodes.book006_1.geometry}
        material={materials["Material #96"]}
        position={[-7.598, 0.661, 0]}
      />
      <mesh
        geometry={nodes.book007.geometry}
        material={materials["Material #116"]}
        position={[15.084, 3.224, 0]}
      />
      <mesh
        geometry={nodes.book007_1.geometry}
        material={materials["Material #117"]}
        position={[15.084, 3.224, 0]}
      />
      <mesh
        geometry={nodes.book008.geometry}
        material={materials["Material #110"]}
        position={[35.319, 5.646, 0]}
      />
      <mesh
        geometry={nodes.book008_1.geometry}
        material={materials["Material #111"]}
        position={[35.319, 5.646, 0]}
      />
      <mesh
        geometry={nodes.book009.geometry}
        material={materials["Material #108"]}
        position={[63.043, 5.646, 0]}
      />
      <mesh
        geometry={nodes.book009_1.geometry}
        material={materials["Material #109"]}
        position={[63.043, 5.646, 0]}
      />
      <mesh
        geometry={nodes.book010.geometry}
        material={materials["Material #104"]}
        position={[91.227, 3.064, 0]}
      />
      <mesh
        geometry={nodes.book010_1.geometry}
        material={materials["Material #105"]}
        position={[91.227, 3.064, 0]}
      />
      <mesh
        geometry={nodes.book011.geometry}
        material={materials["Material #106"]}
        position={[107.218, 5.649, 0]}
      />
      <mesh
        geometry={nodes.book011_1.geometry}
        material={materials["Material #107"]}
        position={[107.218, 5.649, 0]}
      />
      <mesh
        geometry={nodes.book012.geometry}
        material={materials["Material #103"]}
        position={[130.663, -0.384, 0]}
      />
      <mesh
        geometry={nodes.book012_1.geometry}
        material={materials["Material #102"]}
        position={[130.663, -0.384, 0]}
      />
    </group>
  );
}

useGLTF.preload(BookPackGlb);
