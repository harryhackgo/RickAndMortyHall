"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MortyLoader = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class MortyLoader {
    static async load(mortyPath, mortyClassName) {
        let resolved = mortyPath;
        if (!path_1.default.isAbsolute(mortyPath)) {
            resolved = path_1.default.resolve(__dirname, mortyPath);
        }
        if (!fs_1.default.existsSync(resolved)) {
            throw new Error(`Morty implementation file not found at path: ${resolved}`);
        }
        const mod = require(resolved);
        if (!mod || !mod[mortyClassName]) {
            if (mod && mod.default && mod.default.name === mortyClassName) {
                const Inst = mod.default;
                const inst = new Inst();
                if (inst && typeof inst.hidePortalGun === "function")
                    return inst;
            }
            throw new Error(`Morty class "${mortyClassName}" not found in module ${resolved}. Export a class named ${mortyClassName}.`);
        }
        const MortyClass = mod[mortyClassName];
        const instance = new MortyClass();
        if (!instance || typeof instance.hidePortalGun !== "function") {
            throw new Error(`Loaded Morty class does not implement required methods.`);
        }
        console.log(`Loaded Morty: ${instance.name ?? mortyClassName}`);
        return instance;
    }
}
exports.MortyLoader = MortyLoader;
