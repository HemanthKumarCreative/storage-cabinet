import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import DrawerCabinetGlb from "../modals/DrawerCabinetUpdated.glb";
import CabinetEdgesGlb from "../modals/CabinetEdges.glb";
import InnerDimension from "../Dimensions/InnerDimension";

// Main component function for rendering the DrawerCabinet
function DrawerCabinet(props) {
  // Load the GLTF models for the drawer cabinet and its edges
  const { nodes, materials } = useGLTF(DrawerCabinetGlb);
  const drawerRef = useRef();
  const [hovered, setHovered] = useState(false);
  const cabinetEdgesNodes = useGLTF(CabinetEdgesGlb).nodes;
  const cabinetEdgesMaterials = useGLTF(CabinetEdgesGlb).materials;

  // Destructure props to get depth, width, and height
  const {
    depth,
    width,
    height,
    backPanel,
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

  // Load the texture based on the provided URL
  const texture = useTexture(textureUrl);
  const calculatedWidth = specialWidth === 0 ? 50 : specialWidth;

  // Animation for opening and closing the drawer
  useFrame(() => {
    if (drawerRef.current) {
      drawerRef.current.position.x = THREE.MathUtils.lerp(
        drawerRef.current.position.x,
        hovered ? 1.5 : 0.7, // Adjust these values to control the drawer opening distance
        0.1
      );
    }
  });

  // Scale and position configurations based on cabinet height
  const heightScale = {
    30: 1,
    45: 1.5,
    60: 2,
  };

  const drawerPositionY = {
    30: 0.315,
    45: 0.615,
    60: 0.94,
  };

  const verticalPosition = {
    30: 0,
    45: 0.16,
    60: 0.28,
  };

  // Adjust scales based on depth
  let depthScale = 1;
  let widthScale = specialWidth
    ? calculatedWidth / 25
    : densityFactor[configWidth][density] / 50;
  let depthPositionX = -0.595;
  let doorPositionX = 0.1;
  let hingePosX = 0.522;
  let topPositionY = {
    30: 0,
    45: 0.6,
    60: 1.3,
  };
  const decimal = {
    100: 0.01,
    75: 0.02,
    50: 0.08,
    25: 0.14,
  };

  // Convert cm to feet and inches
  const convertToFeetInches = (cm) => {
    const inches = cm / 2.54;
    const feet = Math.ceil(inches / 12);
    return `${feet}'`;
  };

  // Adjust depth scale and positions based on depth prop
  switch (depth) {
    case "24cm":
      depthScale = 1;
      doorPositionX *= 0.05;
      break;
    case "32cm":
      depthScale = 1.33;
      depthPositionX *= 1.33; // Adjust X position for 32cm depth
      doorPositionX *= 1.5;
      hingePosX *= 1.33;
      break;
    case "40cm":
      depthScale = 1.66;
      depthPositionX *= 1.66; // Adjust X position for 40cm depth
      doorPositionX *= 2.5;
      hingePosX *= 1.66;
      break;
    default:
      break;
  }

  // Toggle drawer opening state on click
  const openDrawer = (event) => {
    event.stopPropagation();
    setHovered(!hovered);
  };

  // Calculate text size for dimension labels
  const textSize = (text, fontSize) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Arial`;
    const metrics = context.measureText(text);
    return { width: metrics.width, height: fontSize };
  };

  // Text and size configurations for cabinet dimensions
  const heightText = ` ${cabinetHeight} `;
  const heightSize = textSize(heightText, 24);

  const widthText = `W : ${widthScale * 50}`;
  const widthSize = textSize(widthText, 24);

  const depthText = `D : ${depth.slice(0, 2)}`;
  const depthSize = textSize(depthText, 24);

  return (
    <group {...props} dispose={null}>
      {/* Group for cabinet components */}
      <group
        position={[0, verticalPosition[cabinetHeight], 0]}
        scale={[1, heightScale[cabinetHeight], 1]}
      >
        {/* Left plank */}
        <mesh
          geometry={nodes.left_plank003.geometry}
          material={materials.Material}
          position={[0.002, 0.003, -0.006]}
          scale={[depthScale, 1, 1]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={texture}
            attach="material"
            color={colorCodes[color]}
          />
        </mesh>
        {/* Right plank */}
        <mesh
          geometry={nodes.right_plank003.geometry}
          material={materials["Material.003"]}
          position={[0.004, 0.148, -1.49 * widthScale]}
          scale={[depthScale, 1, 1]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={texture}
            attach="material"
            color={colorCodes[color]}
          />
        </mesh>
        {/* Back plank */}
        <mesh
          geometry={nodes.back_plank003.geometry}
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
        {/* Middle Edges */}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.625 * depthScale, 0.4, -1.488 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.595, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.625 * depthScale, 0.4, 0]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.595, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.625 * depthScale, 0.4, 0]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.595, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
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
      <group position={[0, topPositionY[cabinetHeight], 0]}>
        {/* Top plank */}
        <mesh
          geometry={nodes.top_plank003.geometry}
          material={materials["Material.002"]}
          position={[-0.001, 1.023, -0.735 * widthScale]}
          scale={[depthScale, 2, widthScale - decimal[density]]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={texture}
            attach="material"
            color={colorCodes[color]}
          />
        </mesh>
        {/* Top Edges */}
        <mesh
          geometry={cabinetEdgesNodes.edges003.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.63 * depthScale, 1.023, -0.744 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.955, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        <mesh
          geometry={cabinetEdgesNodes.edges003.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.63 * depthScale, 1.023, -0.744 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.955, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
      </group>
      <group position={[0, 0, 0]}>
        {/* Drawer */}
        <group
          position={[doorPositionX, drawerPositionY[cabinetHeight], 0]}
          scale={[1, 1, widthScale]}
          onClick={openDrawer}
          ref={drawerRef}
          castShadow
          receiveShadow
        >
          <mesh
            geometry={nodes.front_drawer.geometry}
            material={materials["Material.004"]}
          >
            <meshStandardMaterial
              map={texture}
              attach="material"
              color={colorCodes[color]}
            />
          </mesh>
          <mesh
            geometry={nodes.screws_front.geometry}
            material={materials["Material.010"]}
          />
          <mesh
            geometry={nodes.inner_drawer.geometry}
            material={materials["Material.008"]}
          >
            <meshStandardMaterial
              map={texture}
              attach="material"
              color={colorCodes[color]}
            />
          </mesh>
          <mesh
            geometry={nodes.drawer_edges.geometry}
            material={materials["Material.006"]}
          />
        </group>
        {/* Drawer Handles */}
        <mesh
          geometry={nodes.drawer_handle_right.geometry}
          material={materials["Material.011"]}
          position={[hingePosX, drawerPositionY[cabinetHeight], 0]}
        />
        <mesh
          geometry={nodes.drawer_handle_left.geometry}
          material={materials["Material.011"]}
          position={[-hingePosX, drawerPositionY[cabinetHeight], 0]}
        />
      </group>
      {/* Dimension text */}
      {dimensions && (
        <>
          <Text
            position={[
              0,
              2.0,
              0.4,
            ]} /* Adjusted Y and Z positions for better visibility */
            fontSize={0.2}
            color="black"
            anchorX="center"
            anchorY="middle"
            rotation={[-Math.PI / 2, 0, 0]}
          >
            {heightText}
          </Text>
          <Text
            position={[0.75, -0.3, 0]} /* Adjusted X, Y, and Z positions for better visibility */
            fontSize={0.2}
            color="black"
            anchorX="center"
            anchorY="middle"
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          >
            {widthText}
          </Text>
          <Text
            position={[0, -1, -1]} /* Adjusted Y and Z positions for better visibility */
            fontSize={0.2}
            color="black"
            anchorX="center"
            anchorY="middle"
            rotation={[0, 0, 0]}
          >
            {depthText}
          </Text>
        </>
      )}
    </group>
  );
}

// Preload the GLTF models
useGLTF.preload(DrawerCabinetGlb);
useGLTF.preload(CabinetEdgesGlb);

export default DrawerCabinet;
