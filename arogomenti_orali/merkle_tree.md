# 🌲 Cos’è un Merkle Tree 

È un **albero di hash**: prendi tanti dati (es. transazioni), fai l’**hash** di ognuno (foglie), poi **combini a coppie** e rimetti l’hash dei due sopra… finché resta **un solo hash** in cima: la **Merkle root**.

Piccolo schema:

```
tx1  tx2  tx3  tx4
 |    |    |    |
h1   h2   h3   h4        (h1 = hash(tx1), ecc.)
  \ /      \ /
  a         b            (a = hash(h1+h2), b = hash(h3+h4))
       \   /
        ROOT             (ROOT = hash(a+b))
```

> “+” = concatenazione di byte prima di fare l’hash.

---

## 🧠 Perché si usa in blockchain?

Perché permette di **riassumere tante transazioni in un solo hash** (la Merkle root) che finisce dentro al **blocco**.
Così:

* il blocco “promette”: “queste sono esattamente le tx che contengo”;
* chiunque può **verificare** che una specifica tx è dentro **senza** scaricare tutto il blocco (SPV, *light clients*).

In Bitcoin, la Merkle root delle transazioni è salvata nell’**header del blocco**.
In Ethereum, il concetto è esteso (Merkle-Patricia tries) per **stato account, storage, logs**.

---

## ✅ Vantaggi principali

1. **Verifica veloce (O(log n))**
   Per provare che *tx7* è dentro, basta inviare **tx7 + pochi hash “fratelli”** (il cosiddetto **Merkle proof**). La prova cresce come **log₂(n)**, non con n.

2. **Efficienza per light clients (SPV)**
   Un wallet “leggero” non scarica tutto: basta l’**header** del blocco (che ha la root) + la **prova Merkle**. Pochi KB invece di MB.

3. **Integrità a cascata**
   Se **cambi 1 byte** in una tx, cambia il suo hash, poi il nodo sopra, poi sopra ancora… **fino alla root**. Quindi è **impossibile** alterare una tx **senza** far cambiare la root del blocco.

4. **Scalabilità**
   Aggiungere tante tx fa crescere i dati in modo lineare, ma i **costi di verifica** crescono solo **logaritmicamente**.

---

## 🔐 Perché è “sicuro” per salvare/verificare dati?

“**Sicuro**” qui vuol dire **integrità** (rilevare manomissioni), non segretezza.

Si basa sulle proprietà delle **funzioni di hash crittografiche**:

* **Resistenza alle collisioni**: trovare **due dati diversi** con **lo stesso hash** è computazionalmente impraticabile.
* **Second preimage**: dato un hash, non riesci a inventarti un altro contenuto che lo produca.
* **Effetto valanga**: cambi un bit → hash completamente diverso.

Quindi:

* Se qualcuno prova a sostituire/alterare dati, la **Merkle root cambia**.
* Per “barare” dovrebbe trovare collisioni per far coincidere la root… **impraticabile** con hash moderni.

> Nota: la Merkle tree **non cifra** i dati; serve a **dimostrare che non sono stati cambiati**. Se vuoi **privacy**, serve la crittografia a parte.

---

## 🧪 Mini esempio di “Merkle proof”

Supponiamo 8 transazioni. Per provare che **tx5** è inclusa, ti bastano:

* l’hash di **tx5**
* gli hash “fratelli” lungo il percorso fino alla root (circa **log₂(8)=3** hash)

Ricostruisci gli hash verso l’alto e confronti la root calcolata con la **Merkle root nel blocco**:

* se uguale → **inclusa e intatta**;
* se diversa → qualcosa non torna.

---

## 🧾 TL;DR

* **Merkle tree = albero di hash**; la **root** riassume tutto.
* In blockchain garantisce **integrità** e **prove compatte** d’inclusione.
* **Veloce da verificare** (O(log n)), perfetto per **light clients**.
* “Sicuro” perché si appoggia alla **robustezza degli hash**: se cambi qualcosa, la root “urla”.
