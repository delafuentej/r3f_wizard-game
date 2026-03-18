import { useGLTF, useTexture, PositionalAudio } from "@react-three/drei";

const sfxs = [
  "/sfxs/fire.mp3",
  "/sfxs/freeze.mp3",
  "/sfxs/buildup.mp3",
  "/sfxs/gravity.mp3",
  "/sfxs/blast.mp3",
];

const AssetsPreload = () => {
  useGLTF.preload("/models/Animated Wizard.glb");
  useGLTF.preload("/models/Icicle.glb");
  useGLTF.preload("/models/Orc.glb");
  useGLTF.preload("/models/WizardTraining.glb");

  useTexture.preload("/textures/magic_01.png");

  {
    sfxs.map((url) => <PositionalAudio url={url} autoplay={false} key={url} />);
  }
  return null;
};

export default AssetsPreload;
