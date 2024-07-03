import React, { useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css"; // Import the CSS file
import SmallCabinet from "./Cabinets/SmallCabinet";
import OpenCabinet from "./Cabinets/OpenCabinet";
import DrawerCabinet from "./Cabinets/DrawerCabinet";
import StorageCabinet from "./Cabinets/StorageCabinet";
import Person from "./Cabinets/Person";
import Floor from "./Cabinets/Floor";
import Configurator from "./Configurator";
import * as THREE from "three";
import VeneerTexture from "./textures/Veneer02.png";
import PlywoodTexture from "./textures/Veneer01.png";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import VerticalRule from "./Dimensions/VerticalRule";
import HorizontalRule from "./Dimensions/HorizontalRule";

export default function App() {
  const [configuration, setConfiguration] = useState({
    style: "grid",
    density: 100,
    width: 450,
    height: 240,
    depth: "24cm", // Initial depth value
    backPanel: "ON",
    finish: "Plywood",
    color: "green",
    books: "OFF",
    dimensions: "OFF",
    units: "cm",
  });

  const textureUrl = {
    Plywood: PlywoodTexture,
    Veneer: VeneerTexture,
  };

  const colorCodes = {
    green: "#9da18f",
    grey: "#808080",
    "dusty pink": "#AA644B",
    brown: "#6F595D",
    yellow: "#DFA967",
    violet: "#886A8E",
    "classic red": "#b84b4a",
    "dark brown": "#67272A",
    Walnut: "#957b63",
    Oak: "#ce9f6f",
    "White oak": "#D8B589",
  };

  const densityFactor = {
    450: { 100: 50, 75: 75, 50: 150, 25: 225 },
    400: { 100: 50, 75: 100, 50: 200, 25: 200 },
    350: { 100: 50, 75: 70, 50: 175, 25: 175 },
    250: { 100: 50, 75: 50, 50: 125, 25: 125 },
    150: { 100: 50, 75: 50, 50: 75, 25: 75 },
    50: { 100: 50, 75: 50, 50: 50, 25: 50 },
  };

  const verticalCabinConfig = {
    150: {
      storageCabinet01: { position: [0, -1.5, 0] },
      smallCabinet: null,
      openCabinet01: null,
      openCabinet02: null,
      openCabinet03: null,
      openCabinet04: null,
      drawerCabinet: { position: [0, -3.5, 0] },
      storageCabinet02: { position: [0, -4.8, 0] },
      measurementPole: {
        textPosition: [0, -1, 0.01],
        planePosition: [0, -1, 0],
        verticalLineStart: [0, -1, 0],
        verticalLineEnd: [0, 1, 0],
        bottomLineStart: [0, -1, 0],
        bottomLineEnd: [0, -3.5, 0],
        topHorizontalLine: [
          [-0.05 / 2, -1.2, 0],
          [0.05 / 2, -1.2, 0],
        ],
        bottomHorizontalLine: [
          [-0.05 / 2, -0.8, 0],
          [0.05 / 2, -0.8, 0],
        ],
      },
    },
    180: {
      storageCabinet01: { position: [0, -0.2, 0] },
      smallCabinet: null,
      openCabinet01: null,
      openCabinet02: null,
      openCabinet03: null,
      openCabinet04: { position: [0, -2.2, 0] },
      drawerCabinet: { position: [0, -3.5, 0] },
      storageCabinet02: { position: [0, -4.8, 0] },
      measurementPole: {
        textPosition: [0, -0.5, 0.01],
        planePosition: [0, -0.5, 0],
        verticalLineStart: [0, -0.5, 0],
        verticalLineEnd: [0, 2.1, 0],
        bottomLineStart: [0, -0.5, 0],
        bottomLineEnd: [0, -3.5, 0],
        topHorizontalLine: [
          [-0.05 / 2, -0.1, 0],
          [0.05 / 2, -0.1, 0],
        ],
        bottomHorizontalLine: [
          [-0.05 / 2, -0.8, 0],
          [0.05 / 2, -0.8, 0],
        ],
      },
    },
    210: {
      storageCabinet01: { position: [0, 1.19, 0] },
      smallCabinet: null,
      openCabinet01: null,
      openCabinet02: null,
      openCabinet03: { position: [0, -0.9, 0] },
      openCabinet04: { position: [0, -2.2, 0] },
      drawerCabinet: { position: [0, -3.5, 0] },
      storageCabinet02: { position: [0, -4.8, 0] },
      measurementPole: {
        textPosition: [0, 0.5, 0.01],
        planePosition: [0, 0.5, 0],
        verticalLineStart: [0, 0.5, 0],
        verticalLineEnd: [0, 3.4, 0],
        bottomLineStart: [0, 0.5, 0],
        bottomLineEnd: [0, -3.5, 0],
        topHorizontalLine: [
          [-0.05 / 2, 1.2, 0],
          [0.05 / 2, 1.2, 0],
        ],
        bottomHorizontalLine: [
          [-0.05 / 2, -0.8, 0],
          [0.05 / 2, -0.8, 0],
        ],
      },
    },
    240: {
      storageCabinet01: { position: [0, 2.4, 0] },
      smallCabinet: null,
      openCabinet01: null,
      openCabinet02: { position: [0, 0.31, 0] },
      openCabinet03: { position: [0, -0.9, 0] },
      openCabinet04: { position: [0, -2.2, 0] },
      drawerCabinet: { position: [0, -3.5, 0] },
      storageCabinet02: { position: [0, -4.8, 0] },
      measurementPole: {
        textPosition: [0, 1, 0.01],
        planePosition: [0, 1, 0],
        verticalLineStart: [0, 1, 0],
        verticalLineEnd: [0, 4.5, 0],
        bottomLineStart: [0, 1, 0],
        bottomLineEnd: [0, -3.5, 0],
        topHorizontalLine: [
          [-0.05 / 2, 2.3, 0],
          [0.05 / 2, 2.3, 0],
        ],
        bottomHorizontalLine: [
          [-0.05 / 2, -0.8, 0],
          [0.05 / 2, -0.8, 0],
        ],
      },
    },
    270: {
      storageCabinet01: { position: [0, 3.6, 0] },
      smallCabinet: null,
      openCabinet01: { position: [0, 1.6, 0] },
      openCabinet02: { position: [0, 0.31, 0] },
      openCabinet03: { position: [0, -0.9, 0] },
      openCabinet04: { position: [0, -2.2, 0] },
      drawerCabinet: { position: [0, -3.5, 0] },
      storageCabinet02: { position: [0, -4.8, 0] },
      measurementPole: {
        textPosition: [0, 1.5, 0.01],
        planePosition: [0, 1.5, 0],
        verticalLineStart: [0, 1.5, 0],
        verticalLineEnd: [0, 5.5, 0],
        bottomLineStart: [0, 1.5, 0],
        bottomLineEnd: [0, -3.5, 0],
        topHorizontalLine: [
          [-0.05 / 2, 3.3, 0],
          [0.05 / 2, 3.3, 0],
        ],
        bottomHorizontalLine: [
          [-0.05 / 2, -0.8, 0],
          [0.05 / 2, -0.8, 0],
        ],
      },
    },
    300: {
      storageCabinet01: { position: [0, 4.9, 0] },
      smallCabinet: { position: [0, 2.9, 0] },
      openCabinet01: { position: [0, 1.6, 0] },
      openCabinet02: { position: [0, 0.31, 0] },
      openCabinet03: { position: [0, -0.9, 0] },
      openCabinet04: { position: [0, -2.2, 0] },
      drawerCabinet: { position: [0, -3.5, 0] },
      storageCabinet02: { position: [0, -4.8, 0] },
      measurementPole: {
        textPosition: [0, 2, 0.01],
        planePosition: [0, 2, 0],
        verticalLineStart: [0, 2, 0],
        verticalLineEnd: [0, 6.7, 0],
        bottomLineStart: [0, 2, 0],
        bottomLineEnd: [0, -3.5, 0],
        topHorizontalLine: [
          [-0.05 / 2, 4.5, 0],
          [0.05 / 2, 4.5, 0],
        ],
        bottomHorizontalLine: [
          [-0.05 / 2, -0.8, 0],
          [0.05 / 2, -0.8, 0],
        ],
      },
    },
  };

  const horizontalAlignment = (count) => {
    const groups = [];

    const densityMultiplier = {
      450: {
        100: 1.5,
        75: 2.2,
        50: 4.5,
        25: 6.7,
      },
      400: {
        100: 1.5,
        75: 3,
        50: 6,
        25: 6,
      },
      350: {
        100: 1.5,
        75: 2.1,
        50: 5.2,
        25: 5.2,
      },
      250: {
        100: 1.5,
        75: 1.5,
        50: 3.75,
        25: 3.75,
      },
      150: {
        100: 1.5,
        75: 1.5,
        50: 2.2,
        25: 2.2,
      },
      50: {
        100: 1,
        75: 1,
        50: 1,
        25: 1,
      },
    };

    let counter = 0;
    for (
      let i = -8;
      i <
      count * densityMultiplier[configuration.width][configuration.density] - 8;
      i += densityMultiplier[configuration.width][configuration.density]
    ) {
      const group = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          {verticalCabinConfig[configuration.height].storageCabinet01 && (
            <StorageCabinet
              position={
                verticalCabinConfig[configuration.height].storageCabinet01
                  .position
              }
              receiveShadow
              width={configuration.width}
              height={configuration.height}
              depth={configuration.depth}
              backPanel={configuration.backPanel === "ON"}
              density={configuration.density}
              densityFactor={densityFactor}
              configWidth={configuration.width}
              textureUrl={textureUrl[configuration.finish]}
              color={configuration.color}
              colorCodes={colorCodes}
              dimensions={configuration.dimensions === "ON"}
              units={configuration.units}
            />
          )}
          {verticalCabinConfig[configuration.height].smallCabinet && (
            <SmallCabinet
              position={
                verticalCabinConfig[configuration.height].smallCabinet.position
              }
              receiveShadow
              width={configuration.width}
              height={configuration.height}
              depth={configuration.depth}
              backPanel={configuration.backPanel === "ON"}
              density={configuration.density}
              densityFactor={densityFactor}
              configWidth={configuration.width}
              textureUrl={textureUrl[configuration.finish]}
              color={configuration.color}
              colorCodes={colorCodes}
              dimensions={configuration.dimensions === "ON"}
              units={configuration.units}
            />
          )}
          {verticalCabinConfig[configuration.height].openCabinet01 && (
            <OpenCabinet
              position={
                verticalCabinConfig[configuration.height].openCabinet01.position
              }
              receiveShadow
              width={configuration.width}
              height={configuration.height}
              depth={configuration.depth}
              backPanel={configuration.backPanel === "ON"}
              density={configuration.density}
              densityFactor={densityFactor}
              configWidth={configuration.width}
              textureUrl={textureUrl[configuration.finish]}
              color={configuration.color}
              colorCodes={colorCodes}
              books={configuration.books === "ON"}
              dimensions={configuration.dimensions === "ON"}
              col={counter}
              row={0}
              units={configuration.units}
            />
          )}
          {verticalCabinConfig[configuration.height].openCabinet02 && (
            <OpenCabinet
              position={
                verticalCabinConfig[configuration.height].openCabinet02.position
              }
              receiveShadow
              width={configuration.width}
              height={configuration.height}
              depth={configuration.depth}
              backPanel={configuration.backPanel === "ON"}
              density={configuration.density}
              densityFactor={densityFactor}
              configWidth={configuration.width}
              textureUrl={textureUrl[configuration.finish]}
              color={configuration.color}
              colorCodes={colorCodes}
              books={configuration.books === "ON"}
              dimensions={configuration.dimensions === "ON"}
              col={counter}
              row={1}
              units={configuration.units}
            />
          )}
          {verticalCabinConfig[configuration.height].openCabinet03 && (
            <OpenCabinet
              position={
                verticalCabinConfig[configuration.height].openCabinet03.position
              }
              receiveShadow
              width={configuration.width}
              height={configuration.height}
              depth={configuration.depth}
              backPanel={configuration.backPanel === "ON"}
              density={configuration.density}
              densityFactor={densityFactor}
              configWidth={configuration.width}
              textureUrl={textureUrl[configuration.finish]}
              color={configuration.color}
              colorCodes={colorCodes}
              books={configuration.books === "ON"}
              dimensions={configuration.dimensions === "ON"}
              col={counter}
              row={2}
              units={configuration.units}
            />
          )}
          {verticalCabinConfig[configuration.height].openCabinet04 && (
            <OpenCabinet
              position={
                verticalCabinConfig[configuration.height].openCabinet04.position
              }
              receiveShadow
              width={configuration.width}
              height={configuration.height}
              depth={configuration.depth}
              backPanel={configuration.backPanel === "ON"}
              density={configuration.density}
              densityFactor={densityFactor}
              configWidth={configuration.width}
              textureUrl={textureUrl[configuration.finish]}
              color={configuration.color}
              colorCodes={colorCodes}
              books={configuration.books === "ON"}
              dimensions={configuration.dimensions === "ON"}
              col={counter}
              row={3}
              units={configuration.units}
            />
          )}
          {verticalCabinConfig[configuration.height].drawerCabinet && (
            <DrawerCabinet
              position={
                verticalCabinConfig[configuration.height].drawerCabinet.position
              }
              receiveShadow
              width={configuration.width}
              height={configuration.height}
              depth={configuration.depth}
              backPanel={configuration.backPanel === "ON"}
              density={configuration.density}
              densityFactor={densityFactor}
              configWidth={configuration.width}
              textureUrl={textureUrl[configuration.finish]}
              color={configuration.color}
              colorCodes={colorCodes}
              dimensions={configuration.dimensions === "ON"}
              units={configuration.units}
            />
          )}
          {verticalCabinConfig[configuration.height].storageCabinet02 && (
            <StorageCabinet
              position={
                verticalCabinConfig[configuration.height].storageCabinet02
                  .position
              }
              receiveShadow
              width={configuration.width}
              height={configuration.height}
              depth={configuration.depth}
              backPanel={configuration.backPanel === "ON"}
              density={configuration.density}
              densityFactor={densityFactor}
              configWidth={configuration.width}
              textureUrl={textureUrl[configuration.finish]}
              color={configuration.color}
              colorCodes={colorCodes}
              dimensions={configuration.dimensions === "ON"}
              units={configuration.units}
            />
          )}
        </group>
      );
      groups.push(group);
      counter += 1;
    }
    return groups;
  };

  const positionX = {
    450: {
      cabinet: 2,
      manPole: -10,
      cabinetPole: 5.8,
      cabinetHPole: -1.2,
      measurementPole: {
        horizontalLineStart: [0, 0, 0],
        horizontalLineEnd: [5.6, 0, 0],
        leftLineStart: [0, 0, 0],
        leftLineEnd: [-5.8, 0, 0],
        rightHorizontalLine: [
          [5.9, -0.05 / 2, 0],
          [5.9, 0.05 / 2, 0],
        ],
        leftHorizontalLine: [
          [-6.1, -0.05 / 2, 0],
          [-6.1, 0.05 / 2, 0],
        ],
      },
    },
    400: {
      cabinet: 3,
      manPole: -10,
      cabinetPole: 4.3,
      cabinetHPole: -2.2,
      measurementPole: {
        horizontalLineStart: [0, 0, 0],
        horizontalLineEnd: [5.2, 0, 0],
        leftLineStart: [0, 0, 0],
        leftLineEnd: [-5, 0, 0],
        rightHorizontalLine: [
          [5.5, -0.05 / 2, 0],
          [5.5, 0.05 / 2, 0],
        ],
        leftHorizontalLine: [
          [-5.3, -0.05 / 2, 0],
          [-5.3, 0.05 / 2, 0],
        ],
      },
    },
    350: {
      cabinet: 4,
      manPole: -10,
      cabinetPole: 2.8,
      cabinetHPole: -3.3,
      measurementPole: {
        horizontalLineStart: [0, 0, 0],
        horizontalLineEnd: [4.9, 0, 0],
        leftLineStart: [0, 0, 0],
        leftLineEnd: [-4, 0, 0],
        rightHorizontalLine: [
          [5.2, -0.05 / 2, 0],
          [5.2, 0.05 / 2, 0],
        ],
        leftHorizontalLine: [
          [-4.3, -0.05 / 2, 0],
          [-4.3, 0.05 / 2, 0],
        ],
      },
    },
    250: {
      cabinet: 5,
      manPole: -10,
      cabinetPole: 0,
      cabinetHPole: -4.4,
      measurementPole: {
        horizontalLineStart: [0, 0, 0],
        horizontalLineEnd: [3.2, 0, 0],
        leftLineStart: [0, 0, 0],
        leftLineEnd: [-3, 0, 0],
        rightHorizontalLine: [
          [3.5, -0.05 / 2, 0],
          [3.5, 0.05 / 2, 0],
        ],
        leftHorizontalLine: [
          [-3.3, -0.05 / 2, 0],
          [-3.3, 0.05 / 2, 0],
        ],
      },
    },
    150: {
      cabinet: 6,
      manPole: -10,
      cabinetPole: -2.8,
      cabinetHPole: -5.5,
      measurementPole: {
        horizontalLineStart: [0, 0, 0],
        horizontalLineEnd: [1.4, 0, 0],
        leftLineStart: [0, 0, 0],
        leftLineEnd: [-2, 0, 0],
        rightHorizontalLine: [
          [1.7, -0.05 / 2, 0],
          [1.7, 0.05 / 2, 0],
        ],
        leftHorizontalLine: [
          [-2.3, -0.05 / 2, 0],
          [-2.3, 0.05 / 2, 0],
        ],
      },
    },
    50: {
      cabinet: 7,
      manPole: -10,
      cabinetPole: -5.8,
      cabinetHPole: -6.6,
      measurementPole: {
        horizontalLineStart: [0, 0, 0],
        horizontalLineEnd: [1.1, 0, 0],
        leftLineStart: [0, 0, 0],
        leftLineEnd: [-1.4, 0, 0],
        rightHorizontalLine: [
          [1.3, -0.05 / 2, 0],
          [1.3, 0.05 / 2, 0],
        ],
        leftHorizontalLine: [
          [-1.6, -0.05 / 2, 0],
          [-1.6, 0.05 / 2, 0],
        ],
      },
    },
  };

  const uri = "https://pics.io/preview/66792a63548394472778ddc6/thumbnail";
  const sceneRef = useRef();
  const controlsRef = useRef();
  console.log({ sceneRef });
  function save(blob, fileName) {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  function saveArrayBuffer(buffer, fileName) {
    save(new Blob([buffer], { type: "application/octet-stream" }), fileName);
  }

  const exportGLTF = () => {
    const exporter = new GLTFExporter();
    if (sceneRef.current) {
      exporter.parse(
        sceneRef.current,
        (gltf) => {
          console.log(gltf);
          // downloadJSON(gltf);
          saveArrayBuffer(gltf, "cabinet.glb");
        },
        (err) => {
          console.log(err);
        },
        { binary: true }
      );
    }
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  console.log({ sceneRef });
  return (
    <div
      className="canvas-container"
      style={{
        backgroundColor: "rgb(217,217,217)",
        position: "relative",
        width: "100%",
        maxWidth: "1536px",
        maxHeight: "728px",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 53 }}
        shadows
        gl={{ antialias: true }}
        style={{ cursor: "grabbing" }}
        ref={sceneRef}
        onDoubleClick={handleReset}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <Floor receiveShadow style={{ backgroundColor: "rgb(215,215,214)" }} />

        <group
          rotation={[0, 0, 0]}
          position={[positionX[configuration.width].cabinet, 0, 1]}
        >
          <Person url={uri} />
          {horizontalAlignment(
            Math.floor(
              configuration.width /
                densityFactor[configuration.width][configuration.density]
            )
          )}

          {configuration.dimensions === "ON" && (
            <>
              <VerticalRule
                groupPosition={[
                  positionX[configuration.width].manPole,
                  -1.5,
                  2,
                ]}
                units={configuration.units}
                groupRotation={[0, 0, 0]}
                textRotation={[0, 0, 0]}
                textPosition={[0, 0, 0.01]}
                planeRotation={[0, 0, 0]}
                planePosition={[0, 0, 0]}
                planePo
                type="width"
                lineColor="grey"
                height={165}
                verticalLineStart={[0, 0, 0]}
                verticalLineEnd={[0, 1.9, 0]}
                bottomLineStart={[0, 0, 0]}
                bottomLineEnd={[0, -3.5, 0]}
                topHorizontalLine={[
                  [-0.05 / 2, -0.25, 0],
                  [0.05 / 2, -0.25, 0],
                ]}
                bottomHorizontalLine={[
                  [-0.05 / 2, -0.8, 0],
                  [0.05 / 2, -0.8, 0],
                ]}
              />
              <HorizontalRule
                groupPosition={[
                  positionX[configuration.width].cabinetHPole,
                  verticalCabinConfig[configuration.height].measurementPole
                    .verticalLineEnd[1] - 1,
                  2,
                ]}
                units={configuration.units}
                groupRotation={[0, 0, 0]}
                textRotation={[0, 0, 0]}
                textPosition={[0, 0, 0.01]}
                planeRotation={[0, 0, 0]}
                planePosition={[0, 0, 0]}
                planePo
                type="width"
                lineColor="grey"
                height={configuration.width}
                horizontalLineStart={
                  positionX[configuration.width].measurementPole
                    .horizontalLineStart
                }
                horizontalLineEnd={
                  positionX[configuration.width].measurementPole
                    .horizontalLineEnd
                }
                leftLineStart={
                  positionX[configuration.width].measurementPole.leftLineStart
                }
                leftLineEnd={
                  positionX[configuration.width].measurementPole.leftLineEnd
                }
                rightHorizontalLine={
                  positionX[configuration.width].measurementPole
                    .rightHorizontalLine
                }
                leftHorizontalLine={
                  positionX[configuration.width].measurementPole
                    .leftHorizontalLine
                }
              />
              <VerticalRule
                groupPosition={[
                  positionX[configuration.width].cabinetPole,
                  -1.5,
                  2,
                ]}
                units={configuration.units}
                groupRotation={[0, 0, 0]}
                textRotation={[0, 0, 0]}
                textPosition={
                  verticalCabinConfig[configuration.height].measurementPole
                    .textPosition
                }
                planeRotation={[0, 0, 0]}
                planePosition={
                  verticalCabinConfig[configuration.height].measurementPole
                    .planePosition
                }
                type="width"
                lineColor="grey"
                height={configuration.height}
                verticalLineStart={
                  verticalCabinConfig[configuration.height].measurementPole
                    .verticalLineStart
                }
                verticalLineEnd={
                  verticalCabinConfig[configuration.height].measurementPole
                    .verticalLineEnd
                }
                bottomLineStart={
                  verticalCabinConfig[configuration.height].measurementPole
                    .bottomLineStart
                }
                bottomLineEnd={
                  verticalCabinConfig[configuration.height].measurementPole
                    .bottomLineEnd
                }
                topHorizontalLine={
                  verticalCabinConfig[configuration.height].measurementPole
                    .topHorizontalLine
                }
                bottomHorizontalLine={
                  verticalCabinConfig[configuration.height].measurementPole
                    .bottomHorizontalLine
                }
              />
            </>
          )}
        </group>
        <OrbitControls
          ref={controlsRef}
          // enabled={configuration.dimensions === "OFF"}
        />
      </Canvas>
      <Configurator
        configuration={configuration}
        setConfiguration={setConfiguration}
        exportGLTF={exportGLTF}
        handleReset={handleReset}
        controlsRef={controlsRef}
      />
    </div>
  );
}
