import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import SmallCabinetGlb from "../modals/SmallCabinet.glb";
import StorageCabinetGlb from "../modals/StorageCabinetUpdated.glb";

function SmallCabinet(props) {
  const { nodes, materials } = useGLTF(SmallCabinetGlb);
  const StorageCabinetNode = useGLTF(StorageCabinetGlb);
  const storageCabinetNodes = StorageCabinetNode.nodes;
  const storageCabinetMaterials = StorageCabinetNode.materials;

  const doorRef = useRef();
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
  } = props;

  const texture = useTexture(textureUrl);

  const width = specialWidth === 0 ? 50 : specialWidth;
  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y = isHovered
        ? Math.min(Math.PI / 2, doorRef.current.rotation.y + 0.05)
        : Math.max(0, doorRef.current.rotation.y - 0.05);
    }
  });

  // Adjust scales based on depth and width
  let depthScale = 1;
  let widthScale = specialWidth
    ? width / 25
    : densityFactor[configWidth][density] / 50;
  let depthPositionX = -0.6;
  let doorPositionX = 0.618; // Adjusted position for door
  let hingePosX = 0.522;

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

  const openDoor = (event) => {
    event.stopPropagation();
    setIsHovered(!isHovered);
  };

  const decimal = {
    100: 0,
    75: 0,
    50: 0.08,
    25: 0.14,
  };

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

  return (
    <group {...props} dispose={null}>
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
      <mesh
        ref={doorRef}
        geometry={nodes.door001.geometry}
        material={materials["Material.001"]}
        position={[
          doorPositionX,
          0.386,
          -1.444 * widthScale - decimal[density],
        ]}
        rotation={[0, 0, 0]} // Initial rotation state
        scale={[2, 1, widthScale + decimal[density]]}
        onPointerUp={openDoor}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          attach="material"
          color={colorCodes[color]}
        />
        {/* Text and background chip for height */}
        {dimensions && (
          <group position={[0.01, 0.3, 0.7]}>
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
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {heightText}
            </Text>
          </group>
        )}
        {/* Text and background chip for width */}
        {dimensions && (
          <group position={[0.01, 0, 0.7]}>
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
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {widthText}
            </Text>
          </group>
        )}
        {/* Text and background chip for depth */}
        {dimensions && (
          <group position={[0.01, -0.3, 0.7]}>
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
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {depthText}
            </Text>
          </group>
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
      {density > 50 && (
        <mesh
          geometry={storageCabinetNodes.edges.geometry}
          material={storageCabinetMaterials["Material.012"]}
          position={[0.68 * depthScale, 0.35, -1.484 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.019 * depthScale, -0.6, -0.027 * widthScale]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload(SmallCabinetGlb);

export default SmallCabinet;
