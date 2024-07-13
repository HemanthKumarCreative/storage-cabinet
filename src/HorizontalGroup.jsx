import React, { useEffect, useState } from "react";
import Cabinet from "./Cabinet";

/**
 * CabinetGroup component dynamically generates a group of cabinets based on the provided configuration.
 *
 * @param {object} props - The props passed to the component.
 * @param {object} props.densityMultiplier - Multiplier values for density calculations.
 * @param {number} props.count - The number of cabinets to be rendered.
 * @param {object} props.configuration - The current configuration state of the cabinets.
 * @param {object} props.densityFactor - Factor values for density calculations.
 * @param {string} props.textureUrl - The URL of the texture image.
 * @param {object} props.colorCodes - The color codes for different finishes.
 * @param {string} props.cabinetType - The type of cabinet to be rendered.
 * @param {number} props.row - The row index of the cabinet group.
 * @param {number} props.col - The column index of the cabinet group.
 * @param {array} props.groupPosition - The position of the cabinet group.
 * @param {function} props.setShowModal - Function to toggle the modal visibility.
 * @param {object} props.rowConfig - Configuration for each row of cabinets.
 * @param {number} props.cabinetHeight - The height of the cabinets.
 * @param {string} props.type - The type of cabinets (e.g., storage1, storage2).
 * @param {boolean} props.books - Whether to display books in the cabinets.
 *
 * @returns {React.Element} The rendered component.
 */
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
    books,
  } = props;

  // State to manage hover effect and local cabinet type
  const [isHovered, setIsHovered] = useState(false);
  const [localCabinetType, setLocalCabinetType] = useState(cabinetType);

  // Array to store the generated cabinet components
  const cabinets = [];

  // Update local cabinet type based on row configuration
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

  // Arrays to manage different cabinet types for mixed configurations
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
  ];

  // Generate cabinet components based on the provided configuration and type
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
        col={Math.ceil(i + 8)}
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
        books={configuration.books === "ON"}
      />
    );
  }

  // Return the group of cabinets with hover effect and modal toggling
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
