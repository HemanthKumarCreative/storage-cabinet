import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import SmallCabinetGlb from "../modals/SmallCabinet.glb";

function SmallCabinet(props) {
  const { nodes, materials } = useGLTF(SmallCabinetGlb);
  const doorRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // Destructure props to get depth
  const { depth } = props;

  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y = isHovered
        ? Math.min(Math.PI / 2, doorRef.current.rotation.y + 0.05)
        : Math.max(0, doorRef.current.rotation.y - 0.05);
    }
  });

  // Adjust scales based on depth
  let depthScale = 1;
  let depthPositionX = -0.6;
  let doopPositionX = 0.618;
  let hingePosX = 0.522;

  switch (depth) {
    case "24cm":
      depthScale = 1;
      break;
    case "32cm":
      depthScale = 1.33;
      depthPositionX *= 1.4; // Adjust X position for 32cm depth
      doopPositionX *= 1.4;
      hingePosX *= 1.4;
      break;
    case "40cm":
      depthScale = 1.66;
      depthPositionX *= 1.7; // Adjust X position for 40cm depth
      doopPositionX *= 1.7;
      hingePosX *= 1.8;
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
        geometry={nodes.left_plank001.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.right_plank001.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.top_plank001.geometry}
        material={materials["Material.002"]}
        position={[-0.001, 1.023, -0.744]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.bottom_plank001.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -0.267, -0.742]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.back_plank001.geometry}
        material={materials["Material.005"]}
        position={[depthPositionX, 0.315, -0.746]}
        scale={[1, 0.958, 0.946]}
      />
      <mesh
        ref={doorRef}
        geometry={nodes.door001.geometry}
        material={materials["Material.001"]}
        position={[doopPositionX, 0.386, -1.444]}
        rotation={[0, 0, 0]} // Initial rotation state
        scale={[1.166, 1, 1]}
      />
      <mesh
        geometry={nodes.hinge_top001.geometry}
        material={materials["Material.006"]}
        position={[hingePosX, 0.791, -1.449]}
      />
      <mesh
        geometry={nodes.hinge_bottom001.geometry}
        material={materials["Material.006"]}
        position={[hingePosX, -0.014, -1.449]}
      />
    </group>
  );
}

useGLTF.preload(SmallCabinetGlb);

export default SmallCabinet;
