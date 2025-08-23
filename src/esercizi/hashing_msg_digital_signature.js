// ===========================================================
// ✅ Esercizio 1 – Hashing messaggi + Firma digitale (ECDSA)
// ===========================================================

// Obiettivo: firmare un messaggio e verificarne la firma.
// Concetti: utf8ToBytes, keccak256, ECDSA (chiave privata/pubblica), verifica firma.

// --- Passi ---
// 1. Genera una chiave privata casuale (32 byte) e la relativa chiave pubblica (uncompressed).
// 2. Calcola l’hash Keccak256 del messaggio (in bytes UTF-8).
// 3. Firma l’hash con la chiave privata (ECDSA su secp256k1).
// 4. Verifica la firma con la chiave pubblica.
// 5. Stampa a console: messaggio, hash, firma, esito verifica (true/false).

// Suggerimento: usa le librerie `ethereum-cryptography` e `@noble/secp256k1`.

// ===============================
// ESECUZIONE ESERCIZIO 1

// TODO: Scegli un messaggio da firmare
const message = "Hello Ethereum!";

// TODO: 1. Genera chiave privata e pubblica

// TODO: 2. Calcola hash Keccak256 del messaggio

// TODO: 3. Firma l’hash con la chiave privata

// TODO: 4. Verifica la firma con la chiave pubblica

// TODO: 5. Stampa i risultati a console


// ===========================================================
// ✅ Esercizio 2 – getAddress + Keccak256
// ===========================================================

// Obiettivo: generare un indirizzo Ethereum da una chiave privata.
// Concetti: secp256k1.getPublicKey, keccak256, ultimi 20 byte, formato 0x….

// --- Passi ---
// 1. Genera una chiave privata casuale (32 byte).
// 2. Deriva la chiave pubblica uncompressed (65 byte, prefisso 0x04).
// 3. Rimuovi il byte iniziale, calcola Keccak256 dei 64 byte restanti.
// 4. Prendi gli ultimi 20 byte → questo è l’indirizzo.
// 5. Stampa a console: private key, public key, address.

// ===============================
// ESECUZIONE ESERCIZIO 2

// TODO: 1. Genera chiave privata

// TODO: 2. Deriva chiave pubblica uncompressed

// TODO: 3. Calcola Keccak256 dei 64 byte (senza prefisso)

// TODO: 4. Prendi ultimi 20 byte (indirizzo Ethereum)

// TODO: 5. Stampa i risultati a console

// ===========================================================
// Suggerimento: importa solo le funzioni che ti servono per ogni esercizio.
// Puoi cancellare i TODO una volta completati.
// ===========================================================