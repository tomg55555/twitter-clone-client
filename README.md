# Twotter: The Twitter-Clone Client

Benvenuti nel repository del client **Twotter**, un'applicazione ispirata a Twitter sviluppata con **Next.js**. Questo file `README` contiene le istruzioni per avviare l'applicazione in due modi diversi: utilizzando un file ZIP o clonando una repository GitHub. Inoltre, è disponibile una demo live al link sottostante.

### Demo Live
👉 [Twotter Demo](https://twitter-clone-client-lemon.vercel.app/)

---

## Come clonare la repo?

Esegui [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) con [npm](https://docs.npmjs.com/cli/init) per bootstrappare la repo:

```bash
npx create-next-app --example https://github.com/tomg55555/twitter-clone-client twotter-client
```

Next Js 15 utilizza React 19 e molti dei pacchetti non sono ancora aggiornati quindi sicuramente la build fallirà.

****Per eseguire correttamente l'installazione di tutti i pacchetti:****

```bash
cd twotter-client
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

---


 ## Alcune considerazioni

1. **Durata delle sessioni**
Non ho avuto modo di investigare approfonditamente ma sia dal client su NextJs che su Postman ho notato che una volta effettuato il login di un utente le sessioni durano una decina di minuti al massimo.

2. **Inconsistenza in alcune risposte di alcuni endpoint**
Alcuni ednpoint riproducono risposte inconsistenti: ad esempio http://staging.iakta.net:8000/api/postDetail/[postId]
fornisce due risposte totalmente diverse se al post sono associati dei commenti o meno, in un caso restituisce un oggetto con i dettagli sul post, nell'altro un array contentente i commenti senza fornire informazioni sul post. 

3. **Formato della data** 
Ho preferito elaborare la data mostrando quanto tempo fa è stato pubblicato il post o il commento piuttosto che formattarla in base alla timezone locale.

4. **Campi testuali limitati nei post ma diversamente nelle risposte**
Ho notato che c'è una incostistenza tra l'invio di un messaggio e il testo ottenuto da http://staging.iakta.net:8000/api/posts. Nel primo caso apparentemente non c'è una limitazione al numero di caratteri (Ho avuto problemi solo fino a 20k caratteri) inviabili ma nella risposta sono limitati a 100.
Dato che non esiste un modo consistente per ottenere il messaggio non troncato (se commento quel messaggio perdo l'accesso al testo completo per il rpoblema descritto al punto 2) ho deciso di limitare anche l'invio dei messaggi a 100 caratteri.

5. **Inserimento delle immagini**
Ho implementato un sistema per linkare anche delle immagini. Purtroppo visto il limite dei 100 caratteri non è possibile linkare immagini con url lunghi. Si potrebbero utilizzare delle librerie per accorciare gli url ma credo esuli dagli scopi dello sviluppo del client e non ho approfondito. Gli url devono essere specifici di una immmagine o non funzioneranno. I video al momento non sono supportati.

6. **Mobile first** 
Per lo sviluppo del design ho adottato un approccio mobile-first ma ultimamnte senza un emulatore ho notato che su alcuni browser e devices molto piccoli (<350px) ci possono esseere alcuni errori di compatibilità. Per motivi di tempo e software (mi sono limitato a Chrome e Chrome DevTool ) per testare a disposizione non ho approfondito.
