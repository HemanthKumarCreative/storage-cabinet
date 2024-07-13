import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import OpenCabinetGlb from "../modals/OpenCabinet.glb";
import CabinetEdgesGlb from "../modals/CabinetEdges.glb";
import Book from "./Book";
import CeramicPot from "./CeramicPot";
import ShineSprite from "./ShineSprite";
import Bat from "./BatCreature";
import BookPack from "./BookpackGlb";
import CandleStickGlb from "./CandleStickGlb";
import NepoleanGlb from "./NapoleanGlb";
import NesCafeGlb from "./NesCafeGlb";
import RayBanGlb from "./RayBanGlb";
import InnerDimension from "../Dimensions/InnerDimension";

/**
 * OpenCabinet Component
 * @param {object} props - Properties passed to the component
 * @returns {JSX.Element} A 3D model of an open cabinet with customizable content
 */
function OpenCabinet(props) {
  // Load GLTF models
  const { nodes, materials } = useGLTF(OpenCabinetGlb);
  const cabinetEdgesNodes = useGLTF(CabinetEdgesGlb).nodes;
  const cabinetEdgesMaterials = useGLTF(CabinetEdgesGlb).materials;

  // Define objects to be placed inside the cabinet
  const OBJECTS = [
    [
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      Bat,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
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
      Bat,
      BookPack,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
    ],
    [
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
    ],
    [
      BookPack,
      CandleStickGlb,
      NepoleanGlb,
      NesCafeGlb,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      BookPack,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
    ],
    [
      NesCafeGlb,
      BookPack,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      CandleStickGlb,
      NepoleanGlb,
      BookPack,
      ShineSprite,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
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
      BookPack,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
    ],
    [
      BookPack,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      Book,
      CandleStickGlb,
      NepoleanGlb,
      NesCafeGlb,
      BookPack,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      Book,
      CeramicPot,
      ShineSprite,
      CeramicPot,
      ShineSprite,
      BookPack,
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
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
      NesCafeGlb,
      BookPack,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      Book,
      CeramicPot,
      ShineSprite,
      BookPack,
      BookPack,
      CandleStickGlb,
      CeramicPot,
      BookPack,
      ShineSprite,
    ],
  ];

  // Destructure properties from props
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
    units,
    cabinetHeight,
    type,
  } = props;

  // Load texture from URL
  const texture = useTexture(textureUrl);

  // Calculate width based on specialWidth
  const width = specialWidth === 0 ? 50 : specialWidth;

  // Height scaling based on cabinet height
  const heightScale = {
    30: 1,
    45: 1.5,
    60: 2.1,
  };

  // Drawer Y-axis positions based on cabinet height
  const drawerPositionY = {
    open4: {
      30: 0,
      45: 0.45,
      60: 1.3,
    },
    open3: {
      30: 0,
      45: 0.45,
      60: 1.3,
    },
    open2: {
      30: 0,
      45: 0.45,
      60: 1.3,
    },
    open1: {
      30: 0,
      45: 0.45,
      60: 1.3,
    },
  };

  // Cabinet Y-axis positions based on height
  const positionY = {
    30: 0,
    45: 0,
    60: 0.2,
  };

  // Depth scaling and position adjustments based on depth
  let depthScale = 1;
  let depthPositionX = -0.6; // Default position along X-axis for back plank
  let widthScale = specialWidth
    ? width / 25
    : densityFactor[configWidth][density] / 50;

  // Convert cm to feet and inches
  const convertToFeetInches = (cm) => {
    const inches = cm / 2.54;
    const feet = Math.ceil(inches / 12);
    return `${feet}'`;
  };

  // Decimal values for scaling adjustments
  const decimal = {
    100: 0.01,
    75: 0.02,
    50: 0.08,
    25: 0.14,
  };

  // Adjust depth scaling and position based on depth
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

  // Use Three.js context to enable shadows
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

  // Helper function to calculate text sizes
  const textSize = (text, fontSize) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Arial`;
    const metrics = context.measureText(text);
    return { width: metrics.width, height: fontSize };
  };

  // Calculate text sizes for dimensions
  const heightText = ` ${cabinetHeight} `;
  const heightSize = textSize(heightText, 24);

  const widthText = `W : ${widthScale * 50}`;
  const widthSize = textSize(widthText, 24);

  const depthText = `D : ${depth.slice(0, 2)}`;
  const depthSize = textSize(depthText, 24);

  const Object = OBJECTS[row][col];

  // Render the component
  return (
    <group {...props} dispose={null}>
      <group position={[0, drawerPositionY?.open4[cabinetHeight || 0], 0]}>
        {/* Top Plank */}
        <mesh
          geometry={nodes.top_plank002.geometry}
          material={materials["Material.002"]}
          position={[0, 1.023, -0.744 * widthScale]}
          scale={[depthScale - 0.05, 1, widthScale]} // Adjusted scale based on depth
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={texture}
            attach="material"
            color={colorCodes[color]}
          />
        </mesh>
        {/* Top Side1 blue */}
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
        {/* Top Side 2 pink */}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.308 * depthScale, 1.023, 0.023 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018 * depthScale, -1.3, -0.005]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Top Side 3 var green */}
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
        {/* Top Side 4 green */}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.308 * depthScale, 1.023, -1.5 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018 * depthScale, -1.3, -0.02]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
      </group>
      <group
        scale={[1, heightScale[cabinetHeight], 1]}
        position={[0, positionY[cabinetHeight], 0]}
      >
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
        {/* Middle Edge 4 Red */}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.625 * depthScale, 0.4, -1.5 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.595, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
      </group>
      {/* Bottom Plank */}
      <mesh
        geometry={nodes.bottom_plank002.geometry}
        material={materials["Material.004"]}
        position={[0, -0.267, -0.742 * widthScale]}
        scale={[depthScale, 2, widthScale - 0.1]} // Adjusted scale based on depth
      >
        <meshStandardMaterial
          map={texture}
          attach="material"
          color={colorCodes[color]}
        />
      </mesh>
      {/* Display Books */}
      <group position={[0, 0, 0]}>{books && <Object />}</group>
      {/* Dimensions */}
      {/* Height */}
      {dimensions && (
        <InnerDimension
          heightSize={heightSize}
          heightText={
            units === "cm"
              ? ` ${cabinetHeight} `
              : `${convertToFeetInches(cabinetHeight)}`
          }
          groupPosition={[0.8, 0.6, -0.8]}
          groupRotation={[0, Math.PI / 2, 0]}
          textRotation={[0, 0, 0]}
          textPosition={[0, 0, 0.01]}
          planeRotation={[0, 0, 0]}
          type="height"
        />
      )}
      {/* Width */}
      {dimensions && (
        <InnerDimension
          heightSize={heightSize}
          heightText={units === "cm" ? ` 50 ` : `${convertToFeetInches(50)}`}
          groupPosition={[0.8, 0, -0.8]}
          groupRotation={[0, Math.PI / 2, 0]}
          textRotation={[0, 0, 0]}
          textPosition={[0, 0, 0.01]}
          planeRotation={[0, 0, 0]}
          type="width"
        />
      )}
      {/* Depth */}
      {/* {dimensions && (
        <InnerDimension
          heightSize={heightSize}
          heightText={heightText}
          groupPosition={[0, 0, -0.8]}
          groupRotation={[0, Math.PI / 2, 0]}
          textRotation={[0, 0, 0]}
          textPosition={[0, 0, 0.01]}
          planeRotation={[0, 0, 0]}
          type="depth"
        />
      )} */}
      <group dispose={null}>
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
        {/* Bottom Side 2 */}
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
        {/* Bottom Side 3 */}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.32 * depthScale, -0.23, 0.006 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.0184 * depthScale, -1.3, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Bottom Side 4 */}
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
    </group>
  );
}

export default OpenCabinet;

// Preload GLTF model
useGLTF.preload(OpenCabinetGlb);
