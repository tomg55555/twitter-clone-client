# Twotter: The Twitter-Clone Client

Benvenuti nel repository del client **Twotter**, un'applicazione ispirata a Twitter sviluppata con **Next.js**. Questo file `README` contiene le istruzioni per avviare l'applicazione in due modi diversi: utilizzando un file ZIP o clonando una repository GitHub. Inoltre, è disponibile una demo live al link sottostante.

### Demo Live
👉 [Twotter Demo](https://twitter-clone-client-lemon.vercel.app/)

---

## Come clonare la repo?

Esegui [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) con [npm](https://docs.npmjs.com/cli/init)per bootstrappare la repo:

```bash
npx create-next-app --example https://github.com/tomg55555/twitter-clone-client twotter-client
```

Next Js 15 utilizza React 19 e molti dei pacchetti non sono ancora aggiornati quindi sicuramente la build fallirà.

****Per eseguire correttamente l'installazione di tutti i pacchetti:****

```bash
cd twotter client
```
e una volta dentro la cartella
```bash
npm install --legacy-peer-deps
```
A questo punto tutti i pacchetti saranno installati correttamente.
Per eseguire il client in locale è sufficiente il comando:

```bash
npm run dev
```
L'accesso avviene su [http://localhost:3000](http://localhost:3000)

---

## Avvio da File ZIP

1. **Scarica il file ZIP**  
   Scarica il pacchetto ZIP dell'applicazione dal link fornito o direttamente dal [repository](https://github.com/tomg55555/twitter-clone-client).

2. **Estrai il file ZIP**  
   Estrai il contenuto del file ZIP in una directory di tua scelta.

3. **Installa le dipendenze**  
   Apri un terminale nella directory del progetto estratto ed esegui:
```bash
npm install --legacy-peer-deps
```
A questo punto tutti i pacchetti saranno installati correttamente.
Per eseguire il client in locale è sufficiente il comando:

```bash
npm run dev
```
L'accesso avviene su [http://localhost:3000](http://localhost:3000)