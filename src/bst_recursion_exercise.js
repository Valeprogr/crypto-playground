// ===============================================
// BST Insert (Ricorsivo) - Mini Esercizio/Demo
// Obiettivo: inserire nodi in un BST usando ricorsione
// Regola BST: sinistra < padre < destra
// Esegui: node bst_recursion_exercise.js
// ===============================================

import assert from 'node:assert/strict';

// --- Node -------------------------------------------------
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// --- Tree (con inserimento ricorsivo) ---------------------
class Tree {
    constructor() {
        this.root = null;
    }

    // API pubblica: inserisce un Node nel BST
    addNode(node) {
        if (!this.root) {
            this.root = node; // primo inserimento → root
            return;
        }
        this._insertUnder(this.root, node); // altrimenti vai di ricorsione
    }

    // Inserisce `child` sotto `parent` ricorsivamente.
    // Se child.data < parent.data → sinistra, altrimenti → destra
    _insertUnder(parent, child) {
        if (child.data < parent.data) {
            if (parent.left) {
                // se esiste un sinistro, scendi lì
                this._insertUnder(parent.left, child);
            } else {
                // posto libero → inserisci
                parent.left = child;
            }
        } else {
            if (parent.right) {
                // se esiste un destro, scendi lì
                this._insertUnder(parent.right, child);
            } else {
                // posto libero → inserisci
                parent.right = child;
            }
        }
    }

    addNode(node) {
        if (this.root === null) {
            this.root = node;
            return;
        }

        this._insertUnder(this.root, node);
    }

    _insertUnder(parent, child) {
        if (child.data < parent.data) {
            if (parent.left) {
                this._insertUnder(parent.left, child);
            } else {
                parent.left = child;
            }
        } else {
            if (parent.right) {
                this._insertUnder(parent.right, child);
            } else {
                parent.right = child;
            }
        }
    }

    hasNode(num, node = this.root) {

        if (!node) return false;
        if (node.data === num) return true;

        if (num < node.data) {
            return this.hasNode(num, node.left);   // vai a sinistra
        } else {
            return this.hasNode(num, node.right);  // vai a destra
        }

        return false;

    }



}



// ===============================================
// Demo + mini-test (uguale allo schema nei tuoi test)
// ===============================================
export const demo_bts_recursion_exercise = () => {
    console.log("=== BST Recursive Insert Demo ===");

    const tree = new Tree();
    assert.equal(tree.root, null, "all'inizio la root deve essere null");

    // Inserimenti
    tree.addNode(new Node(5)); // root
    assert.ok(tree.root, "dopo il primo inserimento la root esiste");
    assert.equal(tree.root.data, 5);

    tree.addNode(new Node(3)); // va a sinistra di 5
    assert.ok(tree.root.left, "manca il left della root");
    assert.equal(tree.root.left.data, 3);

    tree.addNode(new Node(2)); // va a sinistra di 3
    assert.ok(tree.root.left.left, "manca il left del left");
    assert.equal(tree.root.left.left.data, 2);

    tree.addNode(new Node(4)); // va a destra di 3
    assert.ok(tree.root.left.right, "manca il right del left");
    assert.equal(tree.root.left.right.data, 4);

    tree.addNode(new Node(7)); // va a destra di 5
    assert.ok(tree.root.right, "manca il right della root");
    assert.equal(tree.root.right.data, 7);

    tree.addNode(new Node(6)); // va a sinistra di 7
    assert.ok(tree.root.right.left, "manca il left del right");
    assert.equal(tree.root.right.left.data, 6);

    tree.addNode(new Node(8)); // va a destra di 7
    assert.ok(tree.root.right.right, "manca il right del right");
    assert.equal(tree.root.right.right.data, 8);

    // Stampa di controllo
    console.log("root:", tree.root.data);                 // 5
    console.log("root.left:", tree.root.left.data);       // 3
    console.log("root.right:", tree.root.right.data);     // 7
    console.log("root.left.left:", tree.root.left.left.data);   // 2
    console.log("root.left.right:", tree.root.left.right.data); // 4
    console.log("root.right.left:", tree.root.right.left.data); // 6
    console.log("root.right.right:", tree.root.right.right.data); // 8

    console.log("tree:", tree.root)

    // Mini-test della ricerca
    console.log("cerca 5:", tree.hasNode(5));               // true
    console.log("cerca 3:", tree.hasNode(100));             // false
    console.log("cerca 8:", tree.hasNode(8));               // true
    console.log("cerca 10:", tree.hasNode(10));             // false
    console.log("cerca 1:", tree.hasNode(1));               // false    
    console.log("=== FINE ===");
    console.log("✅ Tutti i mini-test sono passati!");
}

// ===============================================
// NOTE per ripetere l’esercizio:
// 1) Commenta il corpo di _insertUnder e prova a riscriverlo.
// 2) Regola mentale: se < vai a sinistra, se > o = vai a destra.
// 3) Caso base della ricorsione: se manca il figlio (null) → inserisci lì.
// 4) Se il figlio c’è → richiama ricorsivamente scendendo.
// ===============================================
