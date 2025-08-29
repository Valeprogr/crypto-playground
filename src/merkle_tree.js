// Questo file mostra una MerkleTree "didattica" con due modalità di costruzione:
// 1) con duplicazione dell'ultimo nodo (dup) -> stile Bitcoin-like
// 2) senza duplicazione (no-dup) -> l'ultimo nodo sale da solo
//
// ATTENZIONE: la Merkle Proof deve essere coerente con la modalità scelta.
// In questo file, getProof è implementata per la modalità SENZA duplicazione (no-dup).

class MerkleTree {
  constructor(leaves, concat) {
    // Controlli basilari per evitare stati incoerenti
    if (!Array.isArray(leaves) || leaves.length === 0) {
      throw new Error("leaves deve essere un array non vuoto");
    }
    if (typeof concat !== "function") {
      throw new Error("concat deve essere una funzione");
    }
    // Copie difensive: non vogliamo che modifiche esterne cambino l'albero
    this.leaves = leaves.slice();
    // concat è la funzione che combina due nodi (es. hash(left||right))
    this.concat = concat;
  }

  // --- COSTRUZIONE CON DUPLICAZIONE ---
  // Costruisce tutti i livelli "accoppiando a due a due";
  // se il livello corrente è DISPARI, l’ultimo elemento viene DUPLICATO.
  // Esempio: [A,B,C] -> next: [H(A+B), H(C+C)]
  _buildLevelsDup() {
    // levels[0] = foglie; levels[1] = primo livello di hash; ...; levels[last] = [root]
    const levels = [this.leaves.slice()];
    while (levels[levels.length - 1].length > 1) {
      console.log("Current level:", levels[levels.length - 1]);
      const cur = levels[levels.length - 1]; // livello corrente
      const next = [];                       // prossimo livello
      for (let i = 0; i < cur.length; i += 2) {
        const left = cur[i];
        const right = i + 1 < cur.length ? cur[i + 1] : left; // se mancano pari, duplica l'ultimo
        next.push(this.concat(left, right));
        console.log(`  - Combining: ${left} + ${right} = ${next[next.length - 1]}`);  
      }
      levels.push(next);
    }
    return levels;
  }

  // --- COSTRUZIONE SENZA DUPLICAZIONE ---
  // Se il livello è DISPARI, l’ultimo elemento NON viene duplicato:
  // viene semplicemente “promosso” al livello successivo così com’è.
  // Esempio: [A,B,C] -> next: [H(A+B), C]
  _buildLevelsNoDup() {
    const levels = [this.leaves.slice()];
    while (levels[levels.length - 1].length > 1) {
      const cur = levels[levels.length - 1];
      const next = [];
      for (let i = 0; i < cur.length; i += 2) {
        if (i + 1 < cur.length) {
          // coppia completa (left, right)
          next.push(this.concat(cur[i], cur[i + 1]));
        } else {
          // elemento spaiato: sale così com’è (Nessuna duplicazione!)
          next.push(cur[i]);
        }
      }
      levels.push(next);
    }
    return levels;
  }

  // Radice con duplicazione (coerente con _buildLevelsDup)
  getRoot() {
    const levels = this._buildLevelsDup();
    return levels[levels.length - 1][0];
  }

  // Radice SENZA duplicazione (coerente con _buildLevelsNoDup)
  getRootWithoutReplicate() {
    const levels = this._buildLevelsNoDup();
    return levels[levels.length - 1][0];
  }

  // ============================
  //  Merkle Proof (SENZA duplicazione)
  // ============================
  //
  // Ritorna un array di oggetti { data, left } dove:
  //  - data: è il "sibling" (il vicino da combinare a questo livello)
  //  - left: true se il sibling è a SINISTRA, false se a DESTRA
  //
  // Regola mentale (no-dup):
  //  - Se il tuo indice idx è PARI (sei "left"):
  //      - se esiste il destro (idx+1 < nodes.length) -> sibling a destra { left:false }
  //      - altrimenti (sei spaiato) -> NON aggiungere nulla per questo livello
  //  - Se il tuo indice idx è DISPARI (sei "right"):
  //      - il sinistro esiste sempre -> sibling a sinistra { left:true }
  //
  // Dopo aver eventualmente aggiunto il sibling, "sali" di livello:
  //    idx = Math.floor(idx / 2)
  //
  getProof(index) {
    if (index < 0 || index >= this.leaves.length) {
      throw new Error("index out of range");
    }
    // Costruiamo i livelli con la stessa regola NO-DUP della radice target
    const levels = this._buildLevelsNoDup();
    const proof = [];
    let idx = index;

    // Non consideriamo l'ultimo livello (quello della root), quindi "- 1"
    for (let lvl = 0; lvl < levels.length - 1; lvl++) {
      const nodes = levels[lvl];

      if (idx % 2 === 0) {
        // idx PARI -> sei il nodo SINISTRO ("left")
        const siblingIndex = idx + 1;
        if (siblingIndex < nodes.length) {
          // Se esiste un destro, il sibling è a DESTRA
          proof.push({ data: nodes[siblingIndex], left: false });
        }
        // Altrimenti sei spaiato -> non aggiungere nulla (nessun sibling a questo livello)
      } else {
        // idx DISPARI -> sei il nodo DESTRO ("right")
        // Il sinistro c'è sempre
        const siblingIndex = idx - 1;
        proof.push({ data: nodes[siblingIndex], left: true });
      }

      // Sali di livello: il nuovo indice è la "coppia" a cui appartieni
      idx = Math.floor(idx / 2);
    }
    return proof;
  }
}


// ============================
//  Demo e verifica didattica
// ============================

export const demoMerkleTree = () => {
  // Foglie di esempio: 5 elementi per vedere il caso "dispari"
  const leaves = ['a', 'b', 'c', 'd', 'e'];

  // Funzione concat di esempio (solo per capire l'ordine). In produzione useresti una hash (es. sha256).
  const concat = (a, b) => a + b;

  const tree = new MerkleTree(leaves, concat);

  console.log("Leaves:", leaves);
  console.log("Root with duplication (dup):        ", tree.getRoot());
  console.log("Root without duplication (no-dup):  ", tree.getRootWithoutReplicate());

  // Funzione di verifica: ricostruisce l'hash partendo dalla foglia + proof
  // rispettando il flag 'left' (indica DOVE sta il SIBLING!)
  const verifyProof = (leaf, proof, concat, expectedRoot) => {
    let h = leaf;
    for (const { data, left } of proof) {
      // Se il sibling è a sinistra (left === true) -> concat(sibling, h)
      // Se il sibling è a destra  (left === false) -> concat(h, sibling)
      h = left ? concat(data, h) : concat(h, data);
    }
    return h === expectedRoot;
  };

  // Mostra la proof per ogni foglia e verifica contro la root NO-DUP
  leaves.forEach((leaf, index) => {
    const proof = tree.getProof(index); // <- NO-DUP
    const ok = verifyProof(leaf, proof, concat, tree.getRootWithoutReplicate());
    console.log(`\nProof for leaf '${leaf}' (index ${index}):`, proof);
    console.log(`Verifica contro ROOT no-dup: ${ok ? "OK ✅" : "NO ❌"}`);
  });

  // Se un giorno implementerai anche getProof "con duplicazione",
  // dovrai verificare contro tree.getRoot() (la root dup), NON contro la no-dup.
};
