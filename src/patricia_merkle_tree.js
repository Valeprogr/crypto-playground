// TrieNode.js
class TrieNode {
    constructor(key) {
        this.key = key; // carattere (stringa) o null per la radice
        this.children = {}; // mappa: carattere -> TrieNode
        this.isWord = false; // true se questo nodo chiude una parola
    }
}

class Trie {
    constructor() {
        // Nodo radice: key = null
        this.root = new TrieNode(null);
    }


    /**
    * Inserisce una parola nella trie.
    * Complessità: O(n) con n = lunghezza della parola.
    */
    insert(word = '') {
        let node = this.root;


        for (const ch of word) {
            if (!node.children[ch]) {
                node.children[ch] = new TrieNode(ch);
            }
            node = node.children[ch];
        }


        node.isWord = true;
    }


    /**
    * Ritorna true se la parola è presente e termina su un nodo con isWord = true.
    * Complessità: O(n)
    */
    contains(word = '') {
        let node = this.root;


        for (const ch of word) {
            if (!node.children[ch]) return false;
            node = node.children[ch];
        }


        return node.isWord;
    }


    /**
    * (Opzionale, utile per debug/demo) Ritorna tutte le parole presenti.
    */
    listWords() {
        const out = [];


        const dfs = (node, prefix) => {
            if (node.isWord) out.push(prefix);
            for (const ch of Object.keys(node.children)) {
                dfs(node.children[ch], prefix + ch);
            }
        };


        dfs(this.root, '');
        return out;
    }
}


export const patriciaMerkleTreeDemo = () => {

    // 1) Crea la trie
    const trie = new Trie();


    // 2) Inserisci alcune parole
    const words = ['casa', 'caso', 'cane', 'caffè', 'auto', 'autobus'];
    for (const w of words) trie.insert(w);


    // 3) Verifiche con contains
    const tests = ['casa', 'caso', 'cas', 'cani', 'caffè', 'auto', 'aut', 'autobus'];


    for (const t of tests) {
        console.log(`${t} -> ${trie.contains(t)}`);
    }


    // 4) (Opzionale) Stampa tutte le parole memorizzate
    console.log('\nParole nella trie:', trie.listWords());
}