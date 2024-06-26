import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import OpenCabinetGlb from "../modals/OpenCabinet.glb";
import StorageCabinetGlb from "../modals/StorageCabinetUpdated.glb";
import Book from "./Book";

function OpenCabinet(props) {
  const { nodes, materials } = useGLTF(OpenCabinetGlb);
  const StorageCabinetNode = useGLTF(StorageCabinetGlb);
  const storageCabinetNodes = StorageCabinetNode.nodes;
  const storageCabinetMaterials = StorageCabinetNode.materials;

  // Destructure depth from props
  const {
    depth,
    backPanel,
    specialWidth,
    density,
    densityFactor,
    configWidth,
    textureUrl,
    color,
    colorCodes,
    books,
  } = props;

  const texture = useTexture(textureUrl);
  const width = specialWidth === 0 ? 50 : specialWidth;

  // Adjust scales and positions based on depth
  let depthScale = 1;
  let depthPositionX = -0.6; // Default position along X-axis for back plank
  let widthScale = specialWidth
    ? width / 25
    : densityFactor[configWidth][density] / 50;

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

  const { gl, scene } = useThree();

  useEffect(() => {
    gl.shadowMap.enabled = true;
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [gl, scene]);

  return (
    <group {...props} dispose={null}>
      {/* Top Plank */}
      <mesh
        geometry={nodes.top_plank002.geometry}
        material={materials["Material.002"]}
        position={[0, 1.023, -0.744 * widthScale]}
        scale={[depthScale - 0.05, 1, widthScale - 0.15]} // Adjusted scale based on depth
        castShadow
        receiveShadow
      >
        <meshStandardMaterial map={texture} attach="material" />
      </mesh>
      {/* Left Plank */}
      <mesh
        geometry={nodes.left_plank002.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          attach="material"
          color={colorCodes[color]}
        />
      </mesh>
      {/* Right Plank */}
      <mesh
        geometry={nodes.right_plank002.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484 * widthScale]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          attach="material"
          color={colorCodes[color]}
        />
      </mesh>
      {/* Back Plank */}
      {backPanel && (
        <mesh
          geometry={nodes.back_plank002.geometry}
          material={materials["Material.005"]}
          position={[depthPositionX, 0.315, -0.746 * widthScale]} // Adjusted position based on depth along X-axis
          scale={[1, 0.958, widthScale]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={texture}
            attach="material"
            color={colorCodes[color]}
          />
        </mesh>
      )}
      <mesh
        geometry={storageCabinetNodes.edges.geometry}
        material={storageCabinetMaterials["Material.012"]}
        position={[0.68 * depthScale, 0.43, -1.484 * widthScale]}
        rotation={[0, 0, -Math.PI]}
        scale={[-0.019 * depthScale, 0.55, -0.027 * widthScale]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="white" attach="material" />
      </mesh>
      {books && <Book />}
    </group>
  );
}

export default OpenCabinet;

useGLTF.preload(OpenCabinetGlb);
