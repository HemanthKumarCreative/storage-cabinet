import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import StorageCabinetGlb from "../modals/StorageCabinet.gltf";

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

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.left_plank.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006 * widthScale]}
        scale={[depthScale, 1, 2]} // Adjusted scale based on depth and width
        map={texture}
      >
        <meshStandardMaterial map={texture} color="#E2DFD2" attach="material" />
      </mesh>
      <mesh
        geometry={nodes.right_plank.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.484 * widthScale]}
        scale={[depthScale, 1, 2]} // Adjusted scale based on depth and width
      >
        <meshStandardMaterial map={texture} color="#E2DFD2" attach="material" />
      </mesh>
      <mesh
        geometry={nodes.top_plank.geometry}
        material={materials["Material.002"]}
        position={[-0.001, 1.023, -0.744 * widthScale]}
        scale={[depthScale, 2, widthScale]} // Adjusted scale based on depth and width
      >
        <meshStandardMaterial map={texture} color="#E2DFD2" attach="material" />
      </mesh>
      <mesh
        geometry={nodes.bottom_plank.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -1.025, -0.742 * widthScale]}
        scale={[depthScale, 2, widthScale]} // Adjusted scale based on depth and width
      >
        <meshStandardMaterial map={texture} color="#E2DFD2" attach="material" />
      </mesh>
      <mesh
        geometry={nodes.back_plank.geometry}
        material={materials["Material.005"]}
        position={[depthPositionX, 0.001, -0.746 * widthScale]}
        scale={[1, 0.958, widthScale]}
      >
        <meshStandardMaterial map={texture} color="#E2DFD2" attach="material" />
      </mesh>
      <mesh
        ref={doorRef}
        geometry={nodes.door.geometry}
        material={materials["Material.001"]}
        position={[doorPositionX, 0.033, -1.446 * widthScale]}
        scale={[2, 1, widthScale]}
        onPointerUp={openDoor}
      >
        <meshStandardMaterial map={texture} attach="material" />
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
        scale={[depthScale - 0.05, 2, widthScale]}
      >
        <meshStandardMaterial map={texture} attach="material" />
      </mesh>
    </group>
  );
}

useGLTF.preload(StorageCabinetGlb);

export default StorageCabinet;
