import React, { useRef } from "react";
import { RoundedBox, Text, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function Height({
  textPosition,
  textRotation,
  groupPosition,
  groupRotation,
  planeRotation,
  planePosition,
  lineColor,
  height,
  verticalLineStart,
  verticalLineEnd,
  bottomLineStart,
  bottomLineEnd,
  topHorizontalLine,
  bottomHorizontalLine,
  units,
}) {
  const textSize = (text, fontSize) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Arial`;
    const metrics = context.measureText(text);
    return { width: metrics.width, height: fontSize };
  };

  const convertToFeetInches = (cm) => {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);
    return `${feet}' ${remainingInches}''`;
  };

  const heightText =
    units === "cm" ? ` ${height} ` : ` ${convertToFeetInches(height)} `;
  const heightSize = textSize(heightText, 24);

  // Define the positions for the horizontal lines
  const horizontalLineStart = [0, 0, 0];
  const horizontalLineEnd = [0.2, 0, 0]; // Horizontal line ends
  const leftLineStart = [0, 0, 0];
  const leftLineEnd = [-0.2, 0, 0]; // Left line ends

  // Define the positions for the small lines
  const lineLength = 0.05; // Length of the small lines
  const rightHorizontalLine = [
    [heightSize.width / 200 + 0.2, -lineLength / 2, 0],
    [heightSize.width / 200 + 0.2, lineLength / 2, 0],
  ];
  const leftHorizontalLine = [
    [-heightSize.width / 200 - 0.2, -lineLength / 2, 0],
    [-heightSize.width / 200 - 0.2, lineLength / 2, 0],
  ];

  // Define positions for depth lines
  const depthLineStart = [0, 0, 0];
  const depthLineEnd = [0, 0, 0.2]; // Depth line ends

  // References for the line groups
  const heightLinesRef = useRef();
  const widthLinesRef = useRef();
  const depthLinesRef = useRef();

  // Animation with useFrame
  useFrame(() => {
    if (heightLinesRef.current) {
      heightLinesRef.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1);
    }
    if (widthLinesRef.current) {
      widthLinesRef.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1);
    }
    if (depthLinesRef.current) {
      depthLinesRef.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1);
    }
  });

  return (
    <group position={groupPosition} rotation={groupRotation}>
      <RoundedBox
        args={[heightSize.width / 100, heightSize.height / 100, 0.0025]}
        radius={0.05} // Border radius
        smoothness={4} // Smoothness of the rounded corners
        rotation={planeRotation}
        position={planePosition}
      >
        <meshBasicMaterial color="#3A3B3C" />
      </RoundedBox>
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
      <group ref={heightLinesRef} scale={[0, 0, 0]}>
        {/* Top vertical line */}
        <Line
          points={[verticalLineStart, verticalLineEnd]}
          color={lineColor}
          lineWidth={1}
          position={[0, heightSize.height / 200, 0.001]}
        />
        {/* Bottom vertical line */}
        <Line
          points={[bottomLineStart, bottomLineEnd]}
          color={lineColor}
          lineWidth={1}
          position={[0, -heightSize.height / 200, 0.001]}
        />
        {/* Top horizontal line */}
        <Line
          points={topHorizontalLine}
          color={lineColor}
          lineWidth={2}
          position={[0, 2.3, 0.001]}
        />
        {/* Bottom horizontal line */}
        <Line
          points={bottomHorizontalLine}
          color={lineColor}
          lineWidth={2}
          position={[0, -2.8, 0.001]}
        />
      </group>
    </group>
  );
}

export default Height;
