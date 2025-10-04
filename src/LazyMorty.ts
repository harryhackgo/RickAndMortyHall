import { MortyBase } from "./MortyBase";
import { FairRandom } from "./FairRandom";
import { chooseBoxesToKeepResult } from "./ClassicMorty";

export class LazyMorty extends MortyBase {
  name = "LazyMorty";

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
    console.log(
      "Morty: I am lazy. I'll remove the lowest-index safe boxes deterministically."
    );
    for (let i = 0; i < range; i++) {
      if (i === initialPick) continue;
      if (i === gunIndex) continue;
      return { kept: [initialPick, i].sort((a, b) => a - b), reveal: () => {} };
    }
    for (let i = 0; i < range; i++) {
      if (i !== initialPick)
        return {
          kept: [initialPick, i].sort((a, b) => a - b),
          reveal: () => {},
        };
    }
    throw new Error("LazyMorty: Couldn't determine boxes to keep.");
  }

  calculateProbabilities(range: number) {
    return { stay: 1 / range, switch: (range - 1) / range };
  }
}
