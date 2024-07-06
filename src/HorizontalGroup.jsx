import React, { useState } from "react";
import Cabinet from "./Cabinet";

const CabinetGroup = (props) => {
  const {
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
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const cabinets = [];
  for (
    let i = -8;
    i <
    count * densityMultiplier[configuration.width][configuration.density] - 8;
    i += densityMultiplier[configuration.width][configuration.density]
  ) {
    cabinets.push(
      <Cabinet
        cabinetType={cabinetType}
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
