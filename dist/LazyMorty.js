"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyMorty = void 0;
const MortyBase_1 = require("./MortyBase");
class LazyMorty extends MortyBase_1.MortyBase {
    constructor() {
        super(...arguments);
        this.name = "LazyMorty";
    }
    hidePortalGun(range, fairRandom) {
        console.log(`Morty: ${this.name} is picking a hiding place (provably fair).`);
        return fairRandom.generateFairInt(range, "hiding box");
    }
    chooseBoxesToKeep(initialPick, gunIndex, range, fairRandom) {
        console.log("Morty: I am lazy. I'll remove the lowest-index safe boxes deterministically.");
        for (let i = 0; i < range; i++) {
            if (i === initialPick)
                continue;
            if (i === gunIndex)
                continue;
            return [initialPick, i].sort((a, b) => a - b);
        }
        for (let i = 0; i < range; i++) {
            if (i !== initialPick)
                return [initialPick, i].sort((a, b) => a - b);
        }
        throw new Error("LazyMorty: Couldn't determine boxes to keep.");
    }
    calculateProbabilities(range) {
        return { stay: 1 / range, switch: (range - 1) / range };
    }
}
exports.LazyMorty = LazyMorty;
