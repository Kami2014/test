# Struttura Cartelle e Upload su cPanel Netsons

## Struttura delle cartelle

Crea sul tuo PC una cartella chiamata `typografica` con questa struttura esatta:

```
typografica/              ← cartella principale
├── index.html            ← pagina principale del sito
├── css/
│   └── style.css         ← tutti gli stili
└── js/
    └── main.js           ← tutta la logica JS + Supabase
```

> ⚠️  I nomi di file e cartelle sono case-sensitive sul server Linux.
>     Usa esattamente le lettere minuscole come indicato.

---

## Passo 1 — Configura Supabase prima di caricare

Prima di caricare i file, apri `js/main.js` con un editor di testo
(Notepad, VS Code, ecc.) e sostituisci queste due righe:

```js
const SUPABASE_URL      = 'https://XXXXXXXXXXXX.supabase.co';
const SUPABASE_ANON_KEY = 'eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
```

Con i tuoi valori reali, che trovi in:
**Supabase → Project Settings → API**

Salva il file dopo la modifica.

---

## Passo 2 — Accedi al cPanel Netsons

1. Vai su **https://www.netsons.com/clientarea**
2. Accedi con le tue credenziali
3. Vai su **Hosting → Gestisci**
4. Clicca su **cPanel**

---

## Passo 3 — Apri il File Manager

1. Nel cPanel, cerca la sezione **"File"**
2. Clicca su **"File Manager"**
3. Nella finestra che si apre, assicurati di essere dentro la cartella:
   ```
   /public_html/
   ```
   (Se non ci sei, naviga fino ad essa dal pannello di sinistra)

---

## Passo 4 — Carica i file

### Metodo A — Upload diretto (più semplice)

1. Clicca su **"Carica"** (o "Upload") nella barra in alto
2. Carica i file uno alla volta in questo ordine:
   - Prima crea la sottocartella `css`: clicca **"Nuova cartella"** → scrivi `css` → OK
   - Poi crea la sottocartella `js`:  clicca **"Nuova cartella"** → scrivi `js`  → OK
3. Entra in `/public_html/css/` e carica `style.css`
4. Entra in `/public_html/js/`  e carica `main.js`
5. Torna in `/public_html/`     e carica `index.html`

### Metodo B — Upload con ZIP (più veloce)

1. Sul tuo PC, comprimi la cartella `typografica` in un file ZIP:
   - Windows: tasto destro → "Comprimi in file ZIP"
   - Mac: tasto destro → "Comprimi"
2. Nel File Manager di cPanel, clicca **"Carica"** e carica lo ZIP
3. Una volta caricato, selezionalo e clicca **"Estrai"** (o "Extract")
4. Nella finestra di estrazione, come percorso di destinazione scrivi:
   ```
   /public_html
   ```
5. Clicca **"Estrai i file"**
6. Dopo l'estrazione, se i file sono finiti dentro
   `/public_html/typografica/` invece di `/public_html/`:
   - Seleziona tutto il contenuto della cartella `typografica`
   - Spostalo un livello su con **"Sposta"** → `/public_html/`
   - Elimina la cartella `typografica` ormai vuota

---

## Passo 5 — Verifica la struttura finale

Dopo il caricamento, la struttura in `/public_html/` deve essere:

```
/public_html/
├── index.html      ✓
├── css/
│   └── style.css   ✓
└── js/
    └── main.js     ✓
```

---

## Passo 6 — Testa il sito

Apri il browser e vai su:
```
https://www.tuodominio.it
```

Dovresti vedere il sito caricato correttamente.

**Se vedi una pagina bianca o errori:**
- Apri gli strumenti di sviluppo del browser (F12) → scheda Console
- Verifica che non ci siano errori sul percorso di `style.css` o `main.js`
- Controlla che i nomi file e cartelle siano esattamente minuscoli

**Se il form non funziona:**
- Apri F12 → Console e cerca errori Supabase
- Verifica di aver salvato correttamente URL e ANON KEY in `main.js`

---

## Passo 7 — Attiva HTTPS (se non già attivo)

1. Nel cPanel, cerca **"SSL/TLS"** o **"Let's Encrypt SSL"**
2. Seleziona il tuo dominio → **"Installa"**
3. Attendi 5–10 minuti

---

## Riepilogo nomi file

| File | Posizione esatta sul server |
|---|---|
| Pagina principale | `/public_html/index.html` |
| Stili CSS | `/public_html/css/style.css` |
| JavaScript | `/public_html/js/main.js` |

Questi tre file sono tutto ciò che serve. Nessuna dipendenza aggiuntiva,
nessun database locale, nessun plugin da installare.
