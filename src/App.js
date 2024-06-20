import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css"; // Import the CSS file
import SmallCabinet from "./Cabinets/SmallCabinet";
import OpenCabinet from "./Cabinets/OpenCabinet";
import DrawerCabinet from "./Cabinets/DrawerCabinet";
import StorageCabinet from "./Cabinets/StorageCabinet";
import Person from "./Cabinets/Person";

function PersonPlaceholder(props) {
  const { position, ...restProps } = props;

  return (
    <group position={position}>
      {/* Body */}
      <mesh {...restProps}>
        <boxGeometry args={[0.3, 1.8, 0.2]} /> {/* Width, Height, Depth */}
        <meshStandardMaterial color="blue" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />{" "}
        {/* Radius, WidthSegments, HeightSegments */}
        <meshStandardMaterial color="pink" />
      </mesh>
    </group>
  );
}

export default function App() {
  const horizontalAlignment = (count) => {
    const groups = [];

    for (let i = -8; i < count * 1.5 - 8; i += 1.5) {
      const group = (
        <group position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet position={[0, 5, 0]} />
          <SmallCabinet position={[0, 3, 0]} />
          <OpenCabinet position={[0, 1.7, 0]} />
          <OpenCabinet position={[0, 0.4, 0]} />
          <OpenCabinet position={[0, -0.9, 0]} />
          <OpenCabinet position={[0, -2.2, 0]} />
          <DrawerCabinet position={[0, -3.5, 0]} />
          <StorageCabinet position={[0, -4.8, 0]} />
        </group>
      );
      groups.push(group);
    }

    return groups;
  };

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }} // Adjust camera position to have a better view
        shadows
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} />
        <Person
          position={[-9, 0, 0]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-Math.PI / 2, -Math.PI / 24, -Math.PI / 4]}
        />
        {/* Grouping cabinets and applying rotation to the group */}
        {horizontalAlignment(8)}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
