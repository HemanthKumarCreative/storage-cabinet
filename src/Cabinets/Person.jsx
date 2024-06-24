import React, { Suspense, useMemo } from "react";
import * as THREE from "three";

const Texture = ({ texture }) => {
  return (
    <mesh position={[-9.3, -3, 0.2]} scale={[0.5, 1.5, 0.1]} receiveShadow>
      <planeGeometry attach="geometry" args={[4, 4]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Image = ({ url }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  return (
    <group style={{ background: "white" }}>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Texture texture={texture} />
      </Suspense>
    </group>
  );
};

export default Image;
