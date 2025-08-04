import React from "react";
import { useTexture, useGLTF } from "@react-three/drei";
import { VFXParticles } from "wawa-vfx";

const VFXS = () => {
  //Instead of squared particles let's use triangles.
  //To do it we can use a cone geometry with the appropriate settings.
  const texture = useTexture("/textures/magic_01.png");
  const { nodes } = useGLTF("/models/Icicle.glb");

  return (
    <>
      <VFXParticles
        name="sparks"
        geometry={<coneGeometry args={[0.5, 1, 8, 1]} />}
        //  geometry={<sphereGeometry args={[1, 32, 32]} />}
        settings={{
          nbParticles: 100000,
          renderMode: "billboard",
          intensity: 3,
          fadeSize: [0.1, 0.1], // fadeIn , fadeOut By setting the fadeSize to [0.7, 0.9] we make the sphere grow slowly until 70% of its lifetime and then quickly disappear during the last 10%.
          fadeAlpha: [0, 1],
        }}
      />
      <VFXParticles
        name="spheres"
        geometry={<sphereGeometry args={[1, 32, 32]} />}
        settings={{
          nbParticles: 1000,
          renderMode: "mesh",
          intensity: 5,
          fadeSize: [0.7, 0.9], // fadeIn , fadeOut By setting the fadeSize to [0.7, 0.9] we make the sphere grow slowly until 70% of its lifetime and then quickly disappear during the last 10%.
          fadeAlpha: [0, 1],
        }}
      />
      <VFXParticles
        name="writings"
        geometry={<circleGeometry args={[1, 32]} />}
        alphaMap={texture}
        settings={{
          nbParticles: 100,
          renderMode: "mesh",
          //  intensity: 5,
          fadeSize: [0.3, 0.9], // fadeIn , fadeOut By setting the fadeSize to [0.7, 0.9] we make the sphere grow slowly until 70% of its lifetime and then quickly disappear during the last 10%.
          fadeAlpha: [0.9, 1.0],
        }}
      />
      <VFXParticles
        name="icicle"
        geometry={<primitive object={nodes.icicle.geometry} />}
        settings={{
          nbParticles: 100,
          renderMode: "mesh",
          fadeAlpha: [0, 1.0],
          fadeSize: [0.2, 0.8], //quicly fadeIn and quickly fadeOut
        }}
      />
    </>
  );
};

export default VFXS;
