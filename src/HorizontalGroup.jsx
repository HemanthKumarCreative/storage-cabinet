import React, { useEffect, useState } from "react";
import Cabinet from "./Cabinet";

const CabinetGroup = (props) => {
  let {
    densityMultiplier,
    count,
    configuration,
    densityFactor,
    textureUrl,
    colorCodes,
    cabinetType,
    row,
    col,
    groupPosition,
    setShowModal,
    rowConfig,
    cabinetHeight,
    type,
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [localCabinetType, setLocalCabinetType] = useState(cabinetType);
  const cabinets = [];

  useEffect(() => {
    if (rowConfig) {
      if (rowConfig.doors === "Max") {
        setLocalCabinetType("small");
      } else if (rowConfig.drawers === "Max") {
        setLocalCabinetType("drawer");
      } else if (rowConfig.doors === "None" && rowConfig.drawers === "None") {
        setLocalCabinetType("open");
      } else if (rowConfig.doors === "Some" && rowConfig.drawers === "Some") {
        setLocalCabinetType("mixed");
      } else if (rowConfig.doors === "Some" && rowConfig.drawers === "None") {
        setLocalCabinetType("doors open");
      } else if (rowConfig.drawers === "Some" && rowConfig.doors === "None") {
        setLocalCabinetType("drawers open");
      }
    } else {
      setLocalCabinetType("storage");
    }
  }, [rowConfig]);

  const mixed = [
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
    "small",
    "drawer",
  ];
  const doorsOpen = [
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
    "small",
    "open",
  ];
  const drawersOpen = [
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
    "drawer",
    "open",
  ];

  for (
    let i = -8;
    i <
    count * densityMultiplier[configuration.width][configuration.density] - 8;
    i += densityMultiplier[configuration.width][configuration.density]
  ) {
    cabinets.push(
      <Cabinet
        cabinetType={
          localCabinetType === "mixed"
            ? mixed[Math.floor(i + 8)]
            : localCabinetType === "doors open"
              ? doorsOpen[Math.floor(i + 8)]
              : localCabinetType === "drawers open"
                ? drawersOpen[Math.floor(i + 8)]
                : localCabinetType
        }
        row={row}
        col={col}
        key={i}
        position={[i, 5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
        width={configuration.width}
        height={configuration.height}
        depth={configuration.depth}
        backPanel={configuration.backPanel === "ON"}
        density={configuration.density}
        densityFactor={densityFactor}
        configWidth={configuration.width}
        textureUrl={textureUrl[configuration.finish]}
        color={isHovered ? "orange" : configuration.color} // Change color on hover
        colorCodes={colorCodes}
        dimensions={configuration.dimensions === "ON"}
        units={configuration.units}
        cabinetHeight={cabinetHeight}
        type={type}
      />
    );
  }

  return (
    <group
      position={groupPosition}
      onPointerOver={() => {
        setShowModal(true);
        setIsHovered(true);
      }}
      onPointerLeave={() => {
        setShowModal(false);
        setIsHovered(false);
      }}
    >
      {cabinets}
    </group>
  );
};

export default CabinetGroup;
