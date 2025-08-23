# 🔐 Crypto Playground

Un piccolo playground didattico per esplorare concetti di **crittografia** legati a **Ethereum** e alla **blockchain**, usando JavaScript e le librerie [`ethereum-cryptography`](https://github.com/ethereumjs/ethereum-cryptography) e [`@noble/secp256k1`](https://github.com/paulmillr/noble-secp256k1).

L’obiettivo è raccogliere esempi pratici e appunti per imparare:
- Funzioni di hash (SHA-256, Keccak-256).
- Firma e verifica (ECDSA).
- Derivazione degli indirizzi Ethereum.
- Demo didattiche come brute force hashing.

---

## 📂 Struttura del progetto

- **`index.js`**  
  Playground principale: richiama le demo e mostra esempi pratici.

### 🔑 Demos / Basics
- **`bruteforce_color_demo.js`**  
  Demo didattica di brute force hashing su un insieme finito di colori (SHA-256).

- **`src/crypto-basics/keccak-basics.js`**  
  Funzioni legate a Keccak256:  
  1. `hashMessage()` → hash di un messaggio.  
  2. `getFunctionSelector()` → primi 4 byte della firma di funzione.  
  3. `normalizeHash()` → normalizzazione hash per confronti robusti.  

- **`src/crypto-basics/get-address.js`**  
  Derivazione di un indirizzo Ethereum da una chiave pubblica (65 byte uncompressed). 

- **`src/pow_miner_demo.js`**
    Proof of Work — Mini Miner (didattico)

- **(In arrivo)**  
Hashing and Proof of Work



### 📝 Appunti (cheatsheet)

* `argomenti_orali/Public_Key_Cryptography.md` — Guida pratica alla **crittografia a chiave pubblica**: concetti chiave, analogie, differenza tra **cifratura** e **firma**.
* `argomenti_orali/crypto_resources.md` — **Raccolta di risorse** (articoli, wiki, video) su ECDSA, RSA, Diffie-Hellman, Bitcoin/Ethereum.
* `argomenti_orali/PoW_Nakamoto_Consensus.md` — Sintesi di **Proof-of-Work**, **Nakamoto Consensus**, fork, aggiustamento di **difficoltà/target** e **conferme**.




## 📦 Dipendenze

- [ethereum-cryptography](https://www.npmjs.com/package/ethereum-cryptography) → funzioni di hash, utilità bytes/hex, random.  
- [@noble/secp256k1](https://www.npmjs.com/package/@noble/secp256k1) → curve ellittiche, chiavi pubbliche/firmare/verificare.  

Installa le dipendenze con:

```sh
npm install
````

---

## ▶️ Uso

Esegui l’intero playground:

```sh
node index.js
```

Oppure, se hai `nodemon` configurato:

```sh
npm run dev
```

Puoi modificare `index.js` per lanciare la demo che vuoi ripassare:

```js
// index.js
import { runKeccakDemo } from "./src/crypto-basics/keccak-basics.js";
import { runEthStudyDemo } from "./bruteforce_color_demo.js";

runKeccakDemo();
// runEthStudyDemo();
```

---

## 🎯 Obiettivi didattici

* Capire come funzionano gli **hash** e perché sono one-way.
* Vedere come Ethereum usa **Keccak256** (function selector, indirizzi).
* Comprendere come da una **chiave privata → chiave pubblica → indirizzo**.
* Imparare le basi della **firma digitale** con ECDSA.
* Prepararsi a collegare la teoria con la pratica (blockchain, smart contract, wallet).



