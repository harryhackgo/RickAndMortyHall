import path from "path";
import fs from "fs";
import { MortyBase } from "./MortyBase";

export class MortyLoader {
  static async load(
    mortyPath: string,
    mortyClassName: string
  ): Promise<MortyBase> {
    let resolved = mortyPath;
    if (!path.isAbsolute(mortyPath)) {
      resolved = path.resolve(__dirname, mortyPath);
    }

    if (!fs.existsSync(resolved)) {
      throw new Error(
        `Morty implementation file not found at path: ${resolved}`
      );
    }

    const mod = require(resolved);

    if (!mod || !mod[mortyClassName]) {
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
    if (!instance || typeof instance.hidePortalGun !== "function") {
      throw new Error(
        `Loaded Morty class does not implement required methods.`
      );
    }
    console.log(`Loaded Morty: ${instance.name ?? mortyClassName}`);
    return instance;
  }
}
