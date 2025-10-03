"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyManager = void 0;
const crypto_1 = __importDefault(require("crypto"));
class KeyManager {
    static generateKey() {
        return crypto_1.default.randomBytes(32);
    }
    static keyToHex(key) {
        return key.toString("hex");
    }
}
exports.KeyManager = KeyManager;
