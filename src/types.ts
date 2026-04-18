export type ExerciseId = 
  | 'digiuno-acquisto' 
  | 'alimentazione-single' 
  | 'produzione-creativa' 
  | 'mappatura-automatismi' 
  | 'disegno-effimero' 
  | 'tratto-continuo' 
  | 'scomposizione-visiva' 
  | 'cancellazione-creativa'
  | 'ricalco-analogico'
  | 'pixel-art-materica'
  | 'glitch-art-mano'
  | 'interfaccia-immaginaria'
  | 'cattura-colori'
  | 'icona-gigante'
  | 'storyboard-feed'
  | 'qr-code-astratto'
  | 'ritratto-pixel'
  | 'mappa-link'
  | 'emoji-giganti'
  | 'doodle-notifiche'
  | 'architettura-cartone'
  | 'font-inventato'
  | 'zentangle-schermo'
  | 'collage-tastiere'
  | 'ombre-dispositivo'
  | 'filtro-realta'
  | 'data-viz-mano'
  | 'manuale-umano'
  | 'masticazione-consapevole'
  | 'rituale-posate'
  | 'assaggio-buio'
  | 'analisi-ingredienti'
  | 'termometro-sazieta'
  | 'origine-nutrimento'
  | 'caccia-colori-city'
  | 'osservazione-queue'
  | 'lettore-etichette'
  | 'tensione-muscolare'
  | 'geometrie-urbane'
  | 'suoni-ambiente'
  | 'notifica-fantasma'
  | 'respiro-semaforo'
  | 'respiro-serie'
  | 'pausa-specchio'
  | 'ritmo-cardio'
  | 'osservazione-attrezzi'
  | 'scansione-postura'
  | 'distacco-musicale'
  | 'gestione-attesa'
  | 'consapevolezza-idrica'
  | 'fine-allenamento'
  | 'scanner-scrivania'
  | 'rituale-email'
  | 'udito-selettivo-pc'
  | 'micro-movimento-call'
  | 'defocalizzazione-visiva'
  | 'mappatura-click'
  | 'distacco-task'
  | 'scanner-cruscotto'
  | 'ritmo-frecce'
  | 'ascolto-vibrazioni'
  | 'mappatura-pedale'
  | 'distacco-radio'
  | 'percezione-asfalto'
  | 'sguardo-periferico'
  | 'sigillo-viaggio';

export interface Exercise {
  id: ExerciseId;
  title: string;
  description: string;
  objective: string;
  instructions: string[];
  icon: string;
  category: 'consapevolezza' | 'creatività' | 'osservazione' | 'a pranzo' | 'ufficio' | 'spesa' | 'palestra' | 'auto';
  timerSeconds?: number;
}

export interface JournalEntry {
  id: string;
  exerciseId: ExerciseId;
  timestamp: number;
  content: string;
  mood?: string;
}

export interface UserHistory {
  exerciseId: ExerciseId;
  lastAccessed: number;
  completedCount: number;
}
