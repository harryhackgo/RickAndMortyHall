import path from "path";
import fs from "fs";
import { MortyBase } from "./MortyBase";

/**
 * Loads Morty implementation from the given path and class name.
 * The path may be a TypeScript/JavaScript file exporting the class.
 */
export class MortyLoader {
  static async load(
    mortyPath: string,
    mortyClassName: string
  ): Promise<MortyBase> {
    // Resolve path
    let resolved = mortyPath;
    if (!path.isAbsolute(mortyPath)) {
      resolved = path.resolve(process.cwd(), mortyPath);
    }

    if (!fs.existsSync(resolved)) {
      throw new Error(
        `Morty implementation file not found at path: ${resolved}`
      );
    }

    // require the module
    const mod = require(resolved);

    if (!mod || !mod[mortyClassName]) {
      // try default export fallback
      if (mod && mod.default && mod.default.name === mortyClassName) {
        const Inst = mod.default;
        const inst = new Inst();
        if (inst && typeof inst.hidePortalGun === "function") return inst;
      }
      throw new Error(
        `Morty class "${mortyClassName}" not found in module ${resolved}. Export a class named ${mortyClassName}.`
      );
    }

    const MortyClass = mod[mortyClassName];
    const instance = new MortyClass();
    // basic shape validation
    if (!instance || typeof instance.hidePortalGun !== "function") {
      throw new Error(
        `Loaded Morty class does not implement required methods.`
      );
    }
    console.log(`Loaded Morty: ${instance.name ?? mortyClassName}`);
    return instance;
  }
}
