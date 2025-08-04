import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";
import { VFXEmitter } from "wawa-vfx";
import { degToRad } from "three/src/math/MathUtils.js";

// a good VFX Effect is a combination of the right setting
// and  the right timing

//what we want to achieve with the Ice Spell??
//1.  when the energy is gathered before the spell is cast.
//
//The colors to  choose for your spells are very important.
//They will help the player to quickly identify the spell they are casting.
//Light-blue/white for ice, red/orange for fire, green for poison/nature, etc.

// Build-up Phase will be composed of:
//- A trail composed of spheres and particles falling from the sky
// - Rotating written runes on the floor to show where the spell is cast

//-A Blast Phase. A blast will be composed of:
// -Particles exploding going upwards
//- Ice shards appearing on the floor

export const Ice = ({ ...props }) => {
  // to do the trail we need a ref for the VFXEmitter to cast it from the sky
  const spellEmitter = useRef();
  const time = useRef(0);

  // we use the useFrame to make the spheres fall from the sky
  useFrame((_, delta) => {
    time.current += delta;
    if (spellEmitter.current) {
      //setting the position y of the emitter to make the spheres fall
      spellEmitter.current.position.y = Math.cos(time.current * Math.PI) * 5;
    }
  });

  const blastAudio = useRef();

  useEffect(() => {
    setTimeout(() => {
      blastAudio.current.play();
    }, 500);
  }, []);

  return (
    <group {...props}>
      {/* audio sfxs */}

      <PositionalAudio
        url="/sfxs/fire.mp3"
        autoplay
        distance={20}
        loop={false}
      />
      <PositionalAudio
        url="/sfxs/freeze.mp3"
        distance={30}
        loop={false}
        ref={blastAudio}
      />

      {/* build-up phase */}
      <VFXEmitter
        emitter="writings"
        position-y={0.1}
        rotation-x={-Math.PI / 2}
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
          particlesLifetime: [0.6, 0.6],
          speed: [5, 20],
          directionMin: [0, 0, 0],
          directionMax: [0, 0, 0],
          rotationSpeedMin: [0, 0, 1],
          rotationSpeedMax: [0, 0, 1],
          colorStart: ["skyblue"],
          colorEnd: ["skyblue"],
          size: [1, 1],
        }}
      />
      <VFXEmitter
        emitter="spheres"
        ref={spellEmitter}
        settings={{
          duration: 1,
          delay: 0,
          nbParticles: 100,
          spawnMode: "time",
          loop: false,
          startPositionMin: [0, 0, 0],
          startPositionMax: [0, 0, 0],
          startRotationMin: [0, 0, 0],
          startRotationMax: [0, 0, 0],
          //we spawn very short living particles
          particlesLifetime: [0.1, 0.1],
          speed: [5, 20],
          directionMin: [0, 0, 0],
          directionMax: [0, 0, 0],
          rotationSpeedMin: [0, 0, 0],
          rotationSpeedMax: [0, 0, 0],
          colorStart: ["white", "skyblue"],
          colorEnd: ["white"],
          // to fake the trail effect with random sizes:
          size: [0.05, 0.2],
        }}
      >
        <VFXEmitter
          emitter="sparks"
          settings={{
            duration: 0.5,
            delay: 0,
            nbParticles: 1000,
            spawnMode: "time",
            loop: false,
            startPositionMin: [-0.1, 0, -0.1],
            startPositionMax: [0.1, 0, 0.1],
            startRotationMin: [0, 0, 0],
            startRotationMax: [0, 0, 0],
            particlesLifetime: [0.5, 1],
            speed: [0.1, 5],
            directionMin: [-1, 1, -1],
            directionMax: [1, 1, 1],
            rotationSpeedMin: [0, 0, 0],
            rotationSpeedMax: [0, 0, 0],
            colorStart: ["white", "skyblue"],
            colorEnd: ["white", "skyblue"],
            size: [0.01, 0.1],
          }}
        />
      </VFXEmitter>

      {/* blast phase : explosion */}
      <VFXEmitter
        emitter="sparks"
        settings={{
          duration: 0.5,
          delay: 0.5,
          nbParticles: 120,
          spawnMode: "burst",
          loop: false,
          startPositionMin: [-0.5, 0, -0.5],
          startPositionMax: [0.5, 1, 0.5],
          startRotationMin: [0, 0, 0],
          startRotationMax: [0, 0, 0],
          particlesLifetime: [0.1, 1.5],
          speed: [0.5, 2],
          directionMin: [-1, 0, -1],
          directionMax: [1, 1, 1],
          rotationSpeedMin: [0, 0, 0],
          rotationSpeedMax: [0, 0, 0],
          colorStart: ["white", "skyblue"],
          colorEnd: ["white", "skyblue"],
          size: [0.01, 0.1],
        }}
      />
      <VFXEmitter
        emitter="icicle"
        position-y={0.1}
        settings={{
          duration: 1,
          delay: 0.5,
          nbParticles: 5,
          spawnMode: "burst",
          loop: false,
          startPositionMin: [-0.5, 0, -0.5],
          startPositionMax: [0.5, 0, 0.5],
          startRotationMin: [degToRad(180 - 20), 0, degToRad(-30)],
          startRotationMax: [degToRad(180 + 20), 0, degToRad(30)],
          particlesLifetime: [1, 1],
          speed: [5, 20],
          directionMin: [0, 0, 0],
          directionMax: [0, 0, 0],
          rotationSpeedMin: [0, 0, 0],
          rotationSpeedMax: [0, 0, 0],
          colorStart: ["skyblue", "white"],
          colorEnd: ["skyblue", "white"],
          size: [0.5, 1],
        }}
      />
    </group>
  );
};
