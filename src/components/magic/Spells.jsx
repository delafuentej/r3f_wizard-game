import { useMagic } from "../../hooks/useMagic";
import { Lightning, Void, Ice, Fire } from "./SpellsEffect";

const spellComponents = {
  Void,
  Ice,
  Fire,
  Lightning,
};

const Spells = () => {
  const spells = useMagic((state) => state.spells);

  return (
    <>
      {spells.map((spell) => {
        const SpellComponent = spellComponents[spell.name];
        return SpellComponent ? (
          <SpellComponent key={spell.id} position={spell.position} />
        ) : null;
      })}
    </>
  );
};

export default Spells;
