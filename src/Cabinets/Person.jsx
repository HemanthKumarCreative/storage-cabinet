import React, { Suspense, useMemo } from "react";
import * as THREE from "three";

/**
 * Texture Component
 * This component renders a textured plane mesh.
 * 
 * @param {object} props - Component properties
 * @param {THREE.Texture} props.texture - The texture to be applied to the mesh
 * @returns {JSX.Element} The textured plane mesh
 */
const Texture = ({ texture }) => {
  return (
    <mesh
      position={[-9.4, -2.4, 1]}
      scale={[0.6, 1.7, 0.1]}
      receiveShadow={false}
    >
      <planeGeometry attach="geometry" args={[4, 4]} receiveShadow={false} />
      <meshStandardMaterial map={texture} receiveShadow={false} />
    </mesh>
  );
};

/**
 * Image Component
 * This component loads an image from a URL and displays it as a texture on a 3D plane.
 * 
 * @param {object} props - Component properties
 * @param {string} props.url - The URL of the image to be loaded as a texture
 * @returns {JSX.Element} The group containing the textured plane and lighting
 */
const Image = ({ url }) => {
  // Load the texture from the URL
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);

  return (
    <group style={{ background: "rgb(209,209,209)" }} receiveShadow={false}>
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Suspense fallback={null}>
        <Texture texture={texture} />
      </Suspense>
      {/* <div style={{ height: "100vh", position: "relative" }}> */}
      {/* <ThreeJSVerticalLineWithMarker value={25} /> */}
      {/* </div> */}
    </group>
  );
};

export default Image;
