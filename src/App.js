import React, { useState, useMemo } from "react";
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
import * as THREE from "three";
import VeneerTexture from "./textures/Veneer02.png";
import PlywoodTexture from "./textures/Veneer01.png";

export default function App() {
  const [configuration, setConfiguration] = useState({
    style: "grid",
    density: 100,
    width: 450,
    height: 293,
    depth: "24cm", // Initial depth value
    backPanel: "ON",
    finish: "Plywood",
    color: "green",
    books: "OFF",
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

  const horizontalAlignment = (count) => {
    const groups = [];
    let specialPosition = null;
    let specialGroup = null;
    let multiplier = null;
    switch (configuration.density) {
      case 25:
        multiplier = 6;
        break;
      case 50:
        multiplier = 4.5;
        break;
      case 75:
        multiplier = 3;
        break;
      case 100:
        multiplier = 1.5;
        break;
      default:
        multiplier = 1.5;
    }

    const densityMultiplier = {
      450: {
        100: 1.5,
        75: 2.2,
        50: 4.4,
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

    for (
      let i = -8;
      i <
      count * densityMultiplier[configuration.width][configuration.density] - 8;
      i += densityMultiplier[configuration.width][configuration.density]
    ) {
      const group_183_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, -1.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            density={configuration.density}
            backPanel={configuration.backPanel === "ON"}
            densityFactor={densityFactor}
            configWidth={configuration.width}
            textureUrl={textureUrl[configuration.finish]}
            color={configuration.color}
            colorCodes={colorCodes}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
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
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
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
          />
        </group>
      );

      const group_223_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, -0.34, 0]}
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
          />
          <OpenCabinet
            position={[0, -2.3, 0]}
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
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
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
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
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
          />
        </group>
      );

      const group_253_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, 0.8, 0]}
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
          />
          <OpenCabinet
            position={[0, -1.1, 0]}
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
          />
          <OpenCabinet
            position={[0, -2.3, 0]}
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
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
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
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
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
          />
        </group>
      );

      const group_293_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, 2.1, 0]}
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
          />
          <OpenCabinet
            position={[0, 0.15, 0]}
            receiveShadow
            configWidth={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            density={configuration.density}
            densityFactor={densityFactor}
            textureUrl={textureUrl[configuration.finish]}
            color={configuration.color}
            colorCodes={colorCodes}
            books={configuration.books === "ON"}
          />
          <OpenCabinet
            position={[0, -1, 0]}
            receiveShadow
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
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            configWidth={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            density={configuration.density}
            densityFactor={densityFactor}
            textureUrl={textureUrl[configuration.finish]}
            color={configuration.color}
            colorCodes={colorCodes}
            books={configuration.books === "ON"}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
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
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
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
          />
        </group>
      );

      const group_323_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, 3.3, 0]}
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
          />
          <OpenCabinet
            position={[0, 1.4, 0]}
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
          />
          <OpenCabinet
            position={[0, 0.2, 0]}
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
          />
          <OpenCabinet
            position={[0, -1.0, 0]}
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
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
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
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
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
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
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
          />
        </group>
      );

      const group_363_cm = (
        <group key={i} position={[i, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <StorageCabinet
            position={[0, 4.35, 0]}
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
          />
          <SmallCabinet
            position={[0, 2.4, 0]}
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
          />
          <OpenCabinet
            position={[0, 1.15, 0]}
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
          />
          <OpenCabinet
            position={[0, 0, 0]}
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
          />
          <OpenCabinet
            position={[0, -1.15, 0]}
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
          />
          <OpenCabinet
            position={[0, -2.3, 0]}
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
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
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
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
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
          />
        </group>
      );

      specialPosition = i;

      const specialGroup_183_cm = (
        <group
          key={specialPosition - 6.5}
          position={[specialPosition + 1.5, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <StorageCabinet
            position={[0, -1.5, 0]}
            receiveShadow
            width={configuration.width}
            specialWidth={configuration.width % 25}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
        </group>
      );

      const specialGroup_223_cm = (
        <group
          key={specialPosition - 6.5}
          position={[specialPosition + 1.5, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <StorageCabinet
            position={[0, -0.1, 0]}
            receiveShadow
            width={configuration.width}
            specialWidth={configuration.width % 25}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
        </group>
      );

      const specialGroup_253_cm = (
        <group
          key={specialPosition - 6.5}
          position={[specialPosition + 1.5, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <StorageCabinet
            position={[0, 1.2, 0]}
            receiveShadow
            width={configuration.width}
            specialWidth={configuration.width % 25}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, -0.9, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
        </group>
      );

      const specialGroup_293_cm = (
        <group
          key={specialPosition - 6.5}
          position={[specialPosition + 1.5, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <StorageCabinet
            position={[0, 2.5, 0]}
            receiveShadow
            width={configuration.width}
            specialWidth={configuration.width % 25}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, 0.4, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, -0.9, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
        </group>
      );

      const specialGroup_323_cm = (
        <group
          key={specialPosition - 6.5}
          position={[specialPosition + 1.5, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <StorageCabinet
            position={[0, 3.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, 1.7, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            densityFactor={densityFactor}
            density={configuration.density}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, 0.4, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            densityFactor={densityFactor}
            density={configuration.density}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, -0.9, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            densityFactor={densityFactor}
            density={configuration.density}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            densityFactor={densityFactor}
            density={configuration.density}
            configWidth={configuration.width}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
        </group>
      );

      const specialGroup_363_cm = (
        <group
          key={specialPosition - 6.5}
          position={[specialPosition + 1.5, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <StorageCabinet
            position={[0, 5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <SmallCabinet
            position={[0, 3, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, 1.7, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, 0.4, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, -0.9, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <OpenCabinet
            position={[0, -2.2, 0]}
            receiveShadow
            configWidth={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
          />
          <DrawerCabinet
            position={[0, -3.5, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
          <StorageCabinet
            position={[0, -4.8, 0]}
            receiveShadow
            width={configuration.width}
            height={configuration.height}
            depth={configuration.depth}
            backPanel={configuration.backPanel === "ON"}
            specialWidth={configuration.width % 25}
            density={configuration.density}
            densityFactor={densityFactor}
            configWidth={configuration.width}
          />
        </group>
      );

      const height = configuration.height;
      let group = group_293_cm;
      specialGroup = specialGroup_293_cm;
      if (height <= 183) {
        group = group_183_cm;
        specialGroup = specialGroup_183_cm;
      } else if (height <= 223) {
        group = group_223_cm;
        specialGroup = specialGroup_223_cm;
      } else if (height <= 253) {
        group = group_253_cm;
        specialGroup = specialGroup_253_cm;
      } else if (height <= 293) {
        group = group_293_cm;
        specialGroup = specialGroup_293_cm;
      } else if (height <= 323) {
        group = group_323_cm;
        specialGroup = specialGroup_323_cm;
      } else if (height <= 363) {
        group = group_363_cm;
        specialGroup = specialGroup_363_cm;
      } else {
        group = group_293_cm;
        specialGroup = specialGroup_293_cm;
      }

      groups.push(group);
    }
    if (configuration.width % 50 !== 0) groups.push(specialGroup);
    return groups;
  };

  const Texture = ({ texture }) => {
    return (
      <mesh
        position={[-9.3, -3, 0.2]}
        scale={[0.5, 1.5, 0.1]}
        // rotation={[-Math.PI / 2, 0, Math.PI / 3]}
        receiveShadow
      >
        <planeGeometry attach="geometry" args={[4, 4]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
    );
  };

  const Image = ({ url }) => {
    const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
    return <Texture texture={texture} />;
  };

  const uri = "https://pics.io/preview/66792a63548394472778ddc6/thumbnail";

  return (
    <div
      className="canvas-container"
      style={{ backgroundColor: "rgb(217,217,217)" }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        shadows
        gl={{ antialias: true }}
        style={{ cursor: "grabbing" }}
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

        <group rotation={[0, 0, 0]} position={[1, 0, 1]}>
          <Person url={uri} />
          {horizontalAlignment(
            Math.floor(
              configuration.width /
                densityFactor[configuration.width][configuration.density]
            )
          )}
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
