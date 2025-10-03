import crypto from "crypto";

export class KeyManager {
  static generateKey(): Buffer {
    return crypto.randomBytes(32);
  }

  static keyToHex(key: Buffer): string {
    return key.toString("hex");
  }
}
