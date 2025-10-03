"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FairRandom = void 0;
const crypto_1 = __importDefault(require("crypto"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const KeyManager_1 = require("./KeyManager");
class FairRandom {
    static generateFairInt(range, label = "value") {
        if (!Number.isInteger(range) || range <= 0)
            throw new Error("Range must be integer > 0");
        const key = KeyManager_1.KeyManager.generateKey();
        const mortyValue = crypto_1.default.randomInt(0, range);
        const hmac = crypto_1.default
            .createHmac("sha3-256", key)
            .update(String(mortyValue))
            .digest("hex");
        console.log(`Morty: HMAC(${label})=${hmac}`);
        const prompt = `Rick, enter your number [0,${range}) for ${label}: `;
        let rickValueStr = readline_sync_1.default.question(prompt);
        while (true) {
            const n = Number(rickValueStr);
            if (Number.isInteger(n) && n >= 0 && n < range) {
                const final = (mortyValue + n) % range;
                console.log(`Morty: My secret ${label} = ${mortyValue}.`);
                console.log(`Morty: KEY (${label})=${KeyManager_1.KeyManager.keyToHex(key)}`);
                console.log(`Morty: Final fair ${label} = (${mortyValue} + ${n}) % ${range} = ${final}`);
                const verify = crypto_1.default
                    .createHmac("sha3-256", key)
                    .update(String(mortyValue))
                    .digest("hex");
                if (verify !== hmac) {
                    console.warn("Warning: HMAC verification failed (this should not happen).");
                }
                return final;
            }
            else {
                rickValueStr = readline_sync_1.default.question(`Invalid value. Enter integer in [0,${range}): `);
            }
        }
    }
}
exports.FairRandom = FairRandom;
