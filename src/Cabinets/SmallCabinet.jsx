import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import SmallCabinetGlb from "../modals/SmallCabinet.glb";
import CabinetEdgesGlb from "../modals/CabinetEdges.glb";
import InnerDimension from "../Dimensions/InnerDimension";

/**
 * SmallCabinet Component
 * This component renders a 3D model of a small cabinet with interactive door functionality.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} The 3D model of the small cabinet
 */
function SmallCabinet(props) {
  // Load GLTF models for the cabinet and its edges
  const { nodes, materials } = useGLTF(SmallCabinetGlb);
  const cabinetEdgesNodes = useGLTF(CabinetEdgesGlb).nodes;
  const cabinetEdgesMaterials = useGLTF(CabinetEdgesGlb).materials;

  // Reference for the cabinet door
  const doorRef = useRef();
  // State to track if the door is hovered (used for opening/closing the door)
  const [isHovered, setIsHovered] = useState(false);

  // Destructure props to get depth and other necessary parameters
  const {
    depth,
    specialWidth,
    densityFactor,
    configWidth,
    density,
    textureUrl,
    color,
    colorCodes,
    dimensions,
    units,
    cabinetHeight,
  } = props;

  // Load texture from the provided URL
  const texture = useTexture(textureUrl);

  const width = specialWidth === 0 ? 50 : specialWidth;

  // Animate the door opening and closing based on hover state
  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y = isHovered
        ? Math.min(Math.PI / 2, doorRef.current.rotation.y + 0.05)
        : Math.max(0, doorRef.current.rotation.y - 0.05);
    }
  });

  // Adjust scales and positions based on depth and width
  let depthScale = 1;
  let widthScale = specialWidth
    ? width / 25
    : densityFactor[configWidth][density] / 50;
  let depthPositionX = -0.6;
  let doorPositionX = 0.618; // Adjusted position for door
  let hingePosX = 0.522;

  const heightScale = {
    30: 1,
    45: 1.4,
    60: 2,
  };

  const positionY = {
    30: 0,
    45: 0.48,
    60: 1.2,
  };

  const doorScaleY = {
    30: 0.9,
    45: 1.3,
    60: 1.9,
  };

  const doorPositionY = {
    30: 0.386,
    45: 0.65,
    60: 1.02,
  };

  const verticalPosition = {
    30: 0,
    45: 0.1,
    60: 0.2,
  };

  // Adjust depth scaling and positions based on the depth value
  switch (depth) {
    case "24cm":
      depthScale = 1;
      break;
    case "32cm":
      depthScale = 1.33;
      depthPositionX *= 1.4; // Adjust X position for 32cm depth
      doorPositionX *= 1.4;
      hingePosX *= 1.4;
      break;
    case "40cm":
      depthScale = 1.66;
      depthPositionX *= 1.7; // Adjust X position for 40cm depth
      doorPositionX *= 1.7;
      hingePosX *= 1.8;
      break;
    default:
      break;
  }

  // Handle door open/close interaction
  const openDoor = (event) => {
    event.stopPropagation();
    setIsHovered(!isHovered);
  };

  // Helper functions for dimension calculations
  const decimal = {
    100: 0,
    75: 0,
    50: 0.08,
    25: 0.14,
  };

  const convertToFeetInches = (cm) => {
    const inches = cm / 2.54;
    const feet = Math.ceil(inches / 12);
    return `${feet}'`;
  };

  const textSize = (text, fontSize) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Arial`;
    const metrics = context.measureText(text);
    return { width: metrics.width, height: fontSize };
  };

  const heightText = ` ${cabinetHeight} `;
  const heightSize = textSize(heightText, 24);

  const widthText = `W : ${widthScale * 50}`;
  const widthSize = textSize(widthText, 24);

  const depthText = `D : ${depth.slice(0, 2)}`;
  const depthSize = textSize(depthText, 24);

  // Render the 3D model of the cabinet
  return (
    <group {...props} dispose={null}>
      <group position={[0, positionY[cabinetHeight], 0]}>
        {/* Top Side1 */}
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
        {/* Top Side 2 */}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.308 * depthScale, 1.023, 0.023 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018 * depthScale, -1.3, -0.005]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Top Side 3 */}
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
        {/* Top Side 4 */}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.308 * depthScale, 1.023, -1.5 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018 * depthScale, -1.3, -0.02]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        <mesh
          geometry={nodes.top_plank001.geometry}
          material={materials["Material.002"]}
          position={[-0.001, 1.023, -0.744]}
        >
          <meshStandardMaterial
            map={texture}
            attach="material"
            color={colorCodes[color]}
          />
        </mesh>
      </group>
      <group
        scale={[1, heightScale[cabinetHeight], 1]}
        position={[0, verticalPosition[cabinetHeight], 0]}
      >
        <mesh
          geometry={nodes.left_plank001.geometry}
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
        <mesh
          geometry={nodes.right_plank001.geometry}
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
        {/* Middle Edge 4 */}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.625 * depthScale, 0.4, -1.5 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.595, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        <mesh
          geometry={nodes.back_plank001.geometry}
          material={materials["Material.005"]}
          position={[depthPositionX, 0.315, -0.746 * widthScale]}
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
      </group>
      <mesh
        geometry={nodes.bottom_plank001.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -0.267, -0.742 * widthScale]}
        scale={[depthScale, 1, widthScale - decimal[density]]} // Adjusted scale based on depth
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          attach="material"
          color={colorCodes[color]}
        />
      </mesh>
      <mesh
        ref={doorRef}
        geometry={nodes.door001.geometry}
        material={materials["Material.001"]}
        position={[
          doorPositionX,
          doorPositionY[cabinetHeight],
          -1.444 * widthScale - decimal[density],
        ]}
        rotation={[0, 0, 0]} // Initial rotation state
        scale={[2, doorScaleY[cabinetHeight], widthScale + decimal[density]]}
        onPointerUp={openDoor}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          attach="material"
          color={colorCodes[color]}
        />
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
            groupPosition={[0.2, 0.1, 0.7]}
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
            groupPosition={[0.2, -0.5, 0.7]}
            groupRotation={[0, Math.PI / 2, 0]}
            textRotation={[0, 0, 0]}
            textPosition={[0, 0, 0.01]}
            planeRotation={[0, 0, 0]}
            type="width"
          />
        )}
      </mesh>
      <mesh
        geometry={nodes.hinge_top001.geometry}
        material={materials["Material.006"]}
        position={[hingePosX, 0.791, -1.449 * widthScale]}
      />
      <mesh
        geometry={nodes.hinge_bottom001.geometry}
        material={materials["Material.006"]}
        position={[hingePosX, -0.014, -1.449 * widthScale]}
      />
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

// Preload the GLTF model to ensure it's loaded before usage
useGLTF.preload(SmallCabinetGlb);

export default SmallCabinet;
