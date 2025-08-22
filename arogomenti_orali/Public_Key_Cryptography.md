# 🔑 Crittografia a Chiave Pubblica (Public Key Cryptography)


## 📌 Cos’è

Un sistema che usa **due chiavi diverse**:

1. **Chiave pubblica** → la puoi dare a chiunque.  
2. **Chiave privata** → resta segreta, solo tu la conosci.  

✏️ Sono collegate matematicamente, ma dalla chiave pubblica **non si può risalire** a quella privata.


## 📬 Analogia: la cassetta della posta

- **Buca delle lettere** = chiave pubblica → chiunque può inserire un messaggio.  
- **Chiave della serratura** = chiave privata → solo tu puoi aprirla e leggere.  

👉 Risultato: chiunque può inviarti messaggi segreti, ma **solo tu** puoi aprirli.



## 🔐 Due usi fondamentali

1. **Crittografia (Segretezza)**  
   🔒 Un messaggio cifrato con la tua chiave pubblica → solo la tua chiave privata può decifrarlo.  

2. **Firma Digitale (Autenticità)**  
   ✍️ Firmo con la mia chiave privata → chiunque, con la mia chiave pubblica, può verificare che il messaggio è autentico e non è stato alterato.



## 🎯 In pratica

- **Chiave pubblica** = come un **IBAN**: puoi condividerla con tutti.  
- **Chiave privata** = come il **PIN della banca**: resta segreta.  

---

# 🔗 Perché è fondamentale nella Blockchain



## 1️⃣ Identità decentralizzata
- Niente username/password.  
- Ogni utente ha una coppia di chiavi:  
  - 🔑 Privata = identità segreta (per firmare).  
  - 🌍 Pubblica = indirizzo visibile (come IBAN).  

👉 Pubblica = per ricevere fondi.  
👉 Privata = per spenderli.



## 2️⃣ Transazioni sicure
- Firmi una transazione con la chiave **privata**.  
- La rete verifica la firma con la chiave **pubblica**.  

Garantisce:  
- ✅ **Autenticità** → solo tu potevi firmare.  
- ✅ **Integrità** → nessuno ha modificato i dati.  



## 3️⃣ Trasparenza e fiducia matematica
- Tutti vedono gli indirizzi pubblici.  
- Nessuno può risalire alle chiavi private.  
- Non servono banche o autorità centrali: la rete verifica tutto da sola.  



## 4️⃣ Altri usi in Blockchain
- 👜 **Wallet** → custodiscono e usano la chiave privata.  
- 🤖 **Smart contract** → autorizzano azioni tramite firme.  
- 🖼️ **Token/NFT** → la proprietà è legata alla chiave pubblica del titolare.  



## 🚀 Sintesi da ricordare
La crittografia a chiave pubblica serve a:  

1. Creare **identità decentralizzate** senza registrazioni.  
2. **Firmare transazioni** per provare proprietà e autorizzazioni.  
3. Garantire **fiducia e sicurezza** senza intermediari.  

---

# 🔑 RSA vs ECDSA


## 🔹 RSA
- Uno degli algoritmi più antichi e famosi.  
- Basato su **numeri primi molto grandi**.  
- Usabile per **cifratura** e **firme**.  
- Sicuro ma **più lento e pesante**.  

👉 RSA = un **lucchetto enorme e resistente**: funziona, ma è ingombrante.  



## 🔹 ECDSA (Elliptic Curve Digital Signature Algorithm)
- Algoritmo più moderno, basato su **curve ellittiche**.  
- Usato soprattutto per **firme digitali** (non per cifrare).  
- Stessa sicurezza di RSA con chiavi molto più piccole.  
  - Esempio: **RSA 3072 bit ≈ ECDSA 256 bit**.  
- Più veloce ed efficiente → ideale per **blockchain**.  

👉 ECDSA = un **lucchetto moderno e compatto**: piccolo ma molto sicuro.  



## 📊 Tabella comparativa

| Algoritmo | Uso principale      | Lunghezza chiavi | Velocità | Usato in… |
|-----------|--------------------|------------------|----------|-----------|
| **RSA**   | Cifratura + Firme  | Molto grande     | Più lento| HTTPS, email, firme digitali tradizionali |
| **ECDSA** | Firme digitali     | Più piccola      | Più veloce| Blockchain (Bitcoin, Ethereum), TLS moderno |

---

## 🎯 In sintesi
- 🔐 **RSA** = tradizionale, robusto, chiavi grandi, più lento.  
- ⚡ **ECDSA** = moderno, efficiente, chiavi corte, ideale per sistemi distribuiti.  



