import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import OpenCabinetGlb from "../modals/OpenCabinet.glb";

function OpenCabinet(props) {
  const { nodes, materials } = useGLTF(OpenCabinetGlb);

  // Destructure depth from props
  const {
    depth,
    backPanel,
    specialWidth,
    density,
    densityFactor,
    configWidth,
    textureUrl,
  } = props;

  const texture = useTexture(textureUrl);
  const width = specialWidth === 0 ? 50 : specialWidth;

  // Adjust scales and positions based on depth
  let depthScale = 1;
  let depthPositionX = -0.6; // Default position along X-axis for back plank
  let widthScale = specialWidth
    ? width / 25
    : densityFactor[configWidth][density] / 50;

  // switch (density) {
  //   case 25:
  //     widthScale = 4;
  //     break;
  //   case 50:
  //     widthScale = 3;
  //     break;
  //   case 75:
  //     widthScale = 2;
  //     break;
  //   case 100:
  //     widthScale = 1;
  //     break;
  //   default:
  //     widthScale = 1;
  // }

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
        position={[0, 1.023, -0.744 * widthScale]}
        scale={[depthScale - 0.05, 2, widthScale - 0.15]} // Adjusted scale based on depth
      >
        <meshStandardMaterial
          map={texture}
          attach="material"
          // color="#E2DFD2"
        />
      </mesh>
      {/* Left Plank */}
      <mesh
        geometry={nodes.left_plank002.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
        scale={[depthScale, 1, 2]} // Adjusted scale based on depth
      >
        <meshStandardMaterial map={texture} attach="material" color="#E2DFD2" />
      </mesh>
      {/* Bottom Plank */}
      <mesh
        geometry={nodes.bottom_plank002.geometry}
        material={materials["Material.004"]}
        position={[0, -0.267, -0.742 * widthScale]}
        scale={[depthScale, 2, widthScale - 0.15]} // Adjusted scale based on depth
      >
        <meshStandardMaterial
          map={texture}
          attach="material"
          // color="#E2DFD2"
        />
      </mesh>
      {/* Right Plank */}
      <mesh
        geometry={nodes.right_plank002.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484 * widthScale]}
        scale={[depthScale, 1, 2]} // Adjusted scale based on depth
      >
        <meshStandardMaterial map={texture} attach="material" color="#E2DFD2" />
      </mesh>
      {/* Back Plank */}
      {backPanel && (
        <mesh
          geometry={nodes.back_plank002.geometry}
          material={materials["Material.005"]}
          position={[depthPositionX, 0.315, -0.746 * widthScale]} // Adjusted position based on depth along X-axis
          scale={[1, 0.958, widthScale]}
        >
          <meshStandardMaterial
            map={texture}
            attach="material"
            color="#E2DFD2"
          />
        </mesh>
      )}
    </group>
  );
}

export default OpenCabinet;

useGLTF.preload(OpenCabinetGlb);
