import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import SmallCabinetGlb from "../modals/SmallCabinet.glb";

function SmallCabinet(props) {
  const { nodes, materials } = useGLTF(SmallCabinetGlb);
  const doorRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y = isHovered
        ? Math.min(Math.PI / 2, doorRef.current.rotation.y + 0.05)
        : Math.max(0, doorRef.current.rotation.y - 0.05);
    }
  });

  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <mesh
        geometry={nodes.left_plank001.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
      />
      <mesh
        geometry={nodes.right_plank001.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484]}
      />
      <mesh
        geometry={nodes.top_plank001.geometry}
        material={materials["Material.002"]}
        position={[-0.001, 1.023, -0.744]}
      />
      <mesh
        geometry={nodes.bottom_plank001.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -0.267, -0.742]}
      />
      <mesh
        geometry={nodes.back_plank001.geometry}
        material={materials["Material.005"]}
        position={[-0.6, 0.315, -0.746]}
        scale={[1, 0.958, 0.946]}
      />
      <mesh
        ref={doorRef}
        geometry={nodes.door001.geometry}
        material={materials["Material.001"]}
        position={[0.618, 0.386, -1.444]}
        rotation={[0, 0, 0]} // Initial rotation state
        scale={[1.166, 1, 1]}
      />
      <mesh
        geometry={nodes.hinge_top001.geometry}
        material={materials["Material.006"]}
        position={[0.522, 0.791, -1.449]}
      />
      <mesh
        geometry={nodes.hinge_bottom001.geometry}
        material={materials["Material.006"]}
        position={[0.522, -0.014, -1.449]}
      />
    </group>
  );
}

useGLTF.preload(SmallCabinetGlb);

export default SmallCabinet;
