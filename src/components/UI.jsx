import { useMagic, spells } from "../hooks/useMagic";
// import { spells } from "../utils";

export const UI = () => {
  const spell = useMagic((state) => state.spell);
  const setSpell = useMagic((state) => state.setSpell);
  const health = useMagic((state) => state.health);
  const kills = useMagic((state) => state.kills);
  const start = useMagic((state) => state.start);
  const gameStatus = useMagic((state) => state.gameStatus);

  console.log("spell UI", spell.name);

  return (
    <>
      {/* section */}
      <section className="fixed bottom-4 left-4 right-4 z-10 flex flex-col gap-4 max-w-4xl mx-auto">
        {/* spells */}
        {gameStatus === "gameover" && (
          <h1 className="text-4xl text-white text-center">💀 Game Over</h1>
        )}
        {gameStatus !== "playing" ? (
          <button
            className={`px-12 py-4 w-full rounded-lg cursor-pointer capitalize text-white 
         bg-black/20 hover:bg-white/10
         transition-colors`}
            onClick={start}
          >
            Play {gameStatus === "gameover" && "again"}
          </button>
        ) : (
          <p className="text-3xl text-white">☠️ {kills}</p>
        )}
        <div className="bg-white/30 rounded-lg overflow-hidden p-4 relative">
          <div
            className={"absolute top-0 left-0 bottom-0 bg-red-600/90"}
            style={{
              width: health + "%",
            }}
          />
        </div>

        <div className="w-full flex items-center justify-stretch gap-4">
          {spells.map((spellItem) => (
            <button
              key={spellItem.name}
              className={`py-4 w-full rounded-lg cursor-pointer capitalize text-white ${
                spell.name === spellItem.name
                  ? "bg-white/20"
                  : "bg-black/20 hover:bg-white/10"
              } transition-colors`}
              onClick={() => setSpell(spellItem)}
            >
              {spellItem.emoji} {spellItem.name}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};
