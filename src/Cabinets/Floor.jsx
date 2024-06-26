import React from "react";

function Floor() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      // rotation={[-Math.PI / 2, Math.PI / 8, -Math.PI / 2]}
      position={[0, -5.8, 4]}
      style={{ backgroundColor: "rgb(218,218,218)" }}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[25, 10]} color="rgb(218,218,218)" />
      <meshStandardMaterial
        //  color="#F0E9D6"
        color="white"
      />
    </mesh>
  );
}

export default Floor;
