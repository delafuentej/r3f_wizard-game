import React, { useRef, useEffect, useState } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { VFXEmitter } from "wawa-vfx";
import { Line, PositionalAudio } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const Lightning = ({ startY = 10, position = [0, 0, 0] }) => {
  const [x, y, z] = position;
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
      flashRef.current.material.opacity = triggered ? 0.4 : 0.2;
    }
  });

  // Ray path generation (zigzag)
  const generateRay = () => {
    const points = [];
    const segments = 50;
    const spread = 1;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const currentY = startY - t * (startY - y);
      const xOffset = Math.random() * spread;
      const zOffset = (Math.random() - 0.5) * spread;
      points.push(new Vector3(x + xOffset, currentY, z + zOffset));
    }
    return points;
  };

  return (
    <group position={position}>
      {/* Rayo visible como línea brillante */}
      {visible && (
        <Line
          position={position}
          ref={lightningRef}
          points={generateRay()}
          color="#33ccff"
          lineWidth={5}
          transparent
          opacity={0.9}
        />
      )}

      {/* Flash de iluminación al impactar */}
      {/* <mesh ref={flashRef} position={[x, 1, z]}> */}
      {/* <sphereGeometry args={[1, 4, 4]} /> */}
      {/* <meshBasicMaterial color="white" transparent opacity={0} /> */}
      {/* </mesh> */}
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
          delay: 0.2,
          nbParticles: 300,
          spawnMode: "burst",
          loop: false,
          startPositionMin: [0, 0, 0],
          startPositionMax: [0, 0, 0],
          startRotationMin: [0, 0, 0],
          startRotationMax: [0, 0, 0],
          particlesLifetime: [0.1, 1],
          speed: [2, 8],
          directionMin: [-1, 0, -1],
          directionMax: [1, 1, 1],
          rotationSpeedMin: [0, 0, 0],
          rotationSpeedMax: [0, 0, 0],
          colorStart: ["#ff0000", "#d1beff"],
          colorEnd: ["#ff0000", "gold"],
          size: [0.05, 0.1],
        }}
      />
    </group>
  );
};

export default Lightning;
