
import { toHex } from "ethereum-cryptography/utils";
import * as secp from '@noble/secp256k1';
import { getRandomBytesSync } from "ethereum-cryptography/random.js";
import { getAddress } from "./src/get_address.js";
import { runDemo } from "./src/bruteforce_color_demo.js";
import { runPowDemo } from "./src/pow_miner_demo.js";

// ===============================
// Esegui anche la demo di bruteforce_color_demo.js
// ===============================  

runDemo()


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


// ===============================
// Esegui proof_of_work_demo.js
// ===============================

runPowDemo();