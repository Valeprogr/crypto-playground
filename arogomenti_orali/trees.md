## 1) Cos’è un albero? (struttura dati)

* **Nodo**: un “puntino” che contiene un valore (es. un numero).
* **Arco**: il collegamento tra nodi.
* **Radice (root)**: il nodo in cima.
* **Figli (children)**: nodi collegati sotto un nodo.
* **Genitore (parent)**: il nodo sopra.
* **Foglia (leaf)**: nodo senza figli.
* **Livello/Profondità**: quante “righe” sotto la radice.
* **Altezza**: numero di livelli dell’albero.

Piccolo schema:

```
        (root)
        /    \
     (A)      (B)
    /  \        \
  (C)  (D)      (E)  ← foglie
```

### Albero binario

È un albero dove **ogni nodo ha al massimo due figli**: sinistro e destro.

---

## 2) Perché servono nella crypto / blockchain?

Gli alberi danno **ricerche e verifiche veloci** (pochi passi anche con tanti dati). In crypto si usano per:

* **Merkle tree (Bitcoin/Ethereum):**

  * Riepiloga tutte le transazioni di un blocco in una sola “impronta” (Merkle root).
  * Consente **prove di inclusione** piccole e veloci (SPV): per dimostrare “questa tx è nel blocco” servono solo **O(log n)** hash, non tutto il blocco.

* **State trie / Merkle-Patricia Trie (Ethereum):**

  * Indice degli account, bilanci e storage dei contratti.
  * Permette di trovare/validare uno stato con percorsi **logaritmici** e prove compatte.

* **HD Wallet (BIP32):**

  * Le chiavi sono derivate in **forma ad albero** (gerarchico): comodo per organizzare tanti indirizzi.

* **Fork della blockchain:**

  * Temporaneamente la catena può “ramificarsi” (due rami). Il consenso poi sceglie un ramo e l’altro si abbandona.

---

## 3) Perché l’esempio del BST è importante?

BST = **Binary Search Tree** con regola: sinistra < padre < destra.
Questa regola fa sì che **ogni confronto dimezzi lo spazio di ricerca**. Risultato:

* **Tempo di ricerca ≈ O(log n)** (pochi passi anche con tanti dati).
* **Aggiungi un livello** ⇒ raddoppi gli elementi, **ma** aggiungi solo **1** confronto in più.
* Questa è **la stessa idea** che rende potenti i Merkle tree e i trie:
  **verifiche/ricerche che crescono lentamente** mentre i dati crescono tanto.

> Nota: tutto questo vale quando l’albero è **ben bilanciato**. Se è “storto”, la ricerca può diventare lenta (O(n)). Per questo in pratica si usano strutture (o regole) che mantengono gli alberi **equilibrati** o **completi**.

---

### In sintesi

* **Albero** = modo ordinato di organizzare dati in livelli.
* **Binario** = max due figli per nodo.
* In **crypto**, gli alberi (Merkle, trie) permettono **prove e ricerche veloci e leggere**: con milioni di dati, bastano **pochi passi** per verificare.
* L’esempio del **BST** ti fa capire l’intuizione: **log n** passi invece di scorrere tutto.
