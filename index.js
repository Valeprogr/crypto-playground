import { sha256 } from "ethereum-cryptography/sha256";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

// importa la funzione dal nuovo file
import { findMatchingCandidateByHash, dataset } from "./src/bruteforce_color_demo.js";

const msg = "blue"; // prova con un colore presente nel dataset
const hash = sha256(utf8ToBytes(msg));

console.log("Hash di", msg, ":", toHex(hash));

const found = findMatchingCandidateByHash(hash, dataset.CANDIDATE_COLORS);
console.log("Colore trovato:", found);
