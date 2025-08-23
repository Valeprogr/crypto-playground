// =============================================================
// 📌 getAddress.js – Derivare un Ethereum address da una chiave pubblica
// Autore: Valentina Vittoria (study guide)
//
// ℹ️ In Ethereum, un "address" non è altro che gli ultimi 20 byte
// dell'hash Keccak256 della chiave pubblica (senza il byte iniziale 0x04).
//
// 🚀 Flow completo:
// 1. Prendo la chiave pubblica (65 byte uncompressed).
// 2. Rimuovo il primo byte (0x04 → indica "uncompressed format").
// 3. Calcolo Keccak256 dei restanti 64 byte.
// 4. Estraggo gli ultimi 20 byte (40 caratteri hex).
// 5. Ritorno il risultato come stringa hex con prefisso 0x.
//
// ⚠️ Nota: serve la libreria `ethereum-cryptography`.
//     npm install ethereum-cryptography
// =============================================================

import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

/**
 * Deriva un Ethereum address a partire da una chiave pubblica uncompressed.
 *
 * @param {Uint8Array} publicKey - Chiave pubblica (65 byte, formato uncompressed).
 *                                Il primo byte deve essere 0x04.
 * @returns {string} - Ethereum address (20 byte) in formato hex con prefisso "0x".
 *
 * @example
 * const pubKey = secp.getPublicKey(privKey); // da ethereum-cryptography/secp256k1
 * const address = getAddress(pubKey);
 * console.log(address); // es: 0x742d35cc6634c0532925a3b844bc454e4438f44e
 */
export function getAddress(publicKey) {
  if (!(publicKey instanceof Uint8Array)) {
    throw new TypeError("La chiave pubblica deve essere un Uint8Array.");
  }

  if (publicKey.length !== 65 || publicKey[0] !== 0x04) {
    throw new Error("Chiave pubblica non valida: deve essere 65 byte (uncompressed, prefisso 0x04).");
  }

  // 1️⃣ Rimuovo il byte iniziale (0x04)
  const pubKeyWithoutPrefix = publicKey.slice(1);

  // 2️⃣ Calcolo l'hash keccak256 (32 byte)
  const hash = keccak256(pubKeyWithoutPrefix);

  // 3️⃣ Estraggo gli ultimi 20 byte (Ethereum address)
  const addressBytes = hash.slice(-20);

  // 4️⃣ Converto in stringa esadecimale con prefisso "0x"
  return "0x" + toHex(addressBytes);
}

// =============================================================
// DEMO
// =============================================================



// TODO: Aggiungi una demo eseguibile da INDEX.JS
// Così puoi vedere l'indirizzo generato ogni volta che esegui `node