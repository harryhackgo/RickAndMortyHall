"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCore = void 0;
const FairRandom_1 = require("./FairRandom");
const readline_sync_1 = __importDefault(require("readline-sync"));
const Stats_1 = require("./Stats");
const TablePrinter_1 = require("./TablePrinter");
class GameCore {
    constructor(n, morty) {
        this.n = n;
        this.morty = morty;
        this.stats = new Stats_1.Stats();
    }
    async run() {
        console.log(`Morty: Oh geez, Rick, I'm gonna hide your portal gun in one of the ${this.n} boxes, okay?`);
        let playing = true;
        while (playing) {
            const gunIndex = FairRandom_1.FairRandom.generateFairInt(this.n, "hiding box");
            let guessStr = readline_sync_1.default.question(`Morty: Okay, I hid the gun. What's your guess [0,${this.n})? `);
            let guess = Number(guessStr);
            while (!Number.isInteger(guess) || guess < 0 || guess >= this.n) {
                guessStr = readline_sync_1.default.question(`Invalid. Enter integer in [0,${this.n}): `);
                guess = Number(guessStr);
            }
            const boxesKept = this.morty.chooseBoxesToKeep(guess, gunIndex, this.n, FairRandom_1.FairRandom);
            if (!boxesKept || boxesKept.length !== 2) {
                throw new Error("Morty must return exactly two boxes to keep.");
            }
            if (!boxesKept.includes(guess)) {
                console.warn("Morty did not include your initial choice among kept boxes; forcing inclusion.");
                boxesKept[0] = guess;
            }
            console.log(`Morty: I'm keeping the box you chose, i mean ${guess}, and the box ${boxesKept.find((x) => x !== guess)}.`);
            console.log("Morty: You can switch your box (enter 0), or, you know, stick with it (enter 1).");
            let decisionStr = readline_sync_1.default.question("Enter 0 to SWITCH, 1 to STAY: ");
            while (decisionStr !== "0" && decisionStr !== "1") {
                decisionStr = readline_sync_1.default.question("Invalid. Enter 0 to SWITCH, 1 to STAY: ");
            }
            const switched = decisionStr === "0";
            const finalBox = switched ? boxesKept.find((b) => b !== guess) : guess;
            console.log(`Morty: Aww man, my hiding index was ${gunIndex}.`);
            if (finalBox === gunIndex) {
                console.log("Morty: Aww man, you won, Rick!");
            }
            else {
                console.log("Morty: Aww man, you lost, Rick. Now we gotta go on one of *my* adventures!");
            }
            this.stats.recordRound(switched, finalBox === gunIndex);
            let again = readline_sync_1.default.question("Morty: D-do you wanna play another round (y/n)? ");
            while (!["y", "n", "Y", "N"].includes(again)) {
                again = readline_sync_1.default.question("Enter y or n: ");
            }
            playing = again.toLowerCase() === "y";
        }
        const probs = this.morty.calculateProbabilities(this.n);
        const summary = this.stats.getSummary(probs.switch, probs.stay);
        TablePrinter_1.TablePrinter.printSummary(this.morty.name, summary);
        console.log("\nMorty: Bye!");
    }
}
exports.GameCore = GameCore;
