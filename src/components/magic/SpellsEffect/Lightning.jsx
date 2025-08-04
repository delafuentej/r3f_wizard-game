import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { VFXEmitter } from "wawa-vfx";
import { Line, PositionalAudio } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

export const Lightning = ({ startY = 10, endY = 0, x = 0, z = 0 }) => {
  const [visible, setVisible] = useState(true);
  const [triggered, setTriggered] = useState(false);
  const lightningRef = useRef();
  const flashRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setVisible(false);
    }, 150);

    const timeout2 = setTimeout(() => {
      setTriggered(true);
      audioRef.current?.play();
    }, 100);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  useFrame(({ clock }) => {
    if (flashRef.current) {
      flashRef.current.material.opacity = triggered ? 0.4 : 0;
    }
  });

  // Ray path generation (zigzag)
  const generateRay = () => {
    const points = [];
    const segments = 50;
    const spread = 0.4;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = startY - t * (startY - endY);
      const xOffset = (Math.random() - 0.5) * spread;
      const zOffset = (Math.random() - 0.5) * spread;
      points.push(new THREE.Vector3(x + xOffset, y, z + zOffset));
    }
    return points;
  };

  return (
    <group>
      {/* Rayo visible como línea brillante */}
      {visible && (
        <Line
          ref={lightningRef}
          points={generateRay()}
          color="#33ccff"
          lineWidth={5}
          transparent
          opacity={0.9}
        />
      )}

      {/* Flash de iluminación al impactar */}
      {/* <mesh ref={flashRef} position={[x, 1, z]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="white" transparent opacity={0} />
      </mesh> */}
      <PositionalAudio
        url="/sfxs/electric_zap.wav"
        autoplay
        distance={3}
        loop={false}
      />

      {/* Audio de impacto */}
      <PositionalAudio
        url="/sfxs/thunder.mp3"
        ref={audioRef}
        distance={50}
        loop={false}
      />

      {/* Bloom para que el rayo brille */}
      <EffectComposer>
        <Bloom intensity={5.0} luminanceThreshold={0.3} />
      </EffectComposer>

      {/* blast phase : explosion */}
      <VFXEmitter
        emitter="sparks"
        settings={{
          duration: 1,
          delay: 0.5,
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
          colorEnd: ["#ffffff", "gold"],
          size: [0.05, 0.1],
        }}
      />
    </group>
  );
};
