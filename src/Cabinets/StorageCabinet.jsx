import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import StorageCabinetGlb from "../modals/StorageCabinetUpdated.glb";

function StorageCabinet(props) {
  const { nodes, materials } = useGLTF(StorageCabinetGlb);
  const doorRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // Destructure props to get depth and specialWidth
  const {
    depth,
    backPanel,
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
      doorRef.current.rotation.y = THREE.MathUtils.lerp(
        doorRef.current.rotation.y,
        isHovered ? Math.PI / 2 : 0,
        0.1
      );
    }
  });

  // Adjust scales based on depth and width
  let depthScale = 1;
  let widthScale = specialWidth
    ? width / 25
    : densityFactor[configWidth][density] / 50;
  let depthPositionX = -0.6;
  let doorPositionX = 0.624;
  let hingePosX = 0.522;

  switch (depth) {
    case "24cm":
      depthScale = 1;
      break;
    case "32cm":
      depthScale = 1.33;
      depthPositionX *= 1.4; // Adjust X position for 32cm depth
      doorPositionX *= 1.33;
      hingePosX *= 1.4;
      break;
    case "40cm":
      depthScale = 1.66;
      depthPositionX *= 1.7; // Adjust X position for 40cm depth
      doorPositionX *= 1.66;
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
    100: 0.01,
    75: 0.02,
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

  const heightText = `H : ${depthScale * 100}`;
  const heightSize = textSize(heightText, 24);

  const widthText = `W : ${widthScale * 50}`;
  const widthSize = textSize(widthText, 24);

  const depthText = `D : ${depthScale * 40}`;
  const depthSize = textSize(depthText, 24);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.left_plank.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006 * widthScale]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth and width
        map={texture}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          color={colorCodes[color]}
          attach="material"
        />
      </mesh>
      <mesh
        geometry={nodes.right_plank.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484 * widthScale]}
        scale={[depthScale, 1, 1]} // Adjusted scale based on depth and width
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          color={colorCodes[color]}
          attach="material"
        />
      </mesh>
      <mesh
        geometry={nodes.top_plank.geometry}
        material={materials["Material.002"]}
        position={[-0.001, 1.023, -0.744 * widthScale]}
        scale={[depthScale, 2, widthScale - decimal[density]]} // Adjusted scale based on depth and width
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          color={colorCodes[color]}
          attach="material"
        />
      </mesh>
      <mesh
        geometry={nodes.bottom_plank.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -1.025, -0.742 * widthScale]}
        scale={[depthScale, 1, widthScale - decimal[density]]} // Adjusted scale based on depth and width
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          color={colorCodes[color]}
          attach="material"
        />
      </mesh>
      <mesh
        geometry={nodes.back_plank.geometry}
        material={materials["Material.005"]}
        position={[depthPositionX, 0.001, -0.746 * widthScale]}
        scale={[1, 0.958, widthScale]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          color={colorCodes[color]}
          attach="material"
        />
      </mesh>
      <mesh
        ref={doorRef}
        geometry={nodes.door.geometry}
        material={materials["Material.001"]}
        position={[
          doorPositionX,
          0.033,
          -1.446 * widthScale - decimal[density],
        ]}
        scale={[2, 1, widthScale + decimal[density]]}
        onPointerUp={openDoor}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={colorCodes[color]}
          map={texture}
          attach="material"
        />
        {/* Text and background chip for height */}
        {dimensions && (
          <group position={[0, 0.5, 0.7]}>
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
          <group position={[0, 0, 0.7]}>
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
          <group position={[0, -0.5, 0.7]}>
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
        geometry={nodes.hinge_top.geometry}
        material={materials["Material.006"]}
        position={[hingePosX, 0.743, -1.449 * widthScale]}
      />
      <mesh
        geometry={nodes.hinge_bottom.geometry}
        material={materials["Material.006"]}
        position={[hingePosX, -0.64, -1.449 * widthScale]}
      />
      <mesh
        geometry={nodes.inner_shelf.geometry}
        material={materials.Material}
        position={[0, -0.202, -0.744 * widthScale]}
        scale={[depthScale - 0.05, 2, widthScale - decimal[density]]}
      >
        <meshStandardMaterial map={texture} attach="material" />
      </mesh>
      {density > 50 && (
        <mesh
          geometry={nodes.edges.geometry}
          material={materials["Material.012"]}
          position={[0.68 * depthScale, -0.02, -1.484 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.019 * depthScale, -0.9, -0.027 * widthScale]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload(StorageCabinetGlb);

export default StorageCabinet;
