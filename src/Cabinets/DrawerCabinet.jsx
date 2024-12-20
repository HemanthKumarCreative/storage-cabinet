import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import DrawerCabinetGlb from "../modals/DrawerCabinetUpdated.glb";
import CabinetEdgesGlb from "../modals/CabinetEdges.glb";
import InnerDimension from "../Dimensions/InnerDimension";

function DrawerCabinet(props) {
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

  const texture = useTexture(textureUrl);
  const calculatedWidth = specialWidth === 0 ? 50 : specialWidth;

  useFrame(() => {
    if (drawerRef.current) {
      drawerRef.current.position.x = THREE.MathUtils.lerp(
        drawerRef.current.position.x,
        hovered ? 1.5 : 0.7, // Adjust these values to control the drawer opening distance
        0.1
      );
    }
  });

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

  const convertToFeetInches = (cm) => {
    const inches = cm / 2.54;
    const feet = Math.ceil(inches / 12);
    return `${feet}'`;
  };

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

  const openDrawer = (event) => {
    event.stopPropagation();
    setHovered(!hovered);
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

  return (
    <group {...props} dispose={null}>
      {/* Meshes for cabinet components */}
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
      </group>
      {/* Bottom plank */}
      <mesh
        geometry={nodes.bottom_plank003.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -0.267, -0.735 * widthScale]}
        scale={[depthScale, 1, widthScale - decimal[density]]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={texture}
          attach="material"
          color={colorCodes[color]}
        />
      </mesh>
      {/* Drawer group */}
      <group
        ref={drawerRef}
        position={[0.581, drawerPositionY[cabinetHeight], -0.754 * widthScale]}
        scale={[
          depthScale,
          heightScale[cabinetHeight],
          widthScale + decimal[density],
        ]}
        onPointerUp={openDrawer}
        castShadow
        receiveShadow
      >
        {/* Drawer mesh */}
        <mesh
          geometry={nodes.drawer_back001.geometry}
          material={materials["Material.007"]}
          rotation={[0, 1.571, 0]}
          scale={[0.924, 0.863, 1]}
          position={[doorPositionX, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={texture}
            attach="material"
            color={colorCodes[color]}
          />
          {/* Left side of drawer */}
          <mesh
            geometry={nodes.drawe_left.geometry}
            material={materials["Material.009"]}
            position={[-0.687, -0.038, -0.697]}
            rotation={[0, -1.571, 0]}
            scale={[0.924, 1, 1.082]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              map={texture}
              attach="material"
              color={colorCodes[color]}
            />
            {/* Slider left */}
            <mesh
              geometry={nodes.slider_left.geometry}
              material={materials["Material.011"]}
              position={[0.077, -0.435, 0.057]}
              rotation={[-Math.PI, 0, 0]}
              scale={[0.397, 0.025, 0.02]}
              castShadow
              receiveShadow
            />
          </mesh>
          {/* Back of drawer */}
          <mesh
            geometry={nodes.drawer_back.geometry}
            material={materials["Material.010"]}
            position={[-0.134, -0.031, -1.125]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              map={texture}
              attach="material"
              color={colorCodes[color]}
            />
          </mesh>
          {/* Bottom of drawer */}
          <mesh
            geometry={nodes.drawer_bottom.geometry}
            material={materials["Material.034"]}
            position={[-0.134, -0.568, -0.691]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1, 0.863, 0.743]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              map={texture}
              attach="material"
              color={colorCodes[color]}
            />
          </mesh>
          {/* Right side of drawer */}
          <mesh
            geometry={nodes.drawer_right.geometry}
            material={materials["Material.008"]}
            position={[0.673, -0.038, -0.697]}
            rotation={[0, -1.571, 0]}
            scale={[0.924, 1, 1.082]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              map={texture}
              attach="material"
              color={colorCodes[color]}
            />
            <mesh
              geometry={nodes.slider_right.geometry}
              material={materials["Material.011"]}
              position={[0.119, -0.435, -0.052]}
              scale={[0.397, 0.025, 0.02]}
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
                groupPosition={[0.9, 0.2, 0.6]}
                groupRotation={[0, Math.PI / 2, 0]}
                textRotation={[0, 0, 0]}
                textPosition={[0, 0, 0.01]}
                planeRotation={[0, 0, 0]}
                planePosition={[0, 0, 0]}
                type="height"
                lineColor="white"
              />
            )}
            {/* Width */}
            {dimensions && (
              <InnerDimension
                heightSize={heightSize}
                heightText={
                  units === "cm" ? ` 50 ` : `${convertToFeetInches(50)}`
                }
                groupPosition={[0.9, -0.3, 0.6]}
                groupRotation={[0, Math.PI / 2, 0]}
                textRotation={[0, 0, 0]}
                textPosition={[0, 0, 0.01]}
                planeRotation={[0, 0, 0]}
                planePosition={[0, 0, 0]}
                type="width"
                lineColor="white"
              />
            )}
          </mesh>
        </mesh>
      </group>
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
    </group>
  );
}

useGLTF.preload(DrawerCabinetGlb);

export default DrawerCabinet;
