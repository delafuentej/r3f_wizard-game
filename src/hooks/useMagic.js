import { create } from "zustand";
import { Vector3 } from "three";
import {
  randInt,
  randFloat,
  randFloatSpread,
} from "three/src/math/MathUtils.js";

export const spells = [
  {
    name: "Void",
    emoji: "🪄",
    duration: 1000,
    colors: ["#d1beff", "white"],
  },
  {
    name: "Ice",
    emoji: "❄️",
    duration: 500,
    colors: ["skyblue", "white"],
  },
  {
    name: "Fire",
    emoji: "🔥",
    duration: 500,
    colors: ["orange", "red"],
  },
  {
    name: "Lightning",
    emoji: "⚡",
    duration: 500,
    colors: ["#33ccff", "#99ddff"],
  },
];

const generateOrc = (idx) => ({
  id: `orc-${idx}`, // Unique ID
  health: 100,
  position: new Vector3(randFloatSpread(-2), 0, randFloat(-15, -20)), // Randomized position
  speed: randFloat(1, 3),
  animation: "CharacterArmature|Walk",
  lastAttack: 0,
});

export const useMagic = create((set, get) => {
  return {
    isCasting: true, // Whether the player is currently casting a spell
    spell: spells[0],
    setSpell: (spell) => {
      set(() => ({
        spell,
      }));
    },
    // setSpell: (spell) => {
    //   set(() => ({
    //     spell: { ...spell },
    //   }));
    // },
    spells: [],
    addSpell: (spell) => {
      set((state) => {
        return {
          spells: [
            ...state.spells,
            {
              id: `${Date.now()}-${randInt(0, 100)}-${state.spells.length}`,
              ...spell,
              time: Date.now(),
            },
          ],
        };
      });

      // Handle collision with orcs: Because we want to trigger the damage only once the blast is done, we use a setTimeout with the spell duration.
      //We loop over the orcs and check if the distance between the spell and the orc is less than 1.
      //If it is, we decrease the orc's health by 40 points and set the animation to HitReact. We also set a lockedUntil timestamp to prevent the orc from moving for a short time.
      //If the orc's health is below 0, we increase the player's kills by 1, set the animation to Death. Then, after 1 second, we reset the position, health, and animation.
      setTimeout(() => {
        get().orcs.forEach((orc) => {
          if (orc.position.distanceTo(spell.position) < 1 && orc.health > 0) {
            orc.health -= 40;
            orc.animation = "CharacterArmature|HitReact";
            orc.lockedUntil = Date.now() + 800;
            if (orc.health <= 0) {
              set((state) => ({
                kills: state.kills + 1,
              }));
              orc.animation = "CharacterArmature|Death";
              orc.health = 0;
              setTimeout(() => {
                orc.position.z = randFloat(-10, -20);
                orc.health = 100;
                orc.animation = "CharacterArmature|Walk";
              }, 1000);
            }
          }
        });
      }, spell.duration);

      //to remove the spell after 4 seconds
      setTimeout(() => {
        set((state) => ({
          spells: state.spells.filter(
            (spell) => Date.now() - spell.time < 4000
          ),
        }));
      }, spell.duration + 4000);

      // Stop casting
      clearTimeout(castingTimeout);
      castingTimeout = setTimeout(() => {
        set(() => ({
          //when we cast a spell and set it back to false after the spell duration.
          isCasting: false,
        }));
      }, spell.duration);
    },
    gameStatus: "idle", // status: 'idle', 'playing', 'gameover'
    kills: 0, // number of orcs killed
    health: 100, //players health
    orcs: [], // array to spawn
    lastSpawn: 0, // a number representing the timestamp of the last orc spawn
    start: () => {
      set(() => ({
        orcs: [],
        gameStatus: "playing",
        health: 100,
        kills: 0,
      }));
    },
    update: (delta) => {
      if (get().gameStatus !== "playing") {
        return;
      }
      if (get().health <= 0) {
        set(() => ({
          gameStatus: "gameover",
          orcs: [],
        }));
        return;
      }
      if (get().lastSpawn < Date.now() - 5000 && get().orcs.length < 50) {
        set((state) => ({
          orcs: [...state.orcs, generateOrc(state.orcs.length)],
          lastSpawn: Date.now(),
        }));
      }
      // Update orcs
      get().orcs.forEach((orc) => {
        if (orc.health <= 0) {
          return;
        }
        if (orc.lockedUntil > Date.now()) {
          return;
        } else {
          orc.animation = "CharacterArmature|Walk";
        }
        if (orc.position.z < 4) {
          orc.position.z += delta * orc.speed;
          orc.lastAttack = Date.now(); // Hack to prevent attacking as soon as they reach the wizard
        } else {
          orc.animation = "CharacterArmature|Weapon";
          if (orc.lastAttack < Date.now() - 1000) {
            orc.lastAttack = Date.now();
            set((state) => ({
              health: state.health - 10,
            }));
          }
        }
      });
    },
  };
});

console.log("state", useMagic.getState());
