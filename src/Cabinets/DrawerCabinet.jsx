import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import DrawerCabinetGlb from "../modals/DrawerCabinet.glb";

function DrawerCabinet(props) {
  const { nodes, materials } = useGLTF(DrawerCabinetGlb);
  const drawerRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (drawerRef.current) {
      drawerRef.current.position.x = THREE.MathUtils.lerp(
        drawerRef.current.position.x,
        hovered ? 1.5 : 0.7, // Adjust these values to control the drawer opening distance
        0.1
      );
    }
  });

  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh
        geometry={nodes.left_plank003.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
      />
      <mesh
        geometry={nodes.right_plank003.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.494]}
      />
      <mesh
        geometry={nodes.top_plank003.geometry}
        material={materials["Material.002"]}
        position={[-0.001, 1.023, -0.744]}
      />
      <mesh
        geometry={nodes.bottom_plank003.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -0.267, -0.742]}
      />
      <mesh
        geometry={nodes.back_plank003.geometry}
        material={materials["Material.005"]}
        position={[-0.595, 0.315, -0.746]}
        scale={[1, 0.958, 0.946]}
      />
      <group ref={drawerRef} position={[0.581, 0.315, -0.754]}>
        <mesh
          geometry={nodes.drawer_back001.geometry}
          material={materials["Material.007"]}
          rotation={[0, 1.571, 0]}
          scale={[0.924, 0.863, 1]}
        >
          <mesh
            geometry={nodes.drawe_left.geometry}
            material={materials["Material.009"]}
            position={[-0.687, -0.038, -0.697]}
            rotation={[0, -1.571, 0]}
            scale={[0.924, 1, 1.082]}
          >
            <mesh
              geometry={nodes.slider_left.geometry}
              material={materials["Material.011"]}
              position={[0.077, -0.435, 0.057]}
              rotation={[-Math.PI, 0, 0]}
              scale={[0.397, 0.025, 0.02]}
            />
          </mesh>
          <mesh
            geometry={nodes.drawer_back.geometry}
            material={materials["Material.010"]}
            position={[-0.134, -0.031, -1.125]}
          />
          <mesh
            geometry={nodes.drawer_right.geometry}
            material={materials["Material.008"]}
            position={[0.673, -0.038, -0.697]}
            rotation={[0, -1.571, 0]}
            scale={[0.924, 1, 1.082]}
          >
            <mesh
              geometry={nodes.slider_right.geometry}
              material={materials["Material.011"]}
              position={[0.119, -0.435, -0.052]}
              scale={[0.397, 0.025, 0.02]}
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(DrawerCabinetGlb);

export default DrawerCabinet;
