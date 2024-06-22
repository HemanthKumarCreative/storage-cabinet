import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css"; // Import the CSS file
import SmallCabinet from "./Cabinets/SmallCabinet";
import OpenCabinet from "./Cabinets/OpenCabinet";
import DrawerCabinet from "./Cabinets/DrawerCabinet";
import StorageCabinet from "./Cabinets/StorageCabinet";
import Person from "./Cabinets/Person";
import Floor from "./Cabinets/Floor";
import Configurator from "./Configurator";

export default function App() {
  const [configuration, setConfiguration] = useState({
    style: "",
    density: 31,
    width: 450,
    height: 293,
    depth: "24cm", // Initial depth value
    backPanel: "ON",
    finish: "Plywood",
    color: "",
  });

  const horizontalAlignment = (count) => {
    const groups = [];

    for (let i = -8; i < count * 1.5 - 8; i += 1.5) {
      const group_183_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, -1.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
        </group>
      );

      const group_223_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, -0.1, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
        </group>
      );

      const group_253_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, 1.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, -0.9, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
        </group>
      );

      const group_293_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, 2.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, 0.4, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, -0.9, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
        </group>
      );

      const group_323_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, 3.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, 1.7, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, 0.4, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, -0.9, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
        </group>
      );

      const group_363_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, 5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <SmallCabinet
            position={[0, 3, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, 1.7, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, 0.4, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, -0.9, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
          />
        </group>
      );

      const height = configuration.height;
      let group = group_293_cm;

      if (height <= 183) {
        group = group_183_cm;
      } else if (height <= 223) {
        group = group_223_cm;
      } else if (height <= 253) {
        group = group_253_cm;
      } else if (height <= 293) {
        group = group_293_cm;
      } else if (height <= 323) {
        group = group_323_cm;
      } else if (height <= 363) {
        group = group_363_cm;
      } else {
        group = group_293_cm;
      }

      groups.push(group);
    }

    return groups;
  };

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        shadows
        gl={{ antialias: true }}
        style={{ cursor: "grabbing" }}
      >
        <ambientLight intensity={2} />
        <spotLight
          position={[10, 10, 10]}
          angle={Math.PI / 6}
          penumbra={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} castShadow />

        <Floor receiveShadow />

        <group rotation={[0, Math.PI / 8, 0]}>
          <Person
            position={[-9, -5.5, 0.8]}
            scale={[0.04, 0.03, 0.04]}
            rotation={[-Math.PI / 2, 0, Math.PI / 3]}
            receiveShadow
          />
          {horizontalAlignment(8)}
        </group>
        <OrbitControls />
      </Canvas>
      <Configurator
        configuration={configuration}
        setConfiguration={setConfiguration}
      />
    </div>
  );
}
