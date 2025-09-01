# 🟣 Le 3 cose fondamentali in Ethereum

### 1. **Transaction**

👉 È **l’azione** che un utente invia alla blockchain.
Può essere:

* mandare **ETH** da A a B,
* eseguire uno **smart contract**,
* distribuire un **nuovo contratto**.

> Pensa a una transaction come a un **biglietto con istruzioni** che dai alla blockchain: “Ehi, trasferisci X ETH da me a lui” oppure “Esegui questa funzione del contratto”.

---

### 2. **Transaction Receipt**

👉 È come la **ricevuta del supermercato**: un documento che Ethereum produce **dopo aver eseguito la transazione**.
Dentro ci trovi:

* quanto **gas** è stato usato,
* se la transazione è andata a buon fine o no,
* i **log** prodotti dagli smart contract (eventi).

> Serve per dimostrare cosa è successo davvero quando la transaction è stata eseguita.

---

### 3. **Account State**

👉 È lo **stato aggiornato degli account** nella blockchain.
Ogni account ha:

* il **saldo in ETH**,
* un **nonce** (numero di transazioni fatte),
* eventuale **codice** (se è un contratto),
* lo **storage** del contratto (dati interni).

> È come il “saldo + informazioni” nel tuo conto Ethereum.

---

# 🔗 Come sono collegate tra loro

Immagina il processo:

1. **Transaction** → lanci un’azione.
2. Ethereum esegue l’azione: aggiorna gli **account state** (es. saldo del mittente diminuisce, saldo del destinatario aumenta).
3. Dopo l’esecuzione, Ethereum genera una **transaction receipt** come prova di cosa è successo.

---

# 🟢 Schema semplificato

```
[Transaction]
     |
     v
Eseguita dal blocco →
     |
     v
[Account State] aggiornato
     |
     v
[Transaction Receipt] generata
```

---

# ✨ Nella blockchain

Ogni blocco contiene:

* tutte le **transactions** (in un Transaction Trie),
* tutte le **receipts** (in un Receipt Trie),
* il nuovo **state** globale (in uno State Trie).

Le **radici hash** di questi 3 trie finiscono nell’**header del blocco** → così tutti possono verificare che i dati siano corretti.



---------
Domanda 🔝 – sì, ci sono alcune **basi fondamentali** che conviene avere ben chiare prima di buttarsi su concetti “core” (tipo EVM, gas, smart contract avanzati, ecc.).
Se le hai solide, poi tutto il resto fila meglio.

---

# 📌 Fondamentali da sapere su Ethereum (prima del “core”)

### 🔹 1. **Tipi di account**

* **Externally Owned Account (EOA)** → account di una persona, controllato da una chiave privata.
* **Contract Account** → account con codice (smart contract), controllato da logica interna e non da una persona.

👉 Differenza:

* EOA = firma transazioni.
* Contratto = risponde a transazioni.

---

### 🔹 2. **Transazioni**

* Sempre inviate da un **EOA**.
* Possono trasferire ETH o eseguire codice di smart contract.
* Hanno sempre **nonce, gas limit, gas price, firma**.

---

### 🔹 3. **Gas**

* L’“energia” per eseguire una transazione o codice.
* Previene loop infiniti e spam.
* “Chi manda paga” → il gas consumato viene pagato in ETH.

---

### 🔹 4. **Stato globale**

* Ethereum mantiene un enorme “**stato condiviso**”: tutti i saldi, contratti e storage.
* Salvato nello **State Trie** (Patricia Merkle Trie).
* Ogni blocco aggiorna questo stato in base alle transazioni.

---

### 🔹 5. **Blocchi**

* Raccolta ordinata di transazioni.
* Contengono nell’**header**:

  * hash del blocco precedente (collega la chain),
  * transaction root (tutte le tx del blocco),
  * receipt root (tutte le ricevute),
  * state root (lo stato globale dopo le tx).

---

### 🔹 6. **Ricevute (transaction receipts)**

* Dopo che una tx viene eseguita, Ethereum genera una ricevuta con:

  * successo/fallimento,
  * gas usato,
  * log/eventi.

---

### 🔹 7. **Proof & Verifiche**

* Tutto è verificabile con Merkle/Patricia proofs.
* Light clients non hanno bisogno di tutto lo stato, solo delle **radici hash** e delle prove.

---

# ✨ In sintesi

Prima di studiare Ethereum “core” (EVM, opcodes, consenso, sharding, ecc.), conviene avere chiari:

* **Account** (EOA vs Contract).
* **Transazioni** e come muovono ETH o chiamano contratti.
* **Gas** (costo dell’esecuzione).
* **Stato globale** (account + storage).
* **Blocchi** (e cosa c’è dentro l’header).
* **Trie & Root hash** (transaction, receipt, state).



