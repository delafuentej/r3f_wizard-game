import { PositionalAudio } from "@react-three/drei";

const sfxs = [
  "/sfxs/fire.mp3",
  "/sfxs/freeze.mp3",
  "/sfxs/buildup.mp3",
  "/sfxs/gravity.mp3",
  "/sfxs/blast.mp3",
];

const Preloader = () => {
  return (
    <>
      {sfxs.map((url) => (
        <PositionalAudio url={url} autoplay={false} key={url} />
      ))}
    </>
  );
};

export default Preloader;
