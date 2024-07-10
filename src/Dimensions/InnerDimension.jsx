import React, { useRef } from "react";
import { RoundedBox, Text, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function Height({
  heightSize,
  heightText,
  textPosition,
  textRotation,
  groupPosition,
  groupRotation,
  planeRotation,
  type,
  lineColor,
}) {
  // Define the positions for the vertical lines
  const verticalLineStart = [0, 0, 0];
  const verticalLineEnd = [0, 0.2, 0]; // Vertical line ends
  const bottomLineStart = [0, 0, 0];
  const bottomLineEnd = [0, -0.2, 0]; // Bottom line ends

  // Define the positions for the horizontal lines
  const horizontalLineStart = [0, 0, 0];
  const horizontalLineEnd = [0.2, 0, 0]; // Horizontal line ends
  const leftLineStart = [0, 0, 0];
  const leftLineEnd = [-0.2, 0, 0]; // Left line ends

  // Define the positions for the small lines
  const lineLength = 0.05; // Length of the small lines
  const topHorizontalLine = [
    [-lineLength / 2, heightSize.height / 200 + 0.2, 0],
    [lineLength / 2, heightSize.height / 200 + 0.2, 0],
  ];
  const bottomHorizontalLine = [
    [-lineLength / 2, -heightSize.height / 200 - 0.2, 0],
    [lineLength / 2, -heightSize.height / 200 - 0.2, 0],
  ];
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
      >
        <meshBasicMaterial color="#E6E6E6" />
      </RoundedBox>
      <Text
        rotation={textRotation}
        position={textPosition}
        fontSize={0.2} // Smaller font size
        fontWeight="800" // Medium font weight
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        {heightText}
      </Text>
      {type === "height" && (
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
            lineWidth={1}
            position={[0, 0, 0.001]}
          />
          {/* Bottom horizontal line */}
          <Line
            points={bottomHorizontalLine}
            color={lineColor}
            lineWidth={1}
            position={[0, 0, 0.001]}
          />
        </group>
      )}
      {type === "width" && (
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
            lineWidth={1}
            position={[0, 0, 0.001]}
          />
          {/* Left small line */}
          <Line
            points={leftHorizontalLine}
            color={lineColor}
            lineWidth={1}
            position={[0, 0, 0.001]}
          />
        </group>
      )}
      {type === "depth" && (
        <group ref={depthLinesRef} scale={[0, 0, 0]}>
          {/* Depth line */}
          <Line
            points={[depthLineStart, depthLineEnd]}
            color={lineColor}
            lineWidth={1}
            position={[0.5, 0, heightSize.height / 200]}
          />
        </group>
      )}
    </group>
  );
}

export default Height;
