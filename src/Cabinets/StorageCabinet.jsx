import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import StorageCabinetGlb from "../modals/StorageCabinetUpdated.glb";
import CabinetEdgesGlb from "../modals/CabinetEdges.glb";
import InnerDimension from "../Dimensions/InnerDimension";

function StorageCabinet(props) {
  const { nodes, materials } = useGLTF(StorageCabinetGlb);
  const cabinetEdgesNodes = useGLTF(CabinetEdgesGlb).nodes;
  const cabinetEdgesMaterials = useGLTF(CabinetEdgesGlb).materials;

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

  const heightText = `100`;
  const heightSize = textSize(heightText, 24);

  const widthText = `W : ${widthScale * 50}`;
  const widthSize = textSize(widthText, 24);

  const depthText = `D : ${depth.slice(0, 2)}`;
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
        {/* Dimensions */}
        {/* Height */}
        {dimensions && (
          <InnerDimension
            heightSize={heightSize}
            heightText={heightText}
            groupPosition={[0, 0.3, 0.6]}
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
            heightText={heightText}
            groupPosition={[0, -0.3, 0.6]}
            groupRotation={[0, Math.PI / 2, 0]}
            textRotation={[0, 0, 0]}
            textPosition={[0, 0, 0.01]}
            planeRotation={[0, 0, 0]}
            type="width"
          />
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
          position={[-0.625 * depthScale, 0, -1.488 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.965, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Middle Edge 2 */}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.625 * depthScale, 0, 0]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.965, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Middle Edge 3 */}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.625 * depthScale, 0, 0]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.965, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Middle Edge 4 Red*/}
        <mesh
          geometry={cabinetEdgesNodes.edges002.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.625 * depthScale, 0, -1.5 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.018, -0.965, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Bottom Side 1 */}
        <mesh
          geometry={cabinetEdgesNodes.edges001.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.32 * depthScale, -1.023, -1.5 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.0186 * depthScale, -1.3, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Bottpm Side 2 */}
        <mesh
          geometry={cabinetEdgesNodes.edges003.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[-0.61 * depthScale, -1.023, -0.744 * widthScale]}
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
          position={[-0.32 * depthScale, -1.023, 0.006 * widthScale]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.0184 * depthScale, -1.3, -0.027]}
        >
          <meshStandardMaterial color="white" attach="material" />
        </mesh>
        {/* Bottom side 4 */}
        <mesh
          geometry={cabinetEdgesNodes.edges003.geometry}
          material={cabinetEdgesMaterials["Material.012"]}
          position={[0.61 * depthScale, -1.023, -0.744 * widthScale]}
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

useGLTF.preload(StorageCabinetGlb);
useGLTF.preload(CabinetEdgesGlb);

export default StorageCabinet;
