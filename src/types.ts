export interface ChordData {
  id: string;
  name: string;
  suffix?: string;
  fullName: string;
  // Cordas: [4ª corda, 3ª corda, 2ª corda, 1ª corda]
  // Afinação padrão: 4ª=Ré(D4), 3ª=Sol(G4), 2ª=Si(B4), 1ª=Ré(D5)
  frets: [number, number, number, number];
  // Dedos correspondentes (0 = corda solta, 1 = indicador, 2 = médio, 3 = anelar, 4 = mínimo)
  fingers: [number, number, number, number];
  notes: [string, string, string, string];
  frequencies: [number, number, number, number];
  category: 'maior' | 'menor' | 'setima';
  tip: string;
  difficulty: 'Fácil' | 'Médio' | 'Atenção';
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  objective: string;
  content: string[];
  exercise: string;
  tips?: string;
}

export interface PlanDay {
  day: number;
  title: string;
  shortDescription: string;
  goal: string;
  lessons: Lesson[];
}

export interface TrainingRecord {
  id: string;
  date: string;
  chordA: string;
  chordB: string;
  durationSeconds: number;
  switchesReported: number;
  switchesPerMinute: number;
}

export interface UserProgress {
  completedLessons: string[]; // lesson ids
  streakDays: number;
  lastTrainedDate?: string;
  history: TrainingRecord[];
}

export type AppTab = 'dashboard' | 'acordes' | 'treinador' | 'plano' | 'kit' | 'metronomo' | 'evolucao';

export interface KitMaterial {
  id: string;
  title: string;
  subtitle: string;
  pages: number;
  tag: string;
  description: string;
  topics: string[];
  coverGradient: string;
}
