// ===============================================
// Proof of Work — Mini Miner (didattico)
// Cosa mostra:
// 1) Prelievo transazioni dal mempool (e rimozione)
// 2) Costruzione blocco con { id, transactions, nonce }
// 3) Loop PoW: trova un hash < TARGET_DIFFICULTY
// Nota : La demo in JS usa JSON/stringhe per semplicità; 
// nel mining reale tutto è binario, l’hash è double SHA-256 (per Bitcoin), 
// e il confronto con la difficoltà avviene su interi 256-bit/byte, non su stringhe.
// ===============================================

import { sha256 } from "ethereum-cryptography/sha256";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";


// ❗ Usa stringa hex per BigInt (evita precision loss con numeri enormi)
const TARGET_DIFFICULTY = BigInt(
  "0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

/** Aggiunge una transazione al mempool */
function addTransaction(tx) {
  mempool.push(tx);
}

/** Esegue il mining di un blocco (didattico) */
function mine() {
  // 1) Prendi e RIMUOVI fino a MAX_TRANSACTIONS dal mempool
  const transactions = mempool.splice(0, MAX_TRANSACTIONS);

  // 2) Prepara il blocco: id = altezza catena, nonce parte da 0
  const block = {
    id: blocks.length,
    transactions,
    nonce: 0,
  };

  // 3) Proof of Work: trova hash < TARGET_DIFFICULTY
  //    L’hash viene calcolato sul blocco che CONTIENE già transactions e nonce
  //    (così cambiare il nonce cambia l’hash)
  while (true) {
    const payload = JSON.stringify(block);             // stringa
    const hashBytes = sha256(utf8ToBytes(payload));    // <-- input in bytes!
    const hashHex   = toHex(hashBytes);                // <-- converti a hex
    const hashBI    = BigInt("0x" + hashHex);          // <-- BigInt per confronto

    if (hashBI < TARGET_DIFFICULTY) {
      block.hash = "0x" + hashHex;
      blocks.push(block);
      return block;
    }

    block.nonce++; // prova un nuovo nonce
  }
}

/** Demo: aggiunge tx, mina 2 blocchi, mostra il risultato */
export function runPowDemo() {
  console.log("=== PoW DEMO ===");

  // aggiungi 15 transazioni di esempio
  for (let i = 1; i <= 15; i++) {
    addTransaction({ from: "Alice", to: "Bob", amount: i });
  }

  console.log("Mempool iniziale:", mempool.length); // 15

  const b1 = mine();
  console.log(
    `Blocco #${b1.id} — tx: ${b1.transactions.length}, nonce: ${b1.nonce}, hash: ${b1.hash.slice(
      0,
      12
    )}...`
  );
  console.log("Mempool dopo blocco 1:", mempool.length); // 5

  const b2 = mine();
  console.log(
    `Blocco #${b2.id} — tx: ${b2.transactions.length}, nonce: ${b2.nonce}, hash: ${b2.hash.slice(
      0,
      12
    )}...`
  );
  console.log("Mempool dopo blocco 2:", mempool.length); // 0 o < 10

  console.log("Totale blocchi:", blocks.length);
}


