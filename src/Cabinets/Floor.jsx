import React from "react";

function Floor() {
  return (
    // Create a mesh to represent the floor
    <mesh
      // Set the rotation of the mesh so it's flat on the ground
      rotation={[-Math.PI / 2, 0, 0]}
      // Uncomment the following line to set a different rotation
      // rotation={[-Math.PI / 2, Math.PI / 8, -Math.PI / 2]}
      // Position the mesh
      position={[0, -5.8, 4]}
      // Set the background color using style (note: not typically used for meshes)
      style={{ backgroundColor: "rgb(218,218,218)" }}
      // Enable shadow casting
      castShadow
      // Enable shadow receiving
      receiveShadow
    >
      {/* Define the geometry of the plane */}
      <planeGeometry args={[25, 10]} color="rgb(218,218,218)" />
      {/* Define the material of the mesh */}
      <meshStandardMaterial
        // Uncomment the following line to change the color of the material
        // color="#F0E9D6"
        // Set the color of the material to white
        color="white"
      />
    </mesh>
  );
}

export default Floor;
