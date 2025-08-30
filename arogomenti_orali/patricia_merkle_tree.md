# 📘 Mini Introduzione ai Patricia Merkle Trie (PMT)

### 🔹 Cos’è

Un **Patricia Merkle Trie (PMT)** è una **struttura dati** usata nelle blockchain (es. **Ethereum**) per **memorizzare e verificare** grandi quantità di informazioni in modo **sicuro, efficiente e compatto**.

---

### 🔹 Da dove viene il nome

* **Patricia Trie** → un albero “compatto” che organizza dati come un dizionario basato su prefissi.
* **Merkle Tree** → un albero che usa funzioni **hash** per garantire che i dati non siano stati modificati.

👉 Insieme formano una struttura che:

* organizza i dati come coppie **chiave → valore**,
* permette di verificarne facilmente l’integrità.

---

### 🔹 Come funziona (versione semplificata)

1. Ogni **chiave** (es. un indirizzo di account) viene convertita in hash e inserita nel trie.
2. I **nodi interni** rappresentano prefissi comuni delle chiavi.
3. Le **foglie** contengono i valori associati (saldo, dati di smart contract, ecc.).
4. La **radice (root hash)** del trie rappresenta l’intero insieme di dati.
5. Se un solo dato cambia → cambia anche la radice → tutti possono accorgersene subito.

---

### 🔹 Perché è utile in blockchain

* 🔒 **Sicurezza** → nessuno può alterare i dati senza essere scoperto.
* ⚡ **Efficienza** → ricerca e aggiornamenti rapidi.
* 📦 **Compattezza** → riduce memoria comprimendo i rami inutili.
* 🌍 **Consenso** → tutti i nodi confrontano la radice per verificare che abbiano lo stesso stato.

---

### 🔹 Concetti chiave da ricordare

* **Ordine dei dati** → non è scelto dalle persone, ma determinato automaticamente dalle **chiavi hashate**.
* **Radice (root hash)** → è come una “firma digitale” di tutto lo stato.
* **In Ethereum** ci sono 3 PMT principali:

  1. Stato degli account (saldi + contratti).
  2. Transazioni in ogni blocco.
  3. Ricevute delle transazioni.

---

### 🔹 Da ripetere

✅ Differenza tra **Trie**, **Merkle Tree** e **Patricia Merkle Trie**.
✅ Come funziona la **verifica con gli hash**.
✅ A cosa serve in **Ethereum**.

