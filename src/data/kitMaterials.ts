import { KitMaterial } from '../types';

export const KIT_MATERIALS: KitMaterial[] = [
  {
    id: 'guia-iniciante',
    title: 'Guia do Iniciante no Cavaquinho',
    subtitle: 'Método Passo a Passo & Fundamentos Tradicionais',
    pages: 14,
    tag: 'E-book Completo (14 págs)',
    description: 'Manual definitivo cobrindo postura, afinação Ré-Sol-Si-Ré, segredo do apoio do antebraço, palhetada de samba e choro, e exercícios diários para não machucar os tendões.',
    topics: [
      'Capítulo 1: A anatomia do cavaquinho e afinações históricas',
      'Capítulo 2: Como segurar a palheta sem travar o punho',
      'Capítulo 3: Afinação de ouvido e uso de diapasão/afinador digital',
      'Capítulo 4: O ataque perpendicular da mão esquerda',
      'Capítulo 5: A palhetada do samba: baixo, cima, abafamento sincopado',
      'Capítulo 6: 10 erros fatais que travam o iniciante e como corrigi-los',
      'Capítulo 7: Rotina sustentável de 15 minutos diários'
    ],
    coverGradient: 'from-emerald-900/60 via-[#111317] to-[#08090B]'
  },
  {
    id: 'acordes-ilustrados',
    title: '10 Acordes Ilustrados para Cavaquinho',
    subtitle: 'Dicionário Visual com Digitação Anatômica',
    pages: 4,
    tag: 'Dicionário Visual (4 págs)',
    description: 'Prancha de consulta rápida em alta resolução com os acordes indispensáveis do samba, mapa de casas, dedos recomendados e notas que compõem cada tríade/tétrade.',
    topics: [
      'Prancha 1: Acordes Maiores fundamentais (Sol, Dó, Ré, Mi, Fá, Lá)',
      'Prancha 2: Acordes Menores essenciais (Mi menor, Ré menor, Lá menor)',
      'Prancha 3: Acordes com Sétima dominante (Sol 7, Ré 7, Lá 7)',
      'Prancha 4: Tabela de transições e dedos pivôs estratégicos'
    ],
    coverGradient: 'from-amber-950/60 via-[#111317] to-[#08090B]'
  },
  {
    id: 'planner-estudos',
    title: 'Planner Semanal de Prática',
    subtitle: 'Folha de Metas, BPM e Registro de Trocas',
    pages: 4,
    tag: 'Planner Prático (4 págs)',
    description: 'Folhas de acompanhamento para imprimir ou usar digitalmente. Monitore seu BPM no metrônomo, trocas por minuto entre acordes e minutos de dedicação.',
    topics: [
      'Página 1: Quadro semanal de metas objetivas (3 metas por ciclo)',
      'Página 2: Tabela de progressão de BPM por batida (60 a 140 BPM)',
      'Página 3: Gráfico de trocas de acordes por minuto (Desafio dos 60s)',
      'Página 4: Diário de percepção musical e anotações de repertório'
    ],
    coverGradient: 'from-teal-950/60 via-[#111317] to-[#08090B]'
  }
];
