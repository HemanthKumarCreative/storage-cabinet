import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import DrawerCabinetGlb from "../modals/DrawerCabinetUpdated.glb";

function DrawerCabinet(props) {
  const { nodes, materials } = useGLTF(DrawerCabinetGlb);
  const drawerRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Destructure props to get depth
  const { depth, backPanel, specialWidth } = props;

  const width = specialWidth === 0 ? 50 : specialWidth;
  useFrame(() => {
    if (drawerRef.current) {
      drawerRef.current.position.x = THREE.MathUtils.lerp(
        drawerRef.current.position.x,
        hovered ? 1.5 : 0.7, // Adjust these values to control the drawer opening distance
        0.1
      );
    }
  });

  // Adjust scales based on depth
  let depthScale = 1;
  let widthScale = specialWidth ? width / 25 : 1;
  let depthPositionX = -0.595;
  let doorPositionX = 0.1;
  let hingePosX = 0.522;

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

  const openDoor = (event) => {
    event.stopPropagation();
    setHovered(!hovered);
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.left_plank003.geometry}
        material={materials.Material}
        position={[0.002, 0.003, -0.006]}
        scale={[depthScale, 1, widthScale]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.right_plank003.geometry}
        material={materials["Material.003"]}
        position={[0.004, 0.148, -1.494 * widthScale]}
        scale={[depthScale, 1, widthScale]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.top_plank003.geometry}
        material={materials["Material.002"]}
        position={[-0.001, 1.023, -0.744 * widthScale]}
        scale={[depthScale, 1, widthScale]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.bottom_plank003.geometry}
        material={materials["Material.004"]}
        position={[-0.008, -0.267, -0.742 * widthScale]}
        scale={[depthScale, 1, widthScale]} // Adjusted scale based on depth
      />
      <mesh
        geometry={nodes.back_plank003.geometry}
        material={materials["Material.005"]}
        position={[depthPositionX, 0.315, -0.746 * widthScale]}
        scale={[1, 0.958, widthScale]}
      />
      <group
        ref={drawerRef}
        position={[0.581, 0.315, -0.754 * widthScale]}
        scale={[depthScale, 1, widthScale]} // Adjusted scale based on depth
        onPointerUp={openDoor}
      >
        <mesh
          geometry={nodes.drawer_back001.geometry}
          material={materials["Material.007"]}
          rotation={[0, 1.571, 0]}
          scale={[0.924, 0.863, 1]}
          position={[doorPositionX, 0, 0]}
        >
          <mesh
            geometry={nodes.drawe_left.geometry}
            material={materials["Material.009"]}
            position={[-0.687, -0.038, -0.697]}
            rotation={[0, -1.571, 0]}
            scale={[0.924, 1, 1.082]}
          >
            <mesh
              geometry={nodes.slider_left.geometry}
              material={materials["Material.011"]}
              position={[0.077, -0.435, 0.057]}
              rotation={[-Math.PI, 0, 0]}
              scale={[0.397, 0.025, 0.02]}
            />
          </mesh>
          <mesh
            geometry={nodes.drawer_back.geometry}
            material={materials["Material.010"]}
            position={[-0.134, -0.031, -1.125]}
          />
          <mesh
            geometry={nodes.drawer_bottom.geometry}
            material={materials["Material.034"]}
            position={[-0.134, -0.568, -0.691]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1, 0.863, 0.743]}
          />
          <mesh
            geometry={nodes.drawer_right.geometry}
            material={materials["Material.008"]}
            position={[0.673, -0.038, -0.697]}
            rotation={[0, -1.571, 0]}
            scale={[0.924, 1, 1.082]}
          >
            <mesh
              geometry={nodes.slider_right.geometry}
              material={materials["Material.011"]}
              position={[0.119, -0.435, -0.052]}
              scale={[0.397, 0.025, 0.02]}
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(DrawerCabinetGlb);

export default DrawerCabinet;
