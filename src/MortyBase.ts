import { FairRandom } from "./FairRandom";

/**
 * Base Morty interface / abstract class.
 * Morty implementations must:
 *  - provide a human-friendly name,
 *  - implement hidePortalGun(range, fairRandom) -> returns index in [0, range)
 *  - implement chooseBoxesToKeep(initialPick, gunIndex, range, fairRandom) -> returns array of two indices
 *  - implement calculateProbabilities(range) -> { stay, switch }
 */
export abstract class MortyBase {
  abstract name: string;

  /**
   * Use fairRandom.generateFairInt(range) inside if you need collaborative randomness.
   */
  abstract hidePortalGun(range: number, fairRandom: typeof FairRandom): number;

  /**
   * Return exactly two box indices that remain closed (must include initialPick).
   */
  abstract chooseBoxesToKeep(
    initialPick: number,
    gunIndex: number,
    range: number,
    fairRandom: typeof FairRandom
  ): number[];

  /**
   * Theoretical probability of winning when staying and when switching.
   * Return { stay, switch } where values are floats in [0,1].
   */
  abstract calculateProbabilities(range: number): {
    stay: number;
    switch: number;
  };
}
