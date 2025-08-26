# 📘 Transazioni su Blockchain — 

> Obiettivo: capire **come “si vede” una transazione** nei due modelli principali:
> **UTXO** (tipo Bitcoin) e **Account** (tipo Ethereum). Linguaggio semplice, esempi chiari.

---

## 1) Cos’è una transazione?

Una transazione è un **messaggio firmato** che sposta valore:

* da **chi invia** a **chi riceve**;
* seguendo le **regole** della blockchain (firma valida, fondi sufficienti, fee pagata).

---

## 2) Modello UTXO (Bitcoin): “monetine digitali”

Pensa a **banconote**:

* Nel tuo “portafoglio” hai tante **monetine** chiamate **UTXO** (*Unspent Transaction Output*).
* Quando paghi, **consumi** alcune monetine (**input**) e crei **nuove monetine** (**output**):

  * una al **destinatario**,
  * una a **te** come **resto** (se hai dato più del dovuto).

**Fee (commissione)**:

```
fee = somma degli input − somma degli output
```

È il “pezzetto” che **non metti** in nessun output. Va al miner.

### 🧩 Mini-diagramma

```
Input:  [UTXO A: 0.3] + [UTXO B: 0.2]  = 0.5
TX  ->  Output1: 0.4 (a Bob)
         Output2: 0.099 (resto ad Alice)
         Fee: 0.001   (0.5 - 0.499)
```

### 🧾 Esempio (forma semplificata)

```json
{
  "vin": [                       // INPUT: UTXO che stai spendendo
    { "txid": "aaa...111", "vout": 0, "witness": ["firmaAlice", "pubKeyAlice"] },
    { "txid": "bbb...222", "vout": 1, "witness": ["firmaAlice", "pubKeyAlice"] }
  ],
  "vout": [                      // OUTPUT: nuovi UTXO creati
    { "value": 0.4,   "script": "pagare Bob" },
    { "value": 0.099, "script": "resto ad Alice" }
  ]
}
```

**Saldo (in Bitcoin)** = **somma di tutti i tuoi UTXO non spesi**.
Se non hai mai **ricevuto** nulla on-chain, non hai UTXO (saldo = 0).

---

## 3) Modello Account (Ethereum): “conto a saldo”

Qui c’è un **saldo per account** (niente UTXO/resto).

**Campi tipici**:

* `from`: chi invia
* `to`: chi riceve (o smart contract)
* `value`: quanto invii
* `nonce`: contatore della tua n-esima transazione
* `gasLimit`: massimo “lavoro” che autorizzi
* `maxFeePerGas` e `maxPriorityFeePerGas` (*EIP-1559*): quanto paghi per unità di gas
* `data`: chiamate a smart contract (opzionale)

### 🧾 Esempio (semplice)

```json
{
  "from": "0xAlice",
  "to": "0xBob",
  "value": "0.4 ETH",
  "nonce": 12,
  "gasLimit": 21000,
  "maxFeePerGas": "30 gwei",
  "maxPriorityFeePerGas": "2 gwei",
  "data": "0x"
}
```

**Fee (in Ethereum)** = `gasUsed × prezzoEffettivoPerGas`.
Il tuo saldo **diminuisce** di: `value + fee`.
Il saldo di Bob **aumenta** di: `value`.

---

## 4) Confronto rapido

* **Bitcoin (UTXO)**

  * “Monetine” (UTXO) uniche → scegli quali spendere.
  * Serve **output di resto**, altrimenti regali la differenza come fee.
  * Fee = `Σ input − Σ output`.

* **Ethereum (Account)**

  * Saldo per indirizzo.
  * Niente resto; paghi il **gas** per l’operazione.
  * Fee dipende da **gas** e **prezzi del gas**.

---

## 5) Errori comuni (da evitare)

* **Dimenticare il resto (UTXO)** → fee troppo alta per sbaglio.
* **Fee troppo bassa** → la tx resta ferma nel mempool a lungo.
* **Indirizzo sbagliato** → transazione irreversibile.
* **Firmare dati diversi** (client vs server) → firma non valida.

---

## 6) Mini-formule utili (da ricordare)

* **Bitcoin (UTXO)**

  * `fee = Σ(input) − Σ(output)`
  * `resto = Σ(input) − pagamento − fee`

* **Ethereum (Account)**

  * `fee = gasUsed × effectiveGasPrice`
  * `saldoFinale = saldoIniziale − value − fee`

---

## 7) Ripasso lampo (mantra)

* **UTXO = contanti**: scegli “monete”, paghi, ricevi **resto**.
* **Account = conto**: saldo che sale/scende; paghi **gas**.
* **Fee**: in Bitcoin è la **differenza**; in Ethereum è **gas × prezzo**.
* **Firma**: sempre tu firmi la tua tx con la **chiave privata** (mai condividerla!).
