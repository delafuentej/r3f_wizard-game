import { useMagic } from "../hooks/useMagic";
import { Orc } from "./Orc";

const Orcs = () => {
  const orcs = useMagic((state) => state.orcs);

  return orcs.map((orc) => <Orc key={orc.id} orc={orc} scale={0.5} />);
};

export default Orcs;
