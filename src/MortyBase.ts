import { FairRandom } from "./FairRandom";

export abstract class MortyBase {
  abstract name: string;

  abstract hidePortalGun(range: number, fairRandom: typeof FairRandom): number;

  abstract chooseBoxesToKeep(
    initialPick: number,
    gunIndex: number,
    range: number,
    fairRandom: typeof FairRandom
  ): number[];

  abstract calculateProbabilities(range: number): {
    stay: number;
    switch: number;
  };
}
