// ---------------------------------------------------------
// NORMALIZZAZIONE HASH – utile per confronti (hex / 0x / maiuscole)
// Accetta: Uint8Array o stringhe hex (con/senza 0x), normalizza in hex lower

import { toHex } from "ethereum-cryptography/utils";

// ---------------------------------------------------------
export function normalizeHash(input) {
  if (input instanceof Uint8Array) return toHex(input).toLowerCase();
  if (typeof input === "string") return input.toLowerCase().replace(/^0x/, "");
  throw new TypeError("hash must be Uint8Array or hex string");
}

export  const createTimeStamp = () => {
    const timestamp = new Date().getTime();
    //console.log("Timestamp:", timestamp);
    return timestamp;
}