import { ArgParser } from "./ArgParser";
import { MortyLoader } from "./MortyLoader";
import { GameCore } from "./GameCore";

async function main() {
  try {
    const args = new ArgParser(process.argv).parse();
    const morty = await MortyLoader.load(args.mortyPath, args.mortyClassName);
    const game = new GameCore(args.boxCount, morty);
    await game.run();
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
