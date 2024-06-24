import React from "react";

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]}>
      <planeGeometry args={[50, 50]} />
      {/* <meshStandardMaterial color="#dddddd" /> */}
    </mesh>
  );
}

export default Floor;
