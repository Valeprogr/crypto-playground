// ===============================
// Brute Force Hashing (Demo didattica)
// ===============================
//
// Obiettivo: mostrare come funziona un confronto "brute force" su un insieme
// FINITO di input possibili, usando SHA-256. Non invertiamo l’hash: proviamo
// candidati, calcoliamo l’hash e confrontiamo.
//
// Parole chiave:
// - "Brute force": provare molte ipotesi finché non trovi quella giusta.
// - "Hashing": trasformare un input di qualunque lunghezza in un’impronta fissa (es. 32 byte).
// - Perché è difficile da attaccare in pratica? Con input grandi/spazio enorme il brute force è impraticabile.
//   Si usano anche SALT (valore casuale per utente) e algoritmi lenti (bcrypt/Argon2) per rallentare gli attacchi.
//
// Nota: questa demo usa un set piccolissimo di candidati (colori) per semplicità.
//
// Dipendenze:
//   npm i ethereum-cryptography
//
// Esecuzione:
//   node bruteforce_color_demo.js
// ===============================

import { sha256 } from "ethereum-cryptography/sha256";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

// ---------------------------------
// 1) Dati di esempio (lo "spazio di ricerca")
// ---------------------------------
const CANDIDATE_COLORS = ["red", "green", "blue", "yellow", "pink", "orange"];

// ---------------------------------
// 2) Utility: hashing e normalizzazione
// ---------------------------------

/** Ritorna l'hash SHA-256 (stringa esadecimale minuscola) di una stringa UTF-8. */
function sha256HexOfString(str) {
  const bytes = utf8ToBytes(str);
  const digest = sha256(bytes);        // Uint8Array (32 byte)
  return toHex(digest).toLowerCase();  // stringa hex
}

/** Normalizza l’input hash (Uint8Array o stringa hex) in stringa hex minuscola senza prefisso 0x. */
function normalizeHash(input) {
  if (input instanceof Uint8Array) return toHex(input).toLowerCase();
  if (typeof input === "string") return input.toLowerCase().replace(/^0x/, "");
  throw new TypeError("hash must be Uint8Array or hex string");
}

// ---------------------------------
// 3) Brute force: cerca il candidato che produce un certo hash
// ---------------------------------

/**
 * Dato un hash (stringa hex o Uint8Array) e una lista di candidati (stringhe),
 * calcola SHA-256 di ogni candidato e ritorna il candidato che combacia.
 * Se non trova nulla, ritorna null.
 */
export function findMatchingCandidateByHash(targetHash, candidates) {
  const target = normalizeHash(targetHash);

  for (const candidate of candidates) {
    const candidateHash = sha256HexOfString(candidate);
    // Per studio: stampa i tentativi (commenta se ti dà fastidio)
    // console.log(`Provo "${candidate}" → ${candidateHash}`);
    if (candidateHash === target) return candidate;
  }
  return null;
}

// ---------------------------------
// 4) Demo pratica: “indovina il colore”
// ---------------------------------

/**
 * Per la demo, scegliamo un “segreto” (es. "blue"),
 * calcoliamo il suo hash, poi proviamo a risalirci via brute force
 * sullo spazio dei colori candidati.
 */
function runDemo() {
  const secretColor = "blue";
  const targetHash = sha256HexOfString(secretColor);

  console.log("=== DEMO BRUTE FORCE SEMPLICE ===");
  console.log("Spazio di ricerca:", CANDIDATE_COLORS);
  console.log(`Colore segreto (per la demo): "${secretColor}"`);
  console.log("Hash bersaglio:", targetHash);
  console.log("---------------------------------");

  const found = findMatchingCandidateByHash(targetHash, CANDIDATE_COLORS);

  if (found) {
    console.log(`✅ Trovato! Il candidato che produce l'hash è: "${found}"`);
  } else {
    console.log("❌ Nessun candidato corrisponde all'hash dato.");
  }

  console.log("\nNote:");
  console.log("- Qui funziona perché lo spazio dei candidati è piccolo.");
  console.log("- Nella realtà, con password lunghe/complessità alta, il brute force diventa impraticabile.");
  console.log("- Per difendersi si usano SALT unici e funzioni lente come bcrypt/Argon2.");
}

// Esegui la demo se lanci questo file direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runDemo();
}

// ---------------------------------
// 5) Export aggiuntivi utili per esercizi/test
// ---------------------------------
export const utils = { sha256HexOfString, normalizeHash };
export const dataset = { CANDIDATE_COLORS };


