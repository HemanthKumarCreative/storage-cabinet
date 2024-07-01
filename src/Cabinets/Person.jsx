import React, { Suspense, useMemo } from "react";
import * as THREE from "three";

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

const Image = ({ url }) => {
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
