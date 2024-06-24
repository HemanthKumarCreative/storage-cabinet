import React from "react";

function Floor() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      // rotation={[-Math.PI / 2, Math.PI / 8, -Math.PI / 2]}
      position={[0, -7, 0]}
      style={{ backgroundColor: "rgb(218,218,218)" }}
    >
      <planeGeometry args={[25, 5]} color="rgb(218,218,218)" />
      <meshStandardMaterial color="#dddddd" />
    </mesh>
  );
}

export default Floor;
