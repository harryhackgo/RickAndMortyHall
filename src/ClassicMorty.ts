import { MortyBase } from "./MortyBase";
import { FairRandom } from "./FairRandom";

export interface chooseBoxesToKeepResult {
  kept: number[];
  reveal: () => void;
}

export class ClassicMorty extends MortyBase {
  name = "ClassicMorty";

  hidePortalGun(range: number, fairRandom: typeof FairRandom): number {
    console.log(
      `Morty: ${this.name} is picking a hiding place (provably fair).`
    );
    return fairRandom.generateFairInt(range, "hiding box").final;
  }

  chooseBoxesToKeep(
    initialPick: number,
    gunIndex: number,
    range: number,
    fairRandom: typeof FairRandom
  ): chooseBoxesToKeepResult {
    console.log(`Morty: Deciding which ${range - 2} boxes to remove...`);
    if (initialPick !== gunIndex) {
      return {
        kept: [initialPick, gunIndex].sort((a, b) => a - b),
        reveal: () => {},
      };
    } else {
      const resAndPick = fairRandom.generateFairInt(
        range - 1,
        "keeper index (excluding initial)"
      );
      const pick = resAndPick.final;
      let idx = 0;
      for (let i = 0; i < range; i++) {
        if (i === initialPick) continue;
        if (idx === pick) {
          return {
            kept: [initialPick, i].sort((a, b) => a - b),
            reveal: resAndPick.reveal,
          };
        }
        idx++;
      }
      throw new Error("ClassicMorty: Unreachable mapping error.");
    }
  }

  calculateProbabilities(range: number) {
    return { stay: 1 / range, switch: (range - 1) / range };
  }
}
