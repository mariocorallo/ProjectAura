import { Exercise } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: 'macro-osservazione',
    title: 'Macro Osservazione',
    description: 'Dettaglio Invisibile. Allenare lo sguardo a cogliere la complessità nascosta nelle cose semplici.',
    objective: 'Allenare lo sguardo a cogliere la complessità nascosta nelle cose semplici.',
    category: 'everyday',
    icon: 'Camera',
    instructions: [
      'Mettiti fermo, in un luogo tranquillo.',
      'Apri la fotocamera del telefono e attiva la modalità macro.',
      'Avvicinati a un oggetto semplice (cibo, pelle, tessuto, carta).',
      'Scatta una foto molto ravvicinata, cercando il massimo dettaglio.',
      'Osserva l’immagine per alcuni minuti, senza fretta.',
      'Nota texture, forme, imperfezioni, strutture che a occhio nudo non vedevi.',
      'Se la mente interpreta o giudica, riportala al puro guardare.',
      'Chiudi riconoscendo quanta complessità esiste in ciò che sembrava banale.'
    ]
  },
  {
    id: 'digiuno-acquisto',
    title: 'Digiuno Sensoriale dell\'Acquisto',
    description: 'Entrare in un negozio o sito web osservando il marketing senza comprare nulla.',
    objective: 'Decostruzione dell\'impulso al consumo e osservazione del desiderio.',
    category: 'consapevolezza',
    icon: 'ShoppingBag',
    instructions: [
      'Scegli un luogo fisico o un sito e-commerce.',
      'Osserva i colori, i caratteri, le promesse di felicità.',
      'Senti l\'impulso di possedere l\'oggetto.',
      'Non acquistare nulla. Esci o chiudi la scheda.',
      'Rifletti: cosa stavi cercando di colmare?'
    ]
  },
  {
    id: 'alimentazione-single',
    title: 'Alimentazione Single-Tasking',
    description: 'Consumare un pasto in silenzio totale, senza schermi, osservando il cibo.',
    objective: 'Interruzione dell\'alimentazione automatica e ripristino del legame col nutrimento.',
    category: 'a pranzo',
    icon: 'Utensils',
    timerSeconds: 300, // 5 minutes
    instructions: [
      'Spegni ogni dispositivo e mettilo lontano.',
      'Osserva il cibo nel piatto per 5 minuti prima di iniziare.',
      'Mastica lentamente, sentendo ogni consistenza e sapore.',
      'Se la mente vaga, riportala al gesto del mangiare.',
      'Termina ringraziando per il nutrimento ricevuto.'
    ]
  },
  {
    id: 'produzione-creativa',
    title: 'Produzione Micro-Creativa',
    description: 'Dedicare tempo alla creazione di una Scatola della Memoria con soggetti Cut Out.',
    objective: 'Sostituzione dell\'acquisto di oggetti seriali con la creazione di manufatti unici.',
    category: 'creatività',
    icon: 'Box',
    instructions: [
      'Trova una piccola scatola di recupero.',
      'Raccogli piccoli oggetti significativi o ritagli (Cut Out).',
      'Componi uno scenario all\'interno della scatola.',
      'Dedica almeno 30 minuti a questa creazione fisica.',
      'Osserva il valore dell\'unicità rispetto all\'oggetto di serie.'
    ]
  },
  {
    id: 'mappatura-automatismi',
    title: 'Mappatura degli Automatismi',
    description: 'Annotare ogni impulso compulsivo verso smartphone o acquisti per noia.',
    objective: 'Rendere consci i trigger della compulsione moderna tramite l\'autoconsapevolezza.',
    category: 'everyday',
    icon: 'SmartphoneNfc',
    instructions: [
      'Porta con te un taccuino (digitale o cartaceo).',
      'Ogni volta che senti il bisogno di sbloccare il telefono senza motivo, fermati.',
      'Annota l\'ora e l\'emozione che provavi (noia, ansia, solitudine).',
      'Conta quante volte accade in una giornata.',
      'Rifletti sui pattern che emergono.'
    ]
  },
  {
    id: 'disegno-effimero',
    title: 'Disegno Effimero all\'Aperto',
    description: 'Creare figure o pattern geometrici utilizzando solo elementi naturali.',
    objective: 'Distacco dal possesso dell\'opera e accettazione dell\'impermanenza.',
    category: 'creatività',
    icon: 'Leaf',
    instructions: [
      'Esci all\'aperto (parco, bosco, spiaggia).',
      'Raccogli sassi, foglie, rami o terra.',
      'Crea una composizione senza usare colla o supporti permanenti.',
      'Lascia l\'opera dove l\'hai creata.',
      'Allontanati senza voltarti indietro.'
    ]
  },
  {
    id: 'tratto-continuo',
    title: 'Meditazione sul Tratto Continuo',
    description: 'Disegnare senza mai staccare la penna per 15 minuti.',
    objective: 'Abbandono del perfezionismo produttivo a favore del puro flusso motorio.',
    category: 'consapevolezza',
    icon: 'PenTool',
    timerSeconds: 900, // 15 minutes
    instructions: [
      'Prendi un foglio bianco e una penna.',
      'Appoggia la punta sul foglio e avvia il timer.',
      'Muovi la mano costantemente, senza sollevare la punta.',
      'Ignora il risultato estetico; concentrati sulla sensazione fisica.',
      'Se ti fermi, ricomincia immediatamente.'
    ]
  },
  {
    id: 'scomposizione-visiva',
    title: 'Scomposizione Visiva di Oggetti',
    description: 'Disegnare solo le ombre o i vuoti di un oggetto quotidiano.',
    objective: 'De-automatizzazione della percezione standardizzata degli oggetti.',
    category: 'osservazione',
    icon: 'Ghost',
    instructions: [
      'Scegli un oggetto comune (una sedia, una pianta).',
      'Non guardare le linee di contorno dell\'oggetto.',
      'Disegna solo gli spazi negativi (i "buchi" tra le parti).',
      'Oppure disegna esclusivamente le macchie d\'ombra.',
      'Nota come l\'oggetto "sente" la luce invece di "essere" una forma.'
    ]
  },
  {
    id: 'cancellazione-creativa',
    title: 'Cancellazione Creativa (Blackout)',
    description: 'Annerire parole di un catalogo commerciale per creare una frase astratta.',
    objective: 'Sovvertimento del messaggio pubblicitario in frammento poetico.',
    category: 'creatività',
    icon: 'Eraser',
    instructions: [
      'Recupera un catalogo pubblicitario o un volantino.',
      'Scansiona la pagina cercando parole che ti colpiscono.',
      'Con un pennarello nero, annerisci tutto tranne quelle parole.',
      'Crea un nuovo significato che neghi lo scopo originale.',
      'Leggi il risultato come una profezia privata.'
    ]
  },
  {
    id: 'ricalco-analogico',
    title: 'Ricalco Analogico',
    description: 'Appoggia un foglio di carta velina sullo schermo e ricalca un\'immagine complessa.',
    objective: 'Trasformare la luce digitale in segno fisico e materico.',
    category: 'creatività',
    icon: 'Layers',
    instructions: [
      'Trova un tablet o monitor che visualizzi un\'immagine complessa.',
      'Fissa un foglio di carta velina o semitrasparente sullo schermo.',
      'Usa una matita per ricalcare i contorni e i dettagli con tocco leggero.',
      'Senti la texture della carta contro la luce dello schermo.',
      'Osserva come la perfezione digitale diventa un segno umano e imperfetto.'
    ]
  },
  {
    id: 'pixel-art-materica',
    title: 'Pixel Art Materica',
    description: 'Disegna una griglia su carta e colorala per creare un\'icona, come un computer umano.',
    objective: 'Comprendere la struttura dell\'immagine digitale attraverso la pazienza manuale.',
    category: 'creatività',
    icon: 'Grid3X3',
    instructions: [
      'Disegna una griglia millimetrata o a piccoli quadretti su un foglio.',
      'Scegli un\'icona digitale semplice o uno sprite di un vecchio gioco.',
      'Colora i quadratini uno a uno con precisione estrema usando pennarelli.',
      'Rallenta il ritmo: sii tu il processore grafico che "renderizza" l\'immagine.',
      'Osserva la fatica fisica necessaria per costruire ciò che lo schermo crea in millisecondi.'
    ]
  },
  {
    id: 'glitch-art-mano',
    title: 'Glitch Art a Mano',
    description: 'Prendi una foto stampata e distorcela tagliandola o incollandola sfalsata.',
    objective: 'Riprodurre l\'errore digitale con tecniche di collage e distruzione fisica.',
    category: 'creatività',
    icon: 'Scissors',
    instructions: [
      'Prendi una foto stampata da un giornale o una tua vecchia fotografia.',
      'Intervieni fisicamente: tagliala a strisce verticali o orizzontali.',
      'Ricomponi l\'immagine incollando i pezzi su un altro foglio in modo sfalsato.',
      'Usa carta vetro o punte metalliche per graffiare la superficie e "disturbare" il segnale.',
      'Trasforma l\'illusione della perfezione fotografica in una materia sofferta.'
    ]
  },
  {
    id: 'interfaccia-immaginaria',
    title: 'Interfaccia Immaginaria',
    description: 'Disegna su un quaderno l\'interfaccia di un\'app che non esiste usando solo forme geometriche.',
    objective: 'Progettare l\'astratto usando strumenti concreti e colorati.',
    category: 'creatività',
    icon: 'Layout',
    instructions: [
      'Pensa a un sogno o a una funzione impossibile (es. un\'app per catalogare il profumo del vento).',
      'Prendi un quaderno e disegna la "schermata principale".',
      'Usa solo colori a spirito vivaci e forme geometriche pure.',
      'Non preoccuparti della logica, ma della bellezza del layout fisico.',
      'Inventa icone che non abbiano un significato immediato.'
    ]
  },
  {
    id: 'cattura-colori',
    title: 'Cattura-Colori dal Vivo',
    description: 'Guarda un video e riproduci su carta la sua tavolozza usando acquerelli o pastelli.',
    objective: 'Estrarre l\'estetica cromatica dal flusso digitale per fissarla su carta.',
    category: 'osservazione',
    icon: 'Palette',
    instructions: [
      'Apri un video estetico o un sito web molto colorato.',
      'Identifica i 5 colori dominanti che appaiono sullo schermo.',
      'Usa acquerelli o pastelli per mescolare e trovare la tonalità esatta su carta.',
      'Disegna dei rettangoli di colore (campioni) uno accanto all\'altro.',
      'Nota come il colore "si calma" quando smette di essere retroilluminato.'
    ]
  },
  {
    id: 'icona-gigante',
    title: 'L\'Icona Gigante',
    description: 'Scegli l\'icona dell\'app che usi di più e disegnala in formato A4 in ogni dettaglio.',
    objective: 'Deificare e ridicolizzare il simbolo della tua dipendenza tramite l\'arte.',
    category: 'creatività',
    icon: 'AppWindow',
    instructions: [
      'Identifica l\'app che ti ruba più tempo (Social, Mail, Giochi).',
      'Prendi un foglio A4 e ingrandisci l\'icona fino a occupare tutto lo spazio.',
      'Cura ogni sfumatura, ombra interna e raggio di curvatura a mano.',
      'Mentre disegni, rifletti sul potere che questo piccolo quadrato esercita su di te.',
      'Appendi il disegno: ora il "totem" è nudo e vulnerabile.'
    ]
  },
  {
    id: 'storyboard-feed',
    title: 'Storyboard del Feed',
    description: 'Disegna 6 vignette che rappresentano gli ultimi 6 post visti, creando una storia.',
    objective: 'Trasformare il caos del feed in una narrazione strutturata e illustrata.',
    category: 'consapevolezza',
    icon: 'ImagePlus',
    instructions: [
      'Scorri il tuo feed per 30 secondi e chiudilo.',
      'Cerca di ricordare gli ultimi 6 contenuti che hai incrociato.',
      'Dividi un foglio in 6 vignette e disegna uno schizzo veloce di ogni post.',
      'Prova a collegare i 6 disegni con una breve frase che li renda una storia unica.',
      'Osserva l\'assurdità del mix di contenuti a cui ti esponi ogni giorno.'
    ]
  },
  {
    id: 'qr-code-astratto',
    title: 'QR Code Astratto',
    description: 'Disegna un quadrato pieno di segni neri casuali che sembrino un QR code inutile.',
    objective: 'Creare un falso segnale che invita alla contemplazione invece che alla scansione.',
    category: 'creatività',
    icon: 'QrCode',
    instructions: [
      'Disegna un quadrato perfetto su un foglio bianco.',
      'Riempi lo spazio con piccoli quadrati e linee nere posizionati casualmente.',
      'Cerca di imitare l\'estetica di un QR code, ma senza seguire una logica.',
      'Nota la tentazione di cercare un significato o un link.',
      'Lascia che l\'occhio vaghi nel labirinto di segni senza scopo.'
    ]
  },
  {
    id: 'ritratto-pixel',
    title: 'Ritratto da Pixel',
    description: 'Guarda una foto molto sgranata e prova a indovinare i lineamenti con un ritratto dettagliato.',
    objective: 'Usare il limite digitale come spunto per l\'immaginazione figurativa.',
    category: 'osservazione',
    icon: 'User',
    instructions: [
      'Trova una foto a bassissima risoluzione o applica un forte effetto pixel/sfocato.',
      'Osserva le macchie di colore e prova a intuire la struttura del volto.',
      'Disegna su carta un ritratto realistico basandoti su ciò che l\'immaginazione "vede".',
      'Non cercare di copiare il pixel, ma di interpretare l\'anima dietro il rumore.',
      'Confronta poi con l\'originale nitido, se possibile.'
    ]
  },
  {
    id: 'mappa-link',
    title: 'Mappa dei Link',
    description: 'Disegna una ragnatela che colleghi i siti che visiti, decorando ogni nodo.',
    objective: 'Visualizzare la propria geografia digitale come un\'opera d\'arte cartografica.',
    category: 'consapevolezza',
    icon: 'Network',
    instructions: [
      'Mettiti al centro di un grande foglio (scrivi il tuo nome).',
      'Traccia linee verso i siti e le app che visiti quotidianamente.',
      'Aggiungi "nodi" per i sottolink o i percorsi mentali che fai tra un sito e l\'altro.',
      'Decora ogni sito con un simbolo, un colore o un\'emozione associata.',
      'Osserva la complessità e l\'estensione dei fili che ti legano alla rete.'
    ]
  },
  {
    id: 'emoji-giganti',
    title: 'Emoji Giganti a Pennello',
    description: 'Scegli l\'emoji che rappresenta il tuo stato d\'animo e dipingila in formato grande.',
    objective: 'Dare corpo e dimensione fisica a un micro-linguaggio digitale.',
    category: 'creatività',
    icon: 'Smile',
    instructions: [
      'Identifica l\'emoji che hai usato di più ultimamente.',
      'Usa un grande foglio (almeno A3) o un cartoncino.',
      'Dipingi l\'emoji usando colori a tempera o acrilici, cercando di rendere il giallo "vivo".',
      'Osserva come un simbolo da 20 pixel diventa una presenza fisica ingombrante.',
      'Senti l\'emozione che il simbolo vuole trasmettere mentre lo ricrei col corpo.'
    ]
  },
  {
    id: 'doodle-notifiche',
    title: 'Doodle delle Notifiche',
    description: 'Ogni volta che senti un suono di notifica, fai un piccolo scarabocchio colorato.',
    objective: 'Trasformare l\'interruzione acustica in un pattern visivo collettivo.',
    category: 'everyday',
    icon: 'BellRing',
    instructions: [
      'Tieni un foglio e dei colori pronti sulla scrivania.',
      'Vivi la tua giornata normalmente.',
      'Ogni volta che senti un "ping", un "din" o una vibrazione, ferma tutto.',
      'Fai un piccolo scarabocchio veloce: un cerchio, una linea, una macchia.',
      'A fine giornata, guarda come il rumore digitale ha disegnato la tua calma.'
    ]
  },
  {
    id: 'architettura-cartone',
    title: 'Architettura di Cartone',
    description: 'Costruisci con scatole di recupero la forma del tuo smartphone e colorala.',
    objective: 'Trasformare l\'oggetto tecnologico in un totem artistico tridimensionale.',
    category: 'creatività',
    icon: 'Package',
    instructions: [
      'Trova cartoni di recupero (scatole di pasta, spedizioni).',
      'Costruisci un modello in scala 2:1 o 3:1 del tuo smartphone o laptop.',
      'Usa scotch e forbici per dare volume.',
      'Colora la superficie con pattern psichedelici o naturali, negando lo schermo nero.',
      'Rendi l\'oggetto un pezzo d\'arte invece che uno strumento di servizio.'
    ]
  },
  {
    id: 'font-inventato',
    title: 'Il Font Inventato',
    description: 'Disegna un intero alfabeto a mano ispirandoti ai caratteri digitali ma rendendoli organici.',
    objective: 'Sfidare la perfezione dei font di sistema con l\'imperfezione del tratto.',
    category: 'creatività',
    icon: 'Type',
    instructions: [
      'Osserva il font che stai leggendo ora (es. l\'Inter o il Georgia).',
      'Prova a riscrivere l\'intero alfabeto su un foglio.',
      'Aggiungi "rami", "foglie" o "difetti" a ogni lettera.',
      'Rendi ogni carattere unico, rompendo la ripetibilità meccanica.',
      'Scrivi il tuo nome con questo nuovo font "vivo".'
    ]
  },
  {
    id: 'zentangle-schermo',
    title: 'Zentangle dello Schermo',
    description: 'Disegna un rettangolo e riempilo di pattern ripetitivi finché non c\'è più spazio bianco.',
    objective: 'Sostituire il riempimento di contenuti digitali con quello di segni grafici.',
    category: 'consapevolezza',
    icon: 'Pencil',
    instructions: [
      'Traccia un rettangolo proporzionato al tuo smartphone sul foglio.',
      'Dividi l\'interno in sezioni irregolari.',
      'Riempi ogni sezione con un pattern diverso (zentangle): puntini, onde, spirali.',
      'Continua finché l\'intero "schermo" non è denso di segni manuali.',
      'Nota la calma che deriva dal creare ordine invece di consumare caos.'
    ]
  },
  {
    id: 'collage-tastiere',
    title: 'Collage di Tastiere',
    description: 'Disegna una tastiera dove ogni tasto è un piccolo disegno che rappresenta un\'emozione.',
    objective: 'Riassegnare un significato creativo a uno strumento di input standardizzato.',
    category: 'creatività',
    icon: 'Keyboard',
    instructions: [
      'Disegna la sagoma di una tastiera standard (o usa una stampa).',
      'Dentro lo spazio di ogni singolo tasto, disegna un micro-simbolo emozionale.',
      'Non scrivere lettere, ma usa metafore visive (es. un cuore per la "H", una nuvola per la "C").',
      'Immagina di scrivere un messaggio "pittorico".',
      'Osserva come la meccanicità della tastiera svanisce sotto l\'arte.'
    ]
  },
  {
    id: 'ombre-dispositivo',
    title: 'Ombre del Dispositivo',
    description: 'Appoggia il telefono su un foglio e disegna l\'ombra che proietta, espandendola.',
    objective: 'Usare l\'oggetto fisico tecnologico come dima per il disegno astratto.',
    category: 'osservazione',
    icon: 'Sun',
    instructions: [
      'Metti il tuo smartphone spento su un foglio bianco sotto una luce direzionale intensa.',
      'Traccia il contorno dell\'ombra dell\'oggetto.',
      'Sposta leggermente il telefono o la luce e traccia di nuovo.',
      'Espandi queste forme in un disegno astratto, usando l\'oggetto solo come punto di partenza.',
      'Dimentica che è un telefono; guardalo come un solido geometrico che cattura la luce.'
    ]
  },
  {
    id: 'filtro-realta',
    title: 'Filtro Realtà',
    description: 'Costruisci una cornice di cartone e usala per guardare il mondo come se fosse un post.',
    objective: 'Inquadrare la realtà fisica con i criteri estetici del digitale, ma senza schermo.',
    category: 'osservazione',
    icon: 'Frame',
    instructions: [
      'Ritaglia una cornice quadrata o rettangolare da un pezzo di cartone.',
      'Decorala come se fosse l\'interfaccia di un Social Network (mi piace, commenti finti).',
      'Esci di casa e guarda attraverso la cornice.',
      'Trova "inquadrature" interessanti nella natura o nell\'architettura.',
      'Nota come l\'atto di inquadrare cambi la tua percezione del valore estetico del reale.'
    ]
  },
  {
    id: 'data-viz-mano',
    title: 'Data Visualization a Mano',
    description: 'Rappresenta il tempo passato sulle app con un grafico a torta usando petali o ritagli.',
    objective: 'Rendere tangibile e "bella" la statistica fredda del tempo di utilizzo.',
    category: 'osservazione',
    icon: 'PieChart',
    instructions: [
      'Controlla il tempo di utilizzo delle tue app nelle impostazioni.',
      'Disegna un grande cerchio su un foglio.',
      'Invece di usare matite, usa materiali naturali (petali di colore diverso) o ritagli di carta colorata.',
      'Assegna una proporzione fisica al tempo sprecato.',
      'Osserva l\'estensione del "vuoto" digitale trasformata in materia organica.'
    ]
  },
  {
    id: 'manuale-umano',
    title: 'Il Manuale dell\'Umano',
    description: 'Disegna una pagina di istruzioni (stile IKEA) su come fare un\'azione senza tecnologia.',
    objective: 'Ironizzare sulla necessità di istruzioni per tornare a essere analogici.',
    category: 'consapevolezza',
    icon: 'BookOpen',
    instructions: [
      'Scegli un\'azione semplice: "Bere un bicchiere d\'acqua", "Vedere un tramonto", "Abbracciare qualcuno".',
      'Disegna una sequenza di istruzioni muta (stile grafico minimalista).',
      'Enfatizza l\'assenza di dispositivi: niente foto, niente condivisione, solo l\'atto.',
      'Cura il font e l\'impaginazione come se fosse un prodotto industriale.',
      'Ridi della semplicità dimenticata.'
    ]
  },
  {
    id: 'masticazione-consapevole',
    title: 'Masticazione dei 30 Colpi',
    description: 'Masticare ogni singolo boccone esattamente 30 volte prima di deglutire.',
    objective: 'Rallentamento forzato e osservazione della trasformazione della materia.',
    category: 'everyday',
    icon: 'Waves',
    instructions: [
      'Prendi un boccone di dimensioni normali.',
      'Inizia a contare mentalmente ogni movimento della mandibola.',
      'Arriva a 30 masticazioni, notando come il sapore e la consistenza cambiano.',
      'Deglutisci solo dopo il trentesimo colpo.',
      'Ripeti per almeno 10 bocconi della durata del pasto.'
    ]
  },
  {
    id: 'rituale-posate',
    title: 'Il Rituale delle Posate',
    description: 'Appoggiare le posate sul tavolo dopo ogni singolo boccone.',
    objective: 'Interruzione del ritmo compulsivo e separazione degli atti di consumo.',
    category: 'a pranzo',
    icon: 'ArrowDownToLine',
    instructions: [
      'Prendi un boccone e portalo alla bocca.',
      'Appoggia immediatamente le posate sul tavolo o sul bordo del piatto.',
      'Mastica e deglutisci completamente a mani vuote.',
      'Solo dopo aver terminato il boccone, riprendi le posate per il successivo.',
      'Sperimenta la pausa forzata tra il desiderio e l\'azione.'
    ]
  },
  {
    id: 'assaggio-buio',
    title: 'Assaggio nel Buio',
    description: 'Consumare i primi minuti del pasto con gli occhi completamente chiusi.',
    objective: 'Isolamento sensoriale per riscoprire il gusto puro privo di stimoli visivi.',
    category: 'a pranzo',
    icon: 'EyeOff',
    timerSeconds: 180, // 3 minutes
    instructions: [
      'Siediti davanti al tuo pasto pronto.',
      'Avvia il timer e chiudi gli occhi.',
      'Esplora il piatto con le mani o le posate, senza guardare.',
      'Porta il cibo alla bocca e concentrati esclusivamente sulle sensazioni tattili e gustative.',
      'Nota come l\'assenza della vista amplifichi il sapore e l\'odore.'
    ]
  },
  {
    id: 'analisi-ingredienti',
    title: 'Analisi Sensoriale degli Ingredienti',
    description: 'Identificare ogni singolo sapore, spezia o consistenza presente in un boccone.',
    objective: 'Decostruzione della massa alimentare in elementi distinti e consci.',
    category: 'a pranzo',
    icon: 'Zap',
    instructions: [
      'Chiudi gli occhi mentre mastichi un boccone complesso.',
      'Cerca di isolare mentalmente il sale, lo zucchero, l\'acido o l\'amaro.',
      'Prova a indovinare le singole spezie o erbe aromatiche utilizzate.',
      'Identifica le diverse consistenze: croccante, morbido, fibroso, liquido.',
      'Tratta il cibo come un rebus chimico invece che come carburante veloce.'
    ]
  },
  {
    id: 'termometro-sazieta',
    title: 'Termometro della Sazietà',
    description: 'Valutare il proprio livello di fame su una scala da 1 a 10 durante il pasto.',
    objective: 'Distinguere la fame reale dalla voglia compulsiva o dalla noia.',
    category: 'a pranzo',
    icon: 'Thermometer',
    instructions: [
      'Prima di iniziare, assegna un numero alla tua fame (1=nullo, 10=estremo).',
      'Fermati esattamente a metà pasto e rifai la valutazione.',
      'Senti la differenza tra "stomaco pieno" e "voglia di continuare".',
      'Valuta un\'ultima volta al termine.',
      'Rifletti se hai mangiato per necessità o per automatismo.'
    ]
  },
  {
    id: 'origine-nutrimento',
    title: 'Origine del Nutrimento (Radici)',
    description: 'Contemplare il viaggio di un ingrediente dal campo alla tavola prima di mangiarlo.',
    objective: 'Riconnessione profonda con la materia e gratidudine non automatica.',
    category: 'a pranzo',
    icon: 'Trees',
    timerSeconds: 120, // 2 minutes
    instructions: [
      'Scegli un elemento semplice dal tuo piatto (un chicco di riso, una foglia d\'insalata).',
      'Visualizza la terra, l\'acqua e il sole che lo hanno nutrito.',
      'Pensa alle mani umane che lo hanno seminato, raccolto e trasportato.',
      'Riconosci l\'energia contenuta in quel piccolo frammento di materia.',
      'Mangialo con la consapevolezza di ricevere un dono solare.'
    ]
  },
  {
    id: 'caccia-colori-city',
    title: 'Caccia al Colore Urbano',
    description: 'Scegli un colore e cercalo freneticamente intorno a te mentre cammini.',
    objective: 'Allenare la vista a scansionare l\'ambiente invece che lo schermo.',
    category: 'osservazione',
    icon: 'Search',
    instructions: [
      'Scegli un colore raro (es: arancione o viola).',
      'Cammina per 5 minuti e conta quante volte lo incontri.',
      'Non guardare il telefono: la tua "notifica" è il colore scelto.',
      'Osserva le diverse tonalità che assume in base alla luce.',
      'Nota oggetti che non avevi mai visto prima sul tuo solito percorso.'
    ]
  },
  {
    id: 'osservazione-queue',
    title: 'Antropologia in Coda',
    description: 'Osservare la postura e le mani delle persone mentre aspetti al supermercato o in posta.',
    objective: 'Sostituire lo scrolling con l\'osservazione sociale curiosa.',
    category: 'osservazione',
    icon: 'Users',
    instructions: [
      'Mentre sei in coda, resisti alla tentazione di estrarre lo smartphone.',
      'Osserva la gestualità di chi ti sta vicino senza fissare.',
      'Nota chi altro è al telefono e chi invece guarda il vuoto.',
      'Indovina, basandoti sugli abiti o sugli acquisti, un dettaglio della loro vita.',
      'Riconnettiti con la varietà dell\'umanità reale.'
    ]
  },
  {
    id: 'lettore-etichette',
    title: 'Analisi Grafica del Carrello',
    description: 'Guarda le confezioni dei prodotti al supermercato senza leggerne le scritte.',
    objective: 'Vedere le forme e i colori invece dei brand e dei prezzi.',
    category: 'spesa',
    icon: 'ShoppingBag',
    instructions: [
      'Prendi un prodotto dallo scaffale.',
      'Sfoca leggermente la vista e osserva solo le masse di colore.',
      'Cerca di capire quale emozione vuole trasmettere quella combinazione cromatica.',
      'Nota le simmetrie e le asimmetrie nel design del packaging.',
      'Apprezza lo sforzo grafico dietro un oggetto banale.'
    ]
  },
  {
    id: 'tensione-muscolare',
    title: 'Scanner Muscolare in Palestra',
    description: 'Eseguire un esercizio focalizzandosi esclusivamente sulla contrazione del muscolo.',
    objective: 'Passare dal "quanta fatica faccio" al "cosa sente il mio corpo".',
    category: 'palestra',
    icon: 'Dumbbell',
    instructions: [
      'Scegli una macchina o un peso libero.',
      'Chiudi gli occhi (se sicuro) durante l\'esecuzione.',
      'Visualizza internamente la fibra muscolare che si accorcia e si allunga.',
      'Ignora la musica della palestra o i messaggi sullo schermo della macchina.',
      'Senti la connessione mente-muscolo senza distrazioni esterne.'
    ]
  },
  {
    id: 'geometrie-urbane',
    title: 'Geometrie dal Finestrino',
    description: 'Cercare triangoli, cerchi e quadrati nell\'architettura fuori dal bus o dal treno.',
    objective: 'Trasformare il tempo di viaggio in un gioco di scansione geometrica.',
    category: 'auto',
    icon: 'Box',
    instructions: [
      'Mettiti vicino al finestrino.',
      'Cerca di individuare 5 cerchi perfetti e 5 triangoli nelle costruzioni.',
      'Osserva come le linee dei palazzi si incrociano con l\'orizzonte.',
      'Nota le ombre portate dalle strutture.',
      'Mantieni lo sguardo esterno per tutta la durata della corsa.'
    ]
  },
  {
    id: 'suoni-ambiente',
    title: 'Analisi Acustica d\'Ufficio',
    description: 'Isolare e identificare 5 suoni meccanici o ambientali nel tuo ufficio.',
    objective: 'Riconoscere l\'ecosistema sonoro spesso ignorato o coperto dalle cuffie.',
    category: 'ufficio',
    icon: 'Radio',
    instructions: [
      'Togli le cuffie per 2 minuti.',
      'Chiudi gli occhi e ascolta.',
      'Identifica il fruscio del condizionatore, il ticchettio di una tastiera, una conversazione lontana.',
      'Prova a percepire la "distanza" dei suoni.',
      'Renditi conto dello spazio fisico attraverso l\'udito.'
    ]
  },
  {
    id: 'notifica-fantasma',
    title: 'Gestione della Notifica Fantasma',
    description: 'Osservare l\'impulso di controllare lo smartphone ogni volta che un computer o telefono altrui emette un suono.',
    objective: 'Decostruire il riflesso pavloviano legato alle notifiche digitali in ufficio.',
    category: 'everyday',
    icon: 'BellRing',
    instructions: [
      'Mentre lavori, nota ogni suono di notifica (anche non tuo).',
      'Osserva la mano che tende a muoversi verso il telefono.',
      'Fermati e respira consapevolmente per 2 cicli.',
      'Riconosci che lo stimolo è esterno e non richiede la tua reazione.',
      'Torna al compito precedente con un sorriso interno.'
    ]
  },
  {
    id: 'respiro-semaforo',
    title: 'Check-in al Semaforo',
    description: 'Usare il tempo di attesa al semaforo rosso per un monitoraggio corporeo rapido.',
    objective: 'Trasformare un momento di impazienza in uno di riconnessione.',
    category: 'everyday',
    icon: 'TrafficLight',
    instructions: [
      'Quando il semaforo diventa rosso, metti in folle o premi il freno.',
      'Non toccare il telefono o la radio.',
      'Fai 3 respiri profondi espandendo la pancia.',
      'Senti la pressione della schiena contro il sedile.',
      'Riparti solo quando il verde è bene in vista, con calma.'
    ]
  },
  {
    id: 'respiro-serie',
    title: 'Respiro tra le Serie',
    description: 'Dedicarsi al respiro addominale nei momenti di recupero tra un esercizio e l\'altro.',
    objective: 'Evitare di riempire i tempi morti dell\'allenamento con stimoli digitali.',
    category: 'palestra',
    icon: 'Wind',
    instructions: [
      'Dopo aver terminato una serie, siediti o resta in piedi senza muoverti.',
      'Conta i secondi di recupero basandoti solo sul tuo respiro.',
      'Ignora gli specchi e gli altri frequentatori.',
      'Senti il battito cardiaco che rallenta gradualmente.',
      'Inizia la serie successiva solo quando il fiato è tornato regolare.'
    ]
  },
  {
    id: 'pausa-specchio',
    title: 'Oltre lo Specchio',
    description: 'Guardarsi allo specchio della palestra senza giudicare la propria forma fisica.',
    objective: 'Osservazione neutra del corpo come tempio della vita, non come oggetto estetico.',
    category: 'palestra',
    icon: 'UserCircle',
    timerSeconds: 120,
    instructions: [
      'Mettiti davanti allo specchio.',
      'Guarda i tuoi occhi per 30 secondi.',
      'Osserva i muscoli e la pelle come strumenti biologici meravigliosi.',
      'Se sorge un giudizio ("troppo grasso", "troppo piccolo"), lascialo passare come una nuvola.',
      'Ringrazia il tuo corpo per lo sforzo che sta compiendo.'
    ]
  },
  {
    id: 'ritmo-cardio',
    title: 'Sincronia Cardio',
    description: 'Sincronizzare il respiro con il movimento ritmico della macchina cardio.',
    objective: 'Entrare in uno stato di flusso biomeccanico eliminando la noia.',
    category: 'palestra',
    icon: 'HeartPulse',
    timerSeconds: 600,
    instructions: [
      'Inizia la tua sessione su tapis roulant, ellittica o bici.',
      'Spegni il monitor o coprilo con un asciugamano.',
      'Abbina 4 passi (o pedalate) all\'inspirazione e 4 all\'espirazione.',
      'Senti il ritmo diventare automatico e meditativo.',
      'Osserva come la percezione del tempo cambia quando sei presente nel movimento.'
    ]
  },
  {
    id: 'osservazione-attrezzi',
    title: 'Architettura del Ghisa',
    description: 'Osservare la meccanica e il design degli attrezzi mentre si riposa.',
    objective: 'Curiosità verso l\'ingegneria che supporta il tuo movimento.',
    category: 'palestra',
    icon: 'Activity',
    instructions: [
      'Durante il recupero, osserva l\'attrezzo che stai usando.',
      'Nota le carrucole, i cavi, le saldature e le texture del metallo.',
      'Pensa a chi ha progettato questa macchina per facilitare la tua salute.',
      'Tocca la superficie fredda del ghisa e senti la sua solidità.',
      'Rimani presente nell\'ambiente invece di "fuggire" digitalmente.'
    ]
  },
  {
    id: 'scansione-postura',
    title: 'Scanner Posturale in Piedi',
    description: 'Valutare l\'allineamento del corpo tra un esercizio e l\'altro.',
    objective: 'Correzione consapevole della postura e radicamento a terra.',
    category: 'palestra',
    icon: 'Accessibility',
    instructions: [
      'Stai in piedi con i piedi alla larghezza delle spalle.',
      'Senti il peso distribuito equamente su pianta e tallone.',
      'Distendi la colonna vertebrale come se fossi appeso a un filo.',
      'Rilassa le spalle e attiva leggermente il core.',
      'Mantieni questa postura regale per 1 minuto prima della prossima serie.'
    ]
  },
  {
    id: 'distacco-musicale',
    title: 'Allenamento nel Silenzio',
    description: 'Eseguire una parte dell\'allenamento senza musica nelle cuffie.',
    objective: 'Distacco dalla dipendenza dallo stimolo dopaminergico musicale.',
    category: 'palestra',
    icon: 'VolumeX',
    instructions: [
      'Togli le cuffie o spegni la musica per 15 minuti.',
      'Ascolta il suono del tuo respiro e il rumore dei pesi.',
      'Senti la forza che nasce dal tuo interno senza spinte esterne.',
      'Osserva se la tua motivazione cala e accetta quella sensazione.',
      'Scopri la tua vera energia di base.'
    ]
  },
  {
    id: 'gestione-attesa',
    title: 'Distacco dall\'Attesa',
    description: 'Gestire l\'attesa per un attrezzo occupato senza usare il telefono.',
    objective: 'Allenare la pazienza e l\'osservazione dello spazio circostante.',
    category: 'palestra',
    icon: 'Timer',
    instructions: [
      'Se l\'attrezzo che ti serve è occupato, aspetta lì vicino.',
      'Resisti al riflesso di estrarre lo smartphone.',
      'Osserva lo spazio, il soffitto, le luci o la dinamica della sala.',
      'Fai dei micro-allungamenti consapevoli per le mani o il collo.',
      'Accetta l\'attesa come un esercizio di distacco dall\'urgenza.'
    ]
  },
  {
    id: 'consapevolezza-idrica',
    title: 'Il Sorso Consapevole',
    description: 'Bere acqua focalizzandosi sulla sensazione del liquido che rinfresca.',
    objective: 'Trasformare l\'idratazione in un momento di nutrimento profondo.',
    category: 'everyday',
    icon: 'Droplet',
    instructions: [
      'Prendi la tua borraccia con entrambe le mani.',
      'Bevi un piccolo sorso, tenendo l\'acqua in bocca per un istante.',
      'Senti il percorso del fresco che scende lungo la gola fino allo stomaco.',
      'Prendi coscienza della fortuna di avere acqua pulita a disposizione.',
      'Fai tre respiri lenti prima di riposizionare la borraccia.'
    ]
  },
  {
    id: 'fine-allenamento',
    title: 'Sigillo dell\'Allenamento',
    description: 'Dedicare 3 minuti di immobilità totale alla fine della sessione.',
    objective: 'Passaggio consapevole dallo sforzo fisico alla quiete mentale.',
    category: 'palestra',
    icon: 'LayoutGrid',
    timerSeconds: 180,
    instructions: [
      'Siediti o sdraiati in un angolo tranquillo dello spogliatoio o della sala.',
      'Chiudi gli occhi e senti l\'energia che scorre nel corpo.',
      'Non controllare messaggi o notifiche appena finito.',
      'Senti il sudore che si asciuga e il corpo che ringrazia.',
      'Esci dalla palestra portando con te questa sensazione di calma.'
    ]
  },
  {
    id: 'scanner-scrivania',
    title: 'Scanner della Scrivania',
    description: 'Osservare gli oggetti sulla propria scrivania come se fossero reperti archeologici sconosciuti.',
    objective: 'De-automatizzazione della percezione degli strumenti di lavoro quotidiani.',
    category: 'everyday',
    icon: 'Monitor',
    instructions: [
      'Sposta lo sguardo dallo schermo alla superficie della scrivania.',
      'Scegli un oggetto (la cucitrice, una penna, il mouse).',
      'Osservane la forma, il materiale e i segni di usura senza nominarlo mentalmente.',
      'Pensa alla funzione che svolge e alla materia di cui è fatto.',
      'Riconoscilo come un oggetto fisico separato dal tuo lavoro.'
    ]
  },
  {
    id: 'rituale-email',
    title: 'Rituale della Mail',
    description: 'Eseguire tre respiri consapevoli prima di aprire o rispondere a una comunicazione digitale.',
    objective: 'Interrompere il ciclo della reattività e dell\'ansia da risposta immediata.',
    category: 'ufficio',
    icon: 'Mail',
    instructions: [
      'Posiziona il cursore sul tasto "Invia" o sulla mail da aprire.',
      'Fermati prima di cliccare.',
      'Fai 3 respiri profondi, sentendo l\'aria che entra ed esce.',
      'Chiediti: "Questa risposta nasce dalla fretta o dalla chiarezza?".',
      'Clicca solo quando senti una calma vigilante.'
    ]
  },
  {
    id: 'udito-selettivo-pc',
    title: 'Udito Selettivo del PC',
    description: 'Isolare e ascoltare i micro-suoni prodotti dall\'hardware del tuo computer.',
    objective: 'Riconoscere la presenza fisica della macchina oltre l\'interfaccia software.',
    category: 'ufficio',
    icon: 'Headphones',
    instructions: [
      'Avvicina leggermente l\'orecchio al case o alla tastiera del laptop.',
      'Cerca di isolare il ronzio della ventola o il sibilo dell\'elettronica.',
      'Ascolta il suono meccanico della pressione dei tasti.',
      'Nota come questi suoni costituiscano il "battito" del tuo strumento di lavoro.',
      'Mantieni l\'ascolto per un minuto, ignorando le notifiche a schermo.'
    ]
  },
  {
    id: 'micro-movimento-call',
    title: 'Micro-Movimento in Call',
    description: 'Eseguire una contrazione muscolare isometrica durante una riunione video o telefonica.',
    objective: 'Mantenere il radicamento corporeo durante l\'astrazione della comunicazione digitale.',
    category: 'ufficio',
    icon: 'Video',
    instructions: [
      'Mentre ascolti durante una call, spingi le piante dei piedi contro il pavimento.',
      'Oppure contrai leggermente i glutei o i muscoli addominali.',
      'Mantieni la tensione per 5 secondi e rilascia.',
      'Senti la solidità del tuo corpo fisico mentre la mente è impegnata nel digitale.',
      'Nessuno vedrà il movimento, ma tu sentirai la tua presenza.'
    ]
  },
  {
    id: 'pausa-caffe-single',
    title: 'Pausa Caffè Single-Tasking',
    description: 'Consumare una bevanda calda in totale solitudine e senza stimoli digitali.',
    objective: 'Ripristinare il valore della pausa come vero distacco produttivo.',
    category: 'ufficio',
    icon: 'Coffee',
    timerSeconds: 300,
    instructions: [
      'Prendi il tuo caffè o tè e allontanati dalla scrivania.',
      'Lascia il telefono nel cassetto.',
      'Guarda fuori dalla finestra o fissa un punto neutro nel corridoio.',
      'Senti il calore della tazza tra le mani e l\'aroma della bevanda.',
      'Bevi ogni sorso lentamente, senza pensare al task successivo.'
    ]
  },
  {
    id: 'defocalizzazione-visiva',
    title: 'De-focalizzazione Visiva',
    description: 'Guardare oltre lo schermo verso un punto lontano per rilassare la vista.',
    objective: 'Alleviare lo stress oculare causato dalla focalizzazione fissa sul display.',
    category: 'ufficio',
    icon: 'Eye',
    timerSeconds: 60,
    instructions: [
      'Distogli lo sguardo dallo schermo.',
      'Cerca il punto più lontano visibile (fuori dalla finestra o in fondo al corridoio).',
      'Sfoca leggermente la vista, lasciando che l\'occhio si rilassi.',
      'Cerca di percepire la visione periferica invece di quella centrale.',
      'Mantieni questa "vista morbida" finché il timer non termina.'
    ]
  },
  {
    id: 'mappatura-click',
    title: 'Mappatura del Click',
    description: 'Osservare la frequenza e la compulsività dei propri click per un minuto.',
    objective: 'Prendere coscienza della velocità meccanica delle proprie interazioni digitali.',
    category: 'ufficio',
    icon: 'MousePointer2',
    timerSeconds: 60,
    instructions: [
      'Avvia il timer e continua a lavorare (o navigare).',
      'Presta attenzione a ogni singolo click del mouse o pressione dei tasti.',
      'Nota se clicchi per reale necessità o per ansia di movimento.',
      'Osserva la tensione nelle dita e nel polso.',
      'A fine minuto, rifletti sulla "densità" della tua interazione.'
    ]
  },
  {
    id: 'distacco-task',
    title: 'Respiro del Fine Task',
    description: 'Chiudere gli occhi per un minuto esatto al termine di un compito importante.',
    objective: 'Creare un confine netto tra i flussi di lavoro, evitando il multitasking compulsivo.',
    category: 'ufficio',
    icon: 'CheckSquare',
    timerSeconds: 60,
    instructions: [
      'Appena termini un task (invio report, fine riunione, chiusura bug).',
      'Chiudi tutte le schede del browser non necessarie.',
      'Chiudi gli occhi e avvia il timer.',
      'Rimani immobile, lasciando che la mente depositi le informazioni del task appena chiuso.',
      'Non iniziare il nuovo task finché il minuto non è trascorso.'
    ]
  },
  {
    id: 'scanner-cruscotto',
    title: 'Scanner del Cruscotto',
    description: 'Osservare i dettagli del cruscotto e dei materiali interni dell\'auto mentre sei fermo.',
    objective: 'Riconoscere la complessità dell\'oggetto abitacolo oltre la sua funzione di trasporto.',
    category: 'auto',
    icon: 'Gauge',
    instructions: [
      'A motore spento, osserva le trame delle plastiche o della pelle.',
      'Guarda le lancette e i display spenti.',
      'Tocca i tasti e senti la loro resistenza fisica e il clic meccanico.',
      'Nota come ogni elemento sia stato progettato per la tua interazione.',
      'Senti la protezione dell\'abitacolo come uno spazio fisico delimitato.'
    ]
  },
  {
    id: 'ritmo-frecce',
    title: 'Sincronia delle Frecce',
    description: 'Sincronizzare il respiro con il ticchettio sonoro dell\'indicatore di direzione.',
    objective: 'Trasformare un segnale acustico ripetitivo in un metronomo per la calma.',
    category: 'auto',
    icon: 'ArrowRightLeft',
    instructions: [
      'Mentre aspetti di svoltare con la freccia inserita.',
      'Ascolta il ticchettio meccanico della freccia.',
      'Inspirazione per 4 battiti, espirazione per 4 battiti.',
      'Lascia che il suono guidi il ritmo del polmone.',
      'Osserva come l\'attesa diventi un esercizio di ritmo interno.'
    ]
  },
  {
    id: 'ascolto-vibrazioni',
    title: 'Ascolto delle Vibrazioni',
    description: 'Sentire le vibrazioni del motore attraverso le mani sul volante durante la sosta.',
    objective: 'Connessione tattile con l\'energia meccanica del veicolo.',
    category: 'auto',
    icon: 'Activity',
    instructions: [
      'Mentre sei fermo al semaforo o in sosta col motore acceso.',
      'Appoggia entrambe le mani sul volante con una presa leggera.',
      'Senti la micro-vibrazione costante che risale lungo le braccia.',
      'Identifica il "battito" del motore come un\'entità viva di metallo.',
      'Rimani in questo ascolto tattile finché non devi ripartire.'
    ]
  },
  {
    id: 'mappatura-pedale',
    title: 'Mappatura del Pedale',
    description: 'Osservare la pressione millimetrica del piede sul pedale del freno nel traffico intenso.',
    objective: 'Riconoscere la precisione del proprio corpo in azioni abitualmente automatiche.',
    category: 'auto',
    icon: 'Footprints',
    instructions: [
      'Durante una coda "stop and go".',
      'Porta l\'attenzione alla pianta del piede destro.',
      'Senti il momento esatto in cui la scarpa tocca il gommino del pedale.',
      'Osserva la forza necessaria per mantenere l\'auto ferma.',
      'Nota la transizione tra tensione e rilascio quando riparti.'
    ]
  },
  {
    id: 'distacco-radio',
    title: 'Distacco dalla Radio',
    description: 'Guidare per un tratto di strada abituale in totale silenzio.',
    objective: 'Eliminare il rumore di fondo per osservare i propri pensieri durante il viaggio.',
    category: 'auto',
    icon: 'VolumeX',
    timerSeconds: 600,
    instructions: [
      'Spegni la radio, la musica e i podcast.',
      'Avvia il timer (se possibile) e guida normalmente.',
      'Ascolta il suono del vento, il rotolamento degli pneumatici e i rumori esterni.',
      'Osserva se sorge il bisogno di "riempire il vuoto" con dei suoni.',
      'Accetta il silenzio come compagno di viaggio.'
    ]
  },
  {
    id: 'percezione-asfalto',
    title: 'Percezione del Fondo',
    description: 'Saper distinguere la texture dell\'asfalto o del terreno attraverso il sedile e il volante.',
    objective: 'Affinamento della propriocezione estesa al mezzo meccanico.',
    category: 'auto',
    icon: 'Waves',
    instructions: [
      'Mentre guidi a velocità costante.',
      'Senti le diverse vibrazioni prodotte da asfalti diversi (liscio, rugoso, pavé).',
      'Immagina la gomma che morde la strada e trasmette l\'informazione al sedile.',
      'Riconosci come il tuo corpo "legga" il terreno attraverso l\'auto.',
      'Sii consapevole del contatto tra il veicolo e il pianeta.'
    ]
  },
  {
    id: 'sguardo-periferico',
    title: 'Esercizio di Sguardo Periferico',
    description: 'Mantenere la visione centrale sulla strada mentre si presta attenzione ai bordi.',
    objective: 'Espandere la consapevolezza spaziale e ridurre la stanchezza da "tunnel visivo".',
    category: 'auto',
    icon: 'Eye',
    instructions: [
      'Fissa la strada davanti a te.',
      'Senza muovere gli occhi, cerca di "vedere" i palazzi o gli alberi ai lati.',
      'Percepisci le auto che si affiancano usando solo la visione laterale.',
      'Osserva come la mente riesca a processare più informazioni del semplice punto centrale.',
      'Respira espandendo la visione a 180 gradi.'
    ]
  },
  {
    id: 'sigillo-viaggio',
    title: 'Il Sigillo del Viaggio',
    description: 'Restare seduti in auto per un minuto dopo aver spento il motore a destinazione.',
    objective: 'Creare una transizione consapevole tra il viaggio e l\'azione successiva.',
    category: 'auto',
    icon: 'Lock',
    timerSeconds: 60,
    instructions: [
      'Arriva a destinazione e spegni il motore.',
      'Non slacciare subito la cintura; non prendere il telefono.',
      'Rimani immobile mentre l\'abitacolo torna al silenzio.',
      'Fai 3 respiri di ringraziamento per il viaggio concluso in sicurezza.',
      'Esci dall\'auto solo quando senti che il viaggio è "depositato".'
    ]
  }
];
