import React, { useRef } from "react";
import { RoundedBox, Text, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/**
 * Height Component
 * This component displays the height dimension with a text label and lines.
 * 
 * @param {object} props - Component properties
 * @param {array} props.textPosition - Position of the text
 * @param {array} props.textRotation - Rotation of the text
 * @param {array} props.groupPosition - Position of the group
 * @param {array} props.groupRotation - Rotation of the group
 * @param {array} props.planeRotation - Rotation of the plane
 * @param {array} props.planePosition - Position of the plane
 * @param {string} props.lineColor - Color of the lines
 * @param {number} props.height - Height value to display
 * @param {array} props.horizontalLineStart - Start position of the horizontal line
 * @param {array} props.horizontalLineEnd - End position of the horizontal line
 * @param {array} props.leftLineStart - Start position of the left line
 * @param {array} props.leftLineEnd - End position of the left line
 * @param {array} props.rightHorizontalLine - Points for the right horizontal line
 * @param {array} props.leftHorizontalLine - Points for the left horizontal line
 * @param {string} props.units - Units of measurement ("cm" or "inches")
 * @returns {JSX.Element} The Height dimension component
 */
function Height({
  textPosition,
  textRotation,
  groupPosition,
  groupRotation,
  planeRotation,
  planePosition,
  lineColor,
  height,
  horizontalLineStart,
  horizontalLineEnd,
  leftLineStart,
  leftLineEnd,
  rightHorizontalLine,
  leftHorizontalLine,
  units,
}) {
  // Helper function to calculate text size
  const textSize = (text, fontSize) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Arial`;
    const metrics = context.measureText(text);
    return { width: metrics.width, height: fontSize };
  };

  // Helper function to convert cm to feet and inches
  const convertToFeetInches = (cm) => {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);
    return `${feet}' ${remainingInches}''`;
  };

  // Determine the height text based on units
  const heightText =
    units === "cm" ? ` ${height} ` : ` ${convertToFeetInches(height)} `;
  const heightSize = textSize(heightText, 24);

  // Reference for the line groups
  const widthLinesRef = useRef();

  // Animation with useFrame
  useFrame(() => {
    if (widthLinesRef.current) {
      widthLinesRef.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1);
    }
  });

  return (
    <group position={groupPosition} rotation={groupRotation}>
      {/* Display the background box for the text */}
      <RoundedBox
        args={[heightSize.width / 100, heightSize.height / 100, 0.0025]}
        radius={0.05} // Border radius
        smoothness={4} // Smoothness of the rounded corners
        rotation={planeRotation}
        position={planePosition}
      >
        <meshBasicMaterial color="#3A3B3C" />
      </RoundedBox>
      {/* Display the height text */}
      <Text
        rotation={textRotation}
        position={textPosition}
        fontSize={0.2} // Smaller font size
        fontWeight="800" // Medium font weight
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {heightText}
      </Text>
      {/* Display the lines */}
      <group ref={widthLinesRef} scale={[0, 0, 0]}>
        {/* Right horizontal line */}
        <Line
          points={[horizontalLineStart, horizontalLineEnd]}
          color={lineColor}
          lineWidth={1}
          position={[heightSize.width / 200, 0, 0.001]}
        />
        {/* Left horizontal line */}
        <Line
          points={[leftLineStart, leftLineEnd]}
          color={lineColor}
          lineWidth={1}
          position={[-heightSize.width / 200, 0, 0.001]}
        />
        {/* Right small line */}
        <Line
          points={rightHorizontalLine}
          color={lineColor}
          lineWidth={2}
          position={[0, 0, 0.001]}
        />
        {/* Left small line */}
        <Line
          points={leftHorizontalLine}
          color={lineColor}
          lineWidth={2}
          position={[0, 0, 0.001]}
        />
      </group>
    </group>
  );
}

export default Height;
