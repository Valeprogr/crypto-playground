# 🌲 Cos’è un Merkle Tree

Un **Merkle Tree** è un **albero di hash**.
Funziona così:

1. Prendi tanti dati (es. transazioni).
2. Calcoli l’**hash** di ognuno → diventano le **foglie**.
3. Combini gli hash **a coppie** e calcoli l’hash del risultato → nodo padre.
4. Ripeti fino a ottenere **un solo hash** in cima: la **Merkle root**.

### Schema semplificato

```
tx1  tx2  tx3  tx4
 |    |    |    |
h1   h2   h3   h4     (h1 = hash(tx1), ecc.)
  \ /      \ /
   a        b        (a = hash(h1+h2), b = hash(h3+h4))
        \  /
        ROOT        (ROOT = hash(a+b))
```

👉 “+” = concatenazione di byte prima di fare l’hash.

---

## 🧠 Perché è usato in blockchain?

Perché permette di **riassumere tante transazioni in un solo hash** (la *Merkle root*), che viene salvata nell’**header del blocco**.

* Il blocco “dichiara”: *“queste sono esattamente le transazioni che contengo”*.
* Chiunque può **verificare** che una transazione sia inclusa **senza scaricare tutto il blocco** → utile per *light clients* (SPV).

📌 In **Bitcoin**: la *Merkle root* riassume le transazioni di un blocco.
📌 In **Ethereum**: il concetto è esteso ai **Patricia Merkle Trie** per stato, storage e log.

---

## ✅ Vantaggi principali

1. **Verifica veloce (O(log n))**
   Per provare che una tx è inclusa basta la transazione + pochi hash “fratelli” (Merkle proof).

2. **Efficienza per light clients (SPV)**
   I wallet leggeri scaricano solo gli **header** (con la root) + la prova → pochi KB invece di MB.

3. **Integrità a cascata**
   Se cambi un singolo byte in una tx → cambia il suo hash → cambia tutta la catena fino alla root.

4. **Scalabilità**
   Con tante transazioni i dati crescono linearmente, ma i **costi di verifica** crescono solo logaritmicamente.

---

## 🔐 Perché è sicuro?

“**Sicuro**” qui significa **integrità** (rilevare manomissioni).
Si basa sulle proprietà delle funzioni **hash crittografiche**:

* **Collision resistant**: impossibile trovare due input diversi con lo stesso hash.
* **Second preimage resistant**: dato un hash, non puoi inventarti un altro input che lo produca.
* **Effetto valanga**: basta cambiare 1 bit → hash completamente diverso.

👉 Quindi:

* Se alteri una tx, la *Merkle root* cambia.
* Per falsificarla servirebbero collisioni hash → **impraticabile** con hash moderni.

> 🔎 Nota: il Merkle Tree **non cripta** i dati. Garantisce integrità, non privacy.

---

## 🧪 Esempio di Merkle Proof

Supponiamo 8 transazioni.
Per dimostrare che **tx5** è inclusa bastano:

* l’hash di **tx5**,
* * gli hash “fratelli” lungo il percorso fino alla root (circa log₂(8) = 3 hash).

Con questi si ricostruisce la root e si confronta con quella nell’header:

* se coincide → tx5 è inclusa e intatta,
* se no → i dati sono corrotti.

---

## 📖 Vocabolario essenziale

* **Merkle Tree** → struttura ad albero per verificare dati.
* **Merkle Root** → l’hash finale che riassume tutto il contenuto di un blocco.
* **Merkle Path** → la sequenza di hash necessari a risalire fino alla root.
* **Merkle Proof** → dimostrazione che una transazione è inclusa in un blocco senza esaminare tutto il blocco.

---

## 🧾 TL;DR

* Merkle Tree = **albero di hash**.
* La **root** riassume tutte le transazioni.
* Permette prove di inclusione **compatte** (O(log n)).
* Fondamentale per **light clients**.
* Sicurezza basata sulla robustezza degli **hash crittografici**.


