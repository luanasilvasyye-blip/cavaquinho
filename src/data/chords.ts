import { ChordData } from '../types';

// Base frequencies for open strings (Ré4, Sol4, Si4, Ré5)
export const OPEN_STRING_FREQS = [293.66, 392.00, 493.88, 587.33] as const;

export function calculateFrequencies(frets: [number, number, number, number]): [number, number, number, number] {
  return [
    OPEN_STRING_FREQS[0] * Math.pow(2, frets[0] / 12),
    OPEN_STRING_FREQS[1] * Math.pow(2, frets[1] / 12),
    OPEN_STRING_FREQS[2] * Math.pow(2, frets[2] / 12),
    OPEN_STRING_FREQS[3] * Math.pow(2, frets[3] / 12),
  ];
}

export const CHORDS_LIST: ChordData[] = [
  {
    id: 'G',
    name: 'G',
    fullName: 'Sol Maior',
    frets: [0, 0, 0, 0],
    fingers: [0, 0, 0, 0],
    notes: ['Ré', 'Sol', 'Si', 'Ré'],
    frequencies: calculateFrequencies([0, 0, 0, 0]),
    category: 'maior',
    difficulty: 'Fácil',
    tip: 'Todas as cordas soltas! O som deve soar límpido e brilhante. Ótimo ponto de partida para treinar a mão direita.'
  },
  {
    id: 'G7',
    name: 'G7',
    fullName: 'Sol com Sétima Dominante',
    frets: [0, 0, 0, 3],
    fingers: [0, 0, 0, 3],
    notes: ['Ré', 'Sol', 'Si', 'Fá'],
    frequencies: calculateFrequencies([0, 0, 0, 3]),
    category: 'setima',
    difficulty: 'Fácil',
    tip: 'Apenas o dedo 3 (anelar) na casa 3 da 1ª corda. Cria tensão harmônica clássica que prepara a resolução para Dó Maior (C).'
  },
  {
    id: 'C',
    name: 'C',
    fullName: 'Dó Maior',
    frets: [2, 0, 1, 2],
    fingers: [2, 0, 1, 3],
    notes: ['Mi', 'Sol', 'Dó', 'Mi'],
    frequencies: calculateFrequencies([2, 0, 1, 2]),
    category: 'maior',
    difficulty: 'Fácil',
    tip: 'Deixe a 3ª corda (Sol) solta vibrar livremente. Curve bem o dedo 1 na casa 1 para não abafar a corda vizinha.'
  },
  {
    id: 'D',
    name: 'D',
    fullName: 'Ré Maior',
    frets: [0, 2, 3, 4],
    fingers: [0, 1, 2, 3],
    notes: ['Ré', 'Lá', 'Ré', 'Fá#'],
    frequencies: calculateFrequencies([0, 2, 3, 4]),
    category: 'maior',
    difficulty: 'Médio',
    tip: 'A 4ª corda fica solta (baixo em Ré). Posicione os dedos 1, 2 e 3 em escadinha nas casas 2, 3 e 4 com as pontas bem perpendiculares.'
  },
  {
    id: 'Dm',
    name: 'Dm',
    fullName: 'Ré Menor',
    frets: [0, 2, 3, 3],
    fingers: [0, 1, 2, 3],
    notes: ['Ré', 'Lá', 'Ré', 'Fá'],
    frequencies: calculateFrequencies([0, 2, 3, 3]),
    category: 'menor',
    difficulty: 'Médio',
    tip: 'Dedo 2 e dedo 3 ficam na mesma casa (casa 3) nas cordas 2ª e 1ª. Mantenha os dedos arqueados para soar nítido.'
  },
  {
    id: 'D7',
    name: 'D7',
    fullName: 'Ré com Sétima',
    frets: [0, 2, 1, 4],
    fingers: [0, 2, 1, 3],
    notes: ['Ré', 'Lá', 'Dó', 'Fá#'],
    frequencies: calculateFrequencies([0, 2, 1, 4]),
    category: 'setima',
    difficulty: 'Médio',
    tip: 'Dedo 1 fica na casa 1 da 2ª corda, dedo 2 na casa 2 da 3ª corda, e dedo 3 na casa 4 da 1ª corda. Muito usado no quadrado de Sol!'
  },
  {
    id: 'E',
    name: 'E',
    fullName: 'Mi Maior',
    frets: [2, 1, 0, 2],
    fingers: [3, 1, 0, 2],
    notes: ['Mi', 'Sol#', 'Si', 'Mi'],
    frequencies: calculateFrequencies([2, 1, 0, 2]),
    category: 'maior',
    difficulty: 'Médio',
    tip: 'A 2ª corda soa solta (Si). Dedo 1 na casa 1, dedo 2 na 1ª corda casa 2, e dedo 3 na 4ª corda casa 2.'
  },
  {
    id: 'Em',
    name: 'Em',
    fullName: 'Mi Menor',
    frets: [2, 0, 0, 2],
    fingers: [2, 0, 0, 3],
    notes: ['Mi', 'Sol', 'Si', 'Mi'],
    frequencies: calculateFrequencies([2, 0, 0, 2]),
    category: 'menor',
    difficulty: 'Fácil',
    tip: 'Duas cordas centrais soltas (Sol e Si). Dedo 2 na 4ª corda casa 2 e dedo 3 na 1ª corda casa 2. Sonoridade melancólica e elegante.'
  },
  {
    id: 'F',
    name: 'F',
    fullName: 'Fá Maior',
    frets: [3, 2, 1, 3],
    fingers: [3, 2, 1, 4],
    notes: ['Fá', 'Lá', 'Dó', 'Fá'],
    frequencies: calculateFrequencies([3, 2, 1, 3]),
    category: 'maior',
    difficulty: 'Atenção',
    tip: 'Usa os 4 dedos da mão esquerda. Dedo 1 na 2ª corda casa 1, dedo 2 na 3ª corda casa 2, dedos 3 e 4 na casa 3 das cordas 4ª e 1ª.'
  },
  {
    id: 'A',
    name: 'A',
    fullName: 'Lá Maior',
    frets: [2, 2, 2, 2],
    fingers: [1, 1, 1, 1],
    notes: ['Mi', 'Lá', 'Dó#', 'Mi'],
    frequencies: calculateFrequencies([2, 2, 2, 2]),
    category: 'maior',
    difficulty: 'Médio',
    tip: 'Pestana suave com o dedo 1 prendendo todas as 4 cordas na casa 2, ou distribuição com dedos 1, 2, 3 e 4 alinhados.'
  },
  {
    id: 'Am',
    name: 'Am',
    fullName: 'Lá Menor',
    frets: [2, 2, 1, 2],
    fingers: [3, 2, 1, 4],
    notes: ['Mi', 'Lá', 'Dó', 'Mi'],
    frequencies: calculateFrequencies([2, 2, 1, 2]),
    category: 'menor',
    difficulty: 'Médio',
    tip: 'Dedo 1 na casa 1 da 2ª corda, enquanto as cordas 4ª, 3ª e 1ª são pressionadas na casa 2. Harmonia fundamental do samba triste e romântico.'
  },
  {
    id: 'A7',
    name: 'A7',
    fullName: 'Lá com Sétima',
    frets: [2, 2, 2, 5],
    fingers: [1, 2, 3, 4],
    notes: ['Mi', 'Lá', 'Dó#', 'Sol'],
    frequencies: calculateFrequencies([2, 2, 2, 5]),
    category: 'setima',
    difficulty: 'Atenção',
    tip: 'Alongue o dedo 4 (mínimo) até a casa 5 na 1ª corda (Sol agudo), mantendo a sustentação na casa 2 para as demais cordas.'
  }
];

export const CHORD_BY_ID = new Map(CHORDS_LIST.map(c => [c.id, c]));
