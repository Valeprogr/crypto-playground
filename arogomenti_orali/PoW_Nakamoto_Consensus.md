# 🧱 Proof of Work (PoW) & Nakamoto Consensus — Study Notes

Questo file riassume in modo semplice tutto quello visto su **Proof of Work & Mining**, **Nakamoto Consensus**, fork, difficoltà/target e conferme. 

---

## 👷‍♂️ Cosa fanno i miner (PoW)
- Preparano un blocco con transazioni + coinbase.
- Cercano un **nonce** (e altri campi variabili) tale che l’hash dell’header soddisfi: `doubleSHA256(header) < target` (Bitcoin).
- È **tentativo ed errore**: provano miliardi di nonce finché uno “va bene”.
- Quando trovano un hash valido, **annunciano** il blocco alla rete.

---

## 🎯 Perché esiste il target (difficoltà)
Serve a mantenere **stabile la velocità dei blocchi** (≈10 minuti su Bitcoin) anche se l’hashrate cambia.
- Blocchi **troppo veloci** → più fork, emissione troppo rapida, stress su rete/nodi.
- Blocchi **troppo lenti** → code di transazioni, UX pessima.
- Il protocollo **riallinea automaticamente** la difficoltà:
  - **Bitcoin**: ogni **2016 blocchi** (~2 settimane).
  - Target più **basso** ⇒ puzzle più **difficile**. Target più **alto** ⇒ più **facile**.

**Chi decide?** Nessuno a mano: lo impone l’**algoritmo di consenso**. Ogni blocco include `nBits` (target codificato); i **full node** ricalcolano e rifiutano blocchi con target errato.

---

## ⛓️ Nakamoto Consensus (idea chiave)
Tutti i nodi concordano sulla stessa storia delle transazioni seguendo la **catena con più lavoro** (PoW) e regole condivise di validazione.

### Fork temporanei: perché non sono un bug
- Due miner trovano un blocco quasi insieme ⇒ nasce un **fork** (due rami alla stessa altezza).
- I miner continuano a minare sulla punta che hanno ricevuto per prima.
- Appena un ramo riceve **un blocco in più**, ha **più lavoro** e **vince**; l’altro diventa **stale/orphan**.
- La rete **converge da sola** alla catena con più lavoro.

---

## ⏱️ Conferme e finalità
- **Bitcoin (PoW)**  
  - Piccoli importi: 1–3 conferme.  
  - Standard “sicuro”: **6 conferme** (~60 min).
- **Ethereum (PoS, oggi)**  
  - Blocchi ~12s, stato **finalized** ≈ **12–13 minuti** (≈64 blocchi).  
  - Piccoli importi/dApp: spesso **1–2 blocchi**; per importi alti attendi **Finalized**.

**Regola d’oro:** più è alto il valore, **più conferme** aspetti.

---

## ⚡ Perché blocchi troppo veloci sono un problema
1) **Più fork temporanei** (propagazione lenta rispetto al ritmo dei blocchi).  
2) **Emissione sballata** (monete create troppo rapidamente).  
3) **Stress su rete e nodi** (banda, storage) ⇒ rischio **centralizzazione**.  
4) **Svantaggio per i piccoli miner** (vincono più spesso i meglio connessi).

**Rimedio:** l’**aggiustamento della difficoltà** è il “termostato” che riporta la velocità ai valori desiderati.

---

## 👷‍♀️ Due miner sullo stesso blocco?
- **Stessa altezza**: **sì** — tutti cercano il prossimo blocco sopra l’ultimo valido.  
- **Stesso header identico**: praticamente **no** — cambiano extraNonce/set di tx/timestamp per non duplicare lavoro.  
- Se due lo trovano insieme ⇒ **fork breve**; vince la **catena con più lavoro** al blocco successivo.

---

## 🧭 Riepilogo rapido
1. **PoW**: si vince trovando un hash del blocco sotto un **target**.  
2. **Target/Difficoltà**: regolano la **velocità** dei blocchi; aggiornati **automaticamente**.  
3. **Fork**: normali e **temporanei**; la rete converge sul ramo con **più lavoro**.  
4. **Nakamoto Consensus**: regola “**catena con più lavoro**” + validazioni condivise.  
5. **Conferme**: attendi più blocchi per ridurre il rischio di riorganizzazioni.  
6. **Blocchi troppo veloci**: instabilità ⇒ serve l’**aggiustamento della difficoltà**.  
7. **Ethereum oggi**: è **PoS**; i concetti di mining/PoW qui descritti valgono soprattutto per **Bitcoin** e altre chain PoW.

---

### 📌 Note veloci
- *Finalità probabilistica*: in PoW non esiste un “istantaneo” definitivo; la certezza cresce con le conferme.  
- *51% attack*: con >50% dell’hashrate si può riscrivere la storia recente; molto costoso su Bitcoin.  
- *Terminologia utile*: **stale/orphan block**, **hashrate**, **nBits**, **target**, **difficulty adjustment**.