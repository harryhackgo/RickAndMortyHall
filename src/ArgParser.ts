export class ArgParser {
  argv: string[];

  constructor(argv: string[]) {
    this.argv = argv;
  }

  parse() {
    const [, , boxCountArg, mortyPath, mortyClassName] = this.argv;

    if (!boxCountArg) {
      throw new Error(
        "Missing box count. Example: node dist/index.js 3 ./dist/morties/ClassicMorty.js ClassicMorty"
      );
    }

    const boxCount = Number(boxCountArg);
    if (!Number.isInteger(boxCount) || boxCount <= 2) {
      throw new Error(
        "Invalid box count (must be integer > 2). Example: node dist/index.js 3 ./dist/morties/ClassicMorty.js ClassicMorty"
      );
    }

    if (!mortyPath) {
      throw new Error(
        "Missing Morty implementation path. Example: node dist/index.js 3 ./dist/morties/ClassicMorty.js ClassicMorty"
      );
    }

    if (!mortyClassName) {
      throw new Error(
        "Missing Morty class name. Example: node dist/index.js 3 ./dist/morties/ClassicMorty.js ClassicMorty"
      );
    }

    return { boxCount, mortyPath, mortyClassName };
  }
}
