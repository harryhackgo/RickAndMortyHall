"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArgParser_1 = require("./ArgParser");
const MortyLoader_1 = require("./MortyLoader");
const GameCore_1 = require("./GameCore");
async function main() {
    try {
        const args = new ArgParser_1.ArgParser(process.argv).parse();
        const morty = await MortyLoader_1.MortyLoader.load(args.mortyPath, args.mortyClassName);
        const game = new GameCore_1.GameCore(args.boxCount, morty);
        await game.run();
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}
main();
