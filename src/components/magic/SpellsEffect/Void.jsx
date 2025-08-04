import React, { useRef, useEffect } from "react";
import { VFXEmitter } from "wawa-vfx";
import { PositionalAudio } from "@react-three/drei";

// a good VFX Effect is a combination of the right setting
// and  the right timing

//what we want to achieve with the Void Spell??
//1.  when the energy is gathered before the spell is cast.
// The best it's done, the more anticipation the player will feel,
//and the more powerful the spell will look.

// Build-up Phase:
//- Particles emmitted slowly upwards
// - a growing sphere
// - rotating written runes on the floor as if the speel was being cast
//- a blast phase.This is when the spell is cast and the energy is released
// A blast will be composed of:
// -the sphere exploding(making it disappear)
//- the particles going in every direction
//

export const Void = ({ ...props }) => {
  console.log("props", props);
  const blastAudio = useRef();
  const gravityAudio = useRef();

  useEffect(() => {
    setTimeout(() => {
      blastAudio.current?.play();
    }, 1000);
    setTimeout(() => {
      gravityAudio.current?.play();
    }, 500);
  }, []);

  return (
    <group {...props}>
      {/* audio sfxs */}

      <PositionalAudio
        url="/sfxs/buildup.mp3"
        autoplay
        distance={3}
        loop={false}
      />
      <PositionalAudio
        url="/sfxs/blast.mp3"
        distance={30}
        loop={false}
        ref={blastAudio}
      />

      <PositionalAudio
        url="/sfxs/gravity.mp3"
        distance={10}
        loop={false}
        ref={gravityAudio}
      />
      {/* build-up phase */}
      <VFXEmitter
        emitter="sparks"
        debug
        settings={{
          duration: 0.5,
          delay: 0,
          nbParticles: 20,
          spawnMode: "time",
          loop: false,
          startPositionMin: [-0.5, 0, -0.5],
          startPositionMax: [0.5, 1, 0.5],
          startRotationMin: [0, 0, 0],
          startRotationMax: [0, 0, 0],
          particlesLifetime: [0.5, 1],
          speed: [0, 1],
          directionMin: [0, 0, 0],
          directionMax: [0, 0.1, 0],
          rotationSpeedMin: [0, 0, 0],
          rotationSpeedMax: [0, 0, 0],
          colorStart: ["#4902ff"],
          colorEnd: ["#ffffff"],
          size: [0.1, 0.4],
        }}
      />
      <VFXEmitter
        emitter="spheres"
        debug
        settings={{
          duration: 0.5,
          delay: 0.5,
          nbParticles: 1,
          spawnMode: "burst",
          loop: false,
          startPositionMin: [0, 0.5, 0],
          startPositionMax: [0, 0.5, 0],
          startRotationMin: [0, 0, 0],
          startRotationMax: [0, 0, 0],
          particlesLifetime: [0.5, 0.5],
          speed: [5, 20],
          directionMin: [0, 0, 0],
          directionMax: [0, 0, 0],
          rotationSpeedMin: [0, 10, 0],
          rotationSpeedMax: [0, 10, 0],
          colorStart: ["#5b18ff"],
          colorEnd: ["#d1beff"],
          size: [0.5, 0.5],
        }}
      />
      <VFXEmitter
        emitter="writings"
        position-y={0.1}
        rotation-x={-Math.PI / 2}
        //
        settings={{
          duration: 1,
          delay: 0,
          nbParticles: 1,
          spawnMode: "burst",
          loop: false,
          startPositionMin: [0, 0, 0],
          startPositionMax: [0, 0, 0],
          startRotationMin: [0, 0, 0],
          startRotationMax: [0, 0, 0],
          particlesLifetime: [1, 1],
          speed: [5, 20],
          directionMin: [0, 0, 0],
          directionMax: [0, 0, 0],
          rotationSpeedMin: [0, 0, 5],
          rotationSpeedMax: [0, 0, 5],
          colorStart: ["#ff9fed", "#e885ff"],
          colorEnd: ["#ffffff", "#ffffff"],
          size: [1, 1],
        }}
      />
      {/* blast phase : explosion */}
      <VFXEmitter
        emitter="sparks"
        settings={{
          duration: 1,
          delay: 1,
          nbParticles: 300,
          spawnMode: "burst",
          loop: false,
          startPositionMin: [-0.1, -0.1, -0.1],
          startPositionMax: [0.1, 0.1, 0.1],
          startRotationMin: [0, 0, 0],
          startRotationMax: [0, 0, 0],
          particlesLifetime: [0.1, 1],
          speed: [2, 8],
          directionMin: [-1, 0, -1],
          directionMax: [1, 1, 1],
          rotationSpeedMin: [0, 0, 0],
          rotationSpeedMax: [0, 0, 0],
          colorStart: ["#ffffff", "#d1beff"],
          colorEnd: ["#ffffff", "#5b18ff"],
          size: [0.05, 0.1],
        }}
      />
    </group>
  );
};
