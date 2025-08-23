// ================================
// ETH STUDY GUIDE – esempi pratici
// ================================
//
// Cosa trovi qui:
// 1) keccak256 di un messaggio (hashMessage) – step base in Ethereum
// 2) Function selector (i primi 4 byte di keccak della firma di funzione)
// 3) Normalizzazione hash (hex / Uint8Array) per confronti robusti
//
// Dipendenze: npm i ethereum-cryptography
// Run: viene mostrato sotto come richiamarlo da index.js
// ================================

import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { normalizeHash } from "./utils";

// ---------------------------------------------------------
// 1) HASH DI UN MESSAGGIO (Keccak256) – base in Ethereum
//    - Converte stringa → bytes UTF-8
//    - Applica keccak256 → Uint8Array (32 byte)
//    - Utile prima di firmare messaggi/tx (si firma l’hash)
// ---------------------------------------------------------
export function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const digest = keccak256(bytes);        // Uint8Array di 32 byte
  return digest;
}

// ---------------------------------------------------------
// 2) FUNCTION SELECTOR – primi 4 byte dell’hash della firma
//    Esempio: "transfer(address,uint256)"
//    - In EVM, il selector è i primi 4 byte di keccak256("firma")
//    - Usato per capire quale funzione chiamare in uno smart contract
// ---------------------------------------------------------
export function getFunctionSelector(signature) {
  const bytes = utf8ToBytes(signature);   // es. "transfer(address,uint256)"
  const digest = keccak256(bytes);        // 32 byte
  const hex = toHex(digest);              // stringa esadecimale
  // primi 8 caratteri hex = 4 byte (2 char per byte)
  const selector = hex.slice(0, 8);
  return selector; // es. "a9059cbb" per transfer(address,uint256)
}


// ---------------------------------------------------------
// 3) DEMO – stampa a console i passaggi (comodissimo per ripasso)
// ---------------------------------------------------------
export function runEthStudyDemo() {
  console.log("=== ETH STUDY GUIDE DEMO ===");

  // A) Hash di un messaggio
  const msg = "Ciao Ethereum!";
  const msgHash = hashMessage(msg);
  console.log("Messaggio:", msg);
  console.log("keccak256(msg):", "0x" + toHex(msgHash));

  // B) Function selector di una firma di funzione
  const signature = "transfer(address,uint256)";
  const selector = getFunctionSelector(signature);
  console.log(`Signature: ${signature}`);
  console.log("Selector (primi 4 byte): 0x" + selector);

  // C) Normalizzazione confronto
  const h1 = "0x" + toHex(msgHash).toUpperCase();
  const h2 = toHex(msgHash).toLowerCase();
  console.log("Confronto hash normalizzati uguali?",
    normalizeHash(h1) === normalizeHash(h2)
  );

  console.log("=== FINE DEMO ===");
}
