// Mini-glossario (prima di iniziare)

import { sha256 } from "ethereum-cryptography/sha256";
import { createTimeStamp } from "./utils.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

// Transazione: trasferimento di valore da un indirizzo a un altro.
// Blocco: “contenitore” che raggruppa transazioni + metadati.
// Hash: impronta digitale del contenuto del blocco (serve a garantirne l’integrità).
// Nonce: numero che cambia finché non si trova un hash con le caratteristiche richieste (Proof of Work).
// Difficoltà: quanto è “difficile” trovare un hash valido (es. quante cifre iniziali a zero).
// Genesis block: il primo blocco della catena (non ha un blocco precedente).

// 🧾 Transaction (una singola transazione)
// Rappresenta una transazione tra due indirizzi.
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress; // Indirizzo del mittente
        this.toAddress = toAddress;     // Indirizzo del destinatario
        this.amount = amount;           // Importo trasferito
    }
}

// 📦 Block (un blocco della blockchain)

/**
 * Un blocco contiene:
 * - timestamp: quando è stato creato
 * - transaction: le transazioni (o dati) contenute nel blocco
 * - prevHash: l’hash del blocco precedente (collega i blocchi in catena)
 * - hash: l’hash di questo blocco (calcolato dal suo contenuto)
 * - nonce: numero che cambiamo durante il mining per trovare un hash valido
 */
class Block {
    /**
     * Crea un nuovo blocco.
     * @param {string} timestamp  - data/ora di creazione del blocco
     * @param {object} transaction - i dati del blocco (es. transazioni)
     * @param {string} prevHash   - hash del blocco precedente (per il genesis è "0")
     */
    constructor(timestamp, transaction, prevHash = '') {
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.prevHash = prevHash;
        this.hash = this.calculateHash(); // calcolo iniziale dell’hash
        this.nonce = 0;                   // parte da 0 e cambia durante il mining
    }

    /**
     * Calcola l’hash del blocco in base ai suoi contenuti.
     * L’hash dipende da: prevHash, timestamp, transaction (come stringa) e nonce.
     * Se uno di questi cambia, cambia anche l’hash.
     * @returns {string} hash calcolato (esadecimale)
     */
    calculateHash() {
    const msg = this.prevHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce;
    const bytes = utf8ToBytes(msg);          // string -> bytes
    const digest = sha256(bytes);            // bytes -> bytes
    return toHex(digest);                    // bytes -> hex string (senza "0x")
    }

    /**
     * Esegue il "mining" (Proof of Work).
     * Aumenta il nonce e ricalcola l’hash finché l’hash NON inizia con
     * un certo numero di zeri (la "difficoltà").
     * @param {number} difficulty - quante cifre iniziali a zero servono (es. 2 → "00...")
     */
    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join("0"); // es. "00" se difficulty=2
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;                // prova un nuovo nonce
            this.hash = this.calculateHash(); // ricalcola l’hash
        }
        console.log("Blocco minato:", this.hash);
    }
}

// 🏗️ Blockchain (la catena di blocchi)

/**
 * La Blockchain è una lista ordinata di blocchi.
 * Permette di:
 * - creare il blocco iniziale (genesis)
 * - aggiungere blocchi minando le transazioni in sospeso
 * - verificare che la catena sia integra e non manomessa
 */
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // primo blocco
        this.difficulty = 2;                      // difficoltà del mining (esempio)
        this.pendingTransaction = [];             // transazioni in attesa di essere minate
        this.miningReward = 100;                  // ricompensa per chi mina un blocco
    }

    /**
     * Crea il primo blocco della catena (genesis).
     * Non avendo un predecessore, prevHash è "0".
     */
    createGenesisBlock() {
        return new Block(
            createTimeStamp(),  // quando viene creato
            "Genesis block",    // contenuto semplice
            "0"                 // nessun blocco precedente
        );
    }

    /** Restituisce l’ultimo blocco in catena. */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Mina tutte le transazioni in sospeso in un nuovo blocco:
     * 1) crea un blocco con le pendingTransaction
     * 2) fa il mining (rispetta la difficoltà)
     * 3) aggiunge il blocco alla catena
     * 4) aggiunge una transazione di ricompensa per il miner
     * @param {string} miningRewardAddress - indirizzo del miner che riceve la ricompensa
     */
    minePedingTransactions(miningRewardAddress) {
        const block = new Block(createTimeStamp(), this.pendingTransaction, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("Blocco minato con successo!");
        this.chain.push(block);

        // Dopo il mining, si crea la transazione di ricompensa (verrà minata nel prossimo blocco)
        this.pendingTransaction = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    /** Aggiunge una transazione alla lista in attesa (verrà minata nel prossimo blocco). */
    createTransaction(transaction) {
        this.pendingTransaction.push(transaction);
    }

    /**
     * Calcola il saldo (balance) di un indirizzo:
     * somma tutte le entrate e sottrae tutte le uscite nei blocchi della catena.
     */
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of [].concat(block.transaction || [])) {
                if (trans.fromAddress === address) balance -= trans.amount;
                if (trans.toAddress === address) balance += trans.amount;
            }
        }
        return balance;
    }

    /**
     * Controlla se la catena è valida:
     * - l’hash salvato nel blocco deve combaciare con l’hash ricalcolato
     * - il prevHash di ogni blocco (tranne il genesis) deve essere l’hash del blocco precedente
     * Se uno di questi controlli fallisce, la catena NON è valida.
     */
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];

            if (current.hash !== current.calculateHash()) {
                console.error("Hash non corrispondente:", current);
                return false;
            }
            if (current.prevHash !== previous.hash) {
                console.error("Collegamento al blocco precedente non valido:", current);
                return false;
            }
        }
        return true;
    }
}


export const runMiniPowDemo = () => {
    console.log("=== DEMO Mini Blockchain con Proof of Work ===");

    // Create a new blockchain (poppiCoin) and add some blocks.
    let poppiCoin = new Blockchain();


    poppiCoin.createTransaction(new Transaction("address1", "address2", 100));
    poppiCoin.createTransaction(new Transaction("address1", "address2", 200));

    console.log('\nStarting the miner.');
    poppiCoin.minePedingTransactions('lolle-address');
    console.log("lolle-addres balance is:", poppiCoin.getBalanceOfAddress("lolle-address"));

    console.log('\nStarting the miner 2.');
    poppiCoin.minePedingTransactions('lolle-address');
    console.log("lolle-addres balance is:", poppiCoin.getBalanceOfAddress("lolle-address"));
}