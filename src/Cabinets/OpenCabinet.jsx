import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import OpenCabinetGlb from "../modals/OpenCabinet.glb";

function OpenCabinet(props) {
  const { nodes, materials } = useGLTF(OpenCabinetGlb);

  // Destructure depth from props
  const { depth, backPanel, specialWidth } = props;
  const width = specialWidth === 0 ? 50 : specialWidth;

  // Adjust scales and positions based on depth
  let depthScale = 1;
  let depthPositionX = -0.6; // Default position along X-axis for back plank
  let widthScale = specialWidth ? width / 50 : 1;

  switch (depth) {
    case "24cm":
      depthScale = 1;
      break;
    case "32cm":
      depthScale = 1.33;
      depthPositionX *= 1.4; // Adjust X position for 32cm depth
      break;
    case "40cm":
      depthScale = 1.66;
      depthPositionX *= 1.7; // Adjust X position for 40cm depth
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
        position={[-0.001, 1.023, -0.744 * widthScale]}
        scale={[depthScale, 1, widthScale]} // Adjusted scale based on depth
      />
      {/* Left Plank */}
      <mesh
        geometry={nodes.left_plank002.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
        scale={[depthScale, 1, widthScale]} // Adjusted scale based on depth
      />
      {/* Bottom Plank */}
      <mesh
        geometry={nodes.bottom_plank002.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -0.267, -0.742 * widthScale]}
        scale={[depthScale, 1, widthScale]} // Adjusted scale based on depth
      />
      {/* Right Plank */}
      <mesh
        geometry={nodes.right_plank002.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484 * widthScale]}
        scale={[depthScale, 1, widthScale]} // Adjusted scale based on depth
      />
      {/* Back Plank */}
      {backPanel && (
        <mesh
          geometry={nodes.back_plank002.geometry}
          material={materials["Material.005"]}
          position={[depthPositionX, 0.315, -0.746 * widthScale]} // Adjusted position based on depth along X-axis
          scale={[1, 0.958, widthScale]}
        />
      )}
    </group>
  );
}

export default OpenCabinet;

useGLTF.preload(OpenCabinetGlb);
