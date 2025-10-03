import { MortyBase } from "./MortyBase";
import { FairRandom } from "./FairRandom";

export class ClassicMorty extends MortyBase {
  name = "ClassicMorty";

  hidePortalGun(range: number, fairRandom: typeof FairRandom): number {
    console.log(
      `Morty: ${this.name} is picking a hiding place (provably fair).`
    );
    return fairRandom.generateFairInt(range, "hiding box");
  }

  chooseBoxesToKeep(
    initialPick: number,
    gunIndex: number,
    range: number,
    fairRandom: typeof FairRandom
  ): number[] {
    console.log(`Morty: Deciding which ${range - 2} boxes to remove...`);
    if (initialPick !== gunIndex) {
      console.log(
        "Morty: Since Rick's guess is wrong, I'll keep his box and the box with the gun."
      );
      return [initialPick, gunIndex].sort((a, b) => a - b);
    } else {
      console.log(
        "Morty: Since Rick guessed correctly, I'll pick one other box fairly to keep (so it looks random)."
      );
      const pick = fairRandom.generateFairInt(
        range - 1,
        "keeper index (excluding initial)"
      );
      let idx = 0;
      for (let i = 0; i < range; i++) {
        if (i === initialPick) continue;
        if (idx === pick) {
          return [initialPick, i].sort((a, b) => a - b);
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
