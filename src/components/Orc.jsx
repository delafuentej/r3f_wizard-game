import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { LoopOnce } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

export const Orc = ({ orc, ...props }) => {
  const { scene, animations } = useGLTF(`/models/Orc.glb`);
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const ref = useRef();

  const [animation, setAnimation] = useState("CharacterArmature|Walk");
  const { actions } = useAnimations(animations, ref);

  if (actions?.["CharacterArmature|Death"]) {
    actions["CharacterArmature|Death"].setLoop(LoopOnce);
    actions["CharacterArmature|Death"].clampWhenFinished = true;
  }
  if (actions?.["CharacterArmature|HitReact"]) {
    actions["CharacterArmature|HitReact"].setLoop(LoopOnce);
    actions["CharacterArmature|HitReact"].clampWhenFinished = true;
  }

  useEffect(() => {
    const action = actions[animation];
    if (!action) {
      return;
    }
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [animation, actions]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  const healthBar = useRef();

  useFrame(() => {
    if (animation !== orc.animation) {
      setAnimation(orc.animation);
    }
    if (ref.current.position.distanceTo(orc.position) < 1) {
      ref.current.position.lerp(orc.position, 0.1);
    } else {
      ref.current.position.copy(orc.position);
    }

    healthBar.current.scale.x = (1 * orc.health) / 100;
  });

  return (
    <group {...props} ref={ref} position={orc.position}>
      <mesh position-y={3.5} ref={healthBar}>
        <planeGeometry args={[1, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <primitive object={clonedScene} />
    </group>
  );
};

useGLTF.preload("/models/Orc.glb");
