import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import OpenCabinetGlb from "../modals/OpenCabinet.glb";
import CabinetEdgesGlb from "../modals/CabinetEdges.glb";
import Book from "./Book";
import CeramicPot from "./CeramicPot";
import ShineSprite from "./ShineSprite";
import BatCreature from "./BatCreature";
import BookPack from "./BookpackGlb";
import CandleStickGlb from "./CandleStickGlb";
import NepoleanGlb from "./NapoleanGlb";
import NesCafeGlb from "./NesCafeGlb";
import RayBanGlb from "./RayBanGlb";

function OpenCabinet(props) {
  const { nodes, materials } = useGLTF(OpenCabinetGlb);
  const cabinetEdgesNodes = useGLTF(CabinetEdgesGlb).nodes;
  const cabinetEdgesMaterials = useGLTF(CabinetEdgesGlb).materials;

  const OBJECTS = [
    [
      Book,
      CeramicPot,
      ShineSprite,
      BatCreature,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
    ],
    [
      BookPack,
      CandleStickGlb,
      NepoleanGlb,
      NesCafeGlb,
      BatCreature,
      ShineSprite,
      BatCreature,
      BookPack,
      CandleStickGlb,
    ],
    [
      Book,
      CeramicPot,
      ShineSprite,
      BatCreature,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
    ],
    [
      BookPack,
      CandleStickGlb,
      NepoleanGlb,
      NesCafeGlb,
      BatCreature,
      ShineSprite,
      BatCreature,
      BookPack,
      CandleStickGlb,
    ],
  ];
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
    dimensions,
    col,
    row,
  } = props;

  const texture = useTexture(textureUrl);
  const width = specialWidth === 0 ? 50 : specialWidth;

  // Adjust scales and positions based on depth
  let depthScale = 1;
  let depthPositionX = -0.6; // Default position along X-axis for back plank
  let widthScale = specialWidth
    ? width / 25
    : densityFactor[configWidth][density] / 50;

  const decimal = {
    100: 0.01,
    75: 0.02,
    50: 0.08,
    25: 0.14,
  };

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

  // Calculate text sizes function
  const textSize = (text, fontSize) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Arial`;
    const metrics = context.measureText(text);
    return { width: metrics.width, height: fontSize };
  };

  const heightText = `H : 50`;
  const heightSize = textSize(heightText, 24);

  const widthText = `W : ${widthScale * 50}`;
  const widthSize = textSize(widthText, 24);

  const depthText = `D : ${depth.slice(0, 2)}`;
  const depthSize = textSize(depthText, 24);
  const Object = OBJECTS[row][col];
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
      {/* Display Books */}
      {books && <Object />}
      {/* Dimensions */}
      {/* Height */}
      {dimensions && (
        <group position={[0, 0.6, -0.8]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry
              args={[heightSize.width / 100, heightSize.height / 100]}
            />
            <meshBasicMaterial color="white" />
          </mesh>
          <Text
            rotation={[0, Math.PI / 2, 0]}
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {heightText}
          </Text>
        </group>
      )}
      {/* Width */}
      {dimensions && (
        <group position={[0, 0.3, -0.8]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry
              args={[widthSize.width / 100, widthSize.height / 100]}
            />
            <meshBasicMaterial color="white" />
          </mesh>
          <Text
            rotation={[0, Math.PI / 2, 0]}
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {widthText}
          </Text>
        </group>
      )}
      {/* Depth */}
      <group dispose={null}>
        {/* Top Side1 blue*/}
        <mesh
          geometry={cabinetEdgesNodes.edges003.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.63 * depthScale, 1.023, -0.744 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[
            -0.01 * depthScale,
            -1.3,
            -0.027 * (widthScale - decimal[density]),
          ]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Top Side 2 pink*/}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.308 * depthScale, 1.023, 0.023 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018 * depthScale, -1.3, -0.005]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Top Side 3 var green*/}
        <mesh
          geometry={cabinetEdgesNodes.edges003.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.63 * depthScale, 1.023, -0.744 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[
            0.005 * depthScale,
            -1.3,
            -0.028 * (widthScale - decimal[density]),
          ]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Top Side 4 green*/}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.308 * depthScale, 1.023, -1.5 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018 * depthScale, -1.3, -0.02]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Middle Edge 1 */}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.625 * depthScale, 0.4, -1.488 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.595, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Middle Edge 2 */}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.625 * depthScale, 0.4, 0]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.595, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Middle Edge 3 */}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.625 * depthScale, 0.4, 0]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.595, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Middle Edge 4 Red*/}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.625 * depthScale, 0.4, -1.5 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.595, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Bottom Side 1 */}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.32 * depthScale, -0.23, -1.5 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.0186 * depthScale, -1.3, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Bottpm Side 2 */}
        <mesh
          geometry={cabinetEdgesNodes.edges003.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.61 * depthScale, -0.23, -0.744 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[
            -0.018 * depthScale,
            -1.3,
            -0.028 * (widthScale - decimal[density]),
          ]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Bottom side 3 */}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.32 * depthScale, -0.23, 0.006 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.0184 * depthScale, -1.3, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Bottom side 4 */}
        <mesh
          geometry={cabinetEdgesNodes.edges003.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.61 * depthScale, -0.23, -0.744 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[
            -0.018 * depthScale,
            -1.3,
            -0.0285 * (widthScale - decimal[density]),
          ]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
      </group>
      {/* Depth */}
      {dimensions && (
        <group position={[0, 0, -0.8]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry
              args={[depthSize.width / 100, depthSize.height / 100]}
            />
            <meshBasicMaterial color="white" />
          </mesh>
          <Text
            rotation={[0, Math.PI / 2, 0]}
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {depthText}
          </Text>
        </group>
      )}
    </group>
  );
}

export default OpenCabinet;

// Preload GLTF model
useGLTF.preload(OpenCabinetGlb);
