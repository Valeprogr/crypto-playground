import { sha256 } from "ethereum-cryptography/sha256";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from '@noble/secp256k1';
import { getRandomBytesSync } from "ethereum-cryptography/random.js";
import { getAddress } from "./src/get_address.js";

import { findMatchingCandidateByHash, dataset } from "./src/bruteforce_color_demo.js";
console.log("=== BRUTE FORCE COLOR DEMO ===");

const msg = "blue"; // prova con un colore presente nel dataset
const hash = sha256(utf8ToBytes(msg));

console.log("Hash di", msg, ":", toHex(hash));

const found = findMatchingCandidateByHash(hash, dataset.CANDIDATE_COLORS);
console.log("Colore trovato:", found);


// ===============================
// Esegui anche la demo di hash_keccak.js
// ===============================

// 🔑 1. Genera una chiave privata (Uint8Array random)

console.log("\n=== ETHEREUM ADDRESS DEMO ===");

const privKey =  getRandomBytesSync(32);

// 🔑 2. Ottieni la chiave pubblica uncompressed (65 byte, inizia con 0x04)
const pubKey = secp.getPublicKey(privKey, false);

// 🔑 3. Ricava l’indirizzo Ethereum
const address = getAddress(pubKey);

console.log("Private key:", toHex(privKey));
console.log("Public key:", toHex(pubKey));
console.log("Ethereum address:", address);