import crypto from "crypto";
import readlineSync from "readline-sync";
import { KeyManager } from "./KeyManager";

export class FairRandom {
  static generateFairInt(range: number, label = "value"): number {
    if (!Number.isInteger(range) || range <= 0)
      throw new Error("Range must be integer > 0");

    const key = KeyManager.generateKey();
    const mortyValue = crypto.randomInt(0, range);

    const hmac = crypto
      .createHmac("sha3-256", key)
      .update(String(mortyValue))
      .digest("hex");

    console.log(`Morty: HMAC(${label})=${hmac}`);
    const prompt = `Rick, enter your number [0,${range}) for ${label}: `;
    let rickValueStr = readlineSync.question(prompt);
    while (true) {
      const n = Number(rickValueStr);
      if (Number.isInteger(n) && n >= 0 && n < range) {
        const final = (mortyValue + n) % range;
        console.log(`Morty: My secret ${label} = ${mortyValue}.`);
        console.log(`Morty: KEY (${label})=${KeyManager.keyToHex(key)}`);
        console.log(
          `Morty: Final fair ${label} = (${mortyValue} + ${n}) % ${range} = ${final}`
        );
        const verify = crypto
          .createHmac("sha3-256", key)
          .update(String(mortyValue))
          .digest("hex");
        if (verify !== hmac) {
          console.warn(
            "Warning: HMAC verification failed (this should not happen)."
          );
        }
        return final;
      } else {
        rickValueStr = readlineSync.question(
          `Invalid value. Enter integer in [0,${range}): `
        );
      }
    }
  }
}
