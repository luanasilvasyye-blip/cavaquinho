// Pure client-side PDF document generator producing valid standard PDF-1.4 files
// No external npm dependencies required

function escapePdfText(text: string): string {
  // Replace characters outside basic ASCII with readable normalized equivalents for standard PDF font Helvetica
  const normalized = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics for safe standard 14 font PDF output
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
  return normalized;
}

export function generatePdfBlob(title: string, subtitle: string, pagesContent: string[][]): Blob {
  const objects: string[] = [];

  const addObject = (content: string) => {
    objects.push(content);
    return objects.length; // 1-indexed object id
  };

  // Object 1: Catalog
  // Object 2: Font Helvetica
  // Object 3: Font Helvetica-Bold
  // Pages object will be created after pages
  const catalogObjId = addObject(''); // placeholder
  const fontRegularObjId = addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`);
  const fontBoldObjId = addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`);

  const pageObjIds: number[] = [];

  pagesContent.forEach((lines, pageIndex) => {
    // Generate page stream
    let streamText = `BT\n`;
    
    // Header Bar
    streamText += `/F2 16 Tf\n36 780 Td\n(${escapePdfText(title)}) Tj\n`;
    streamText += `/F1 9 Tf\n0 -16 Td\n(${escapePdfText(subtitle + ' | Pagina ' + (pageIndex + 1) + ' de ' + pagesContent.length)}) Tj\n`;
    
    // Decorative line
    streamText += `ET\n`;
    streamText += `0.06 0.85 0.49 RG\n2 w\n36 750 m 576 750 l S\n`;
    streamText += `BT\n`;

    // Content body
    streamText += `36 720 Td\n`;
    let currentY = 720;

    lines.forEach((line) => {
      if (line.startsWith('# ')) {
        // Main Section Title
        const sectionTitle = line.replace('# ', '');
        streamText += `/F2 13 Tf\n0 -22 Td\n(${escapePdfText(sectionTitle)}) Tj\n`;
        currentY -= 22;
      } else if (line.startsWith('## ')) {
        // Sub-title
        const subTitle = line.replace('## ', '');
        streamText += `/F2 10 Tf\n0 -18 Td\n(${escapePdfText(subTitle)}) Tj\n`;
        currentY -= 18;
      } else if (line.startsWith('* ')) {
        // Bullet point
        const bulletText = line.replace('* ', '• ');
        streamText += `/F1 9 Tf\n0 -14 Td\n(${escapePdfText(bulletText)}) Tj\n`;
        currentY -= 14;
      } else if (line.trim() === '') {
        streamText += `0 -10 Td\n`;
        currentY -= 10;
      } else {
        // Regular text
        streamText += `/F1 9 Tf\n0 -13 Td\n(${escapePdfText(line)}) Tj\n`;
        currentY -= 13;
      }
    });

    // Footer
    streamText += `/F1 8 Tf\n0 ${-(currentY - 40)} Td\n(Cavaquinho Facil - Material de Apoio Pratico - Afinacao Re-Sol-Si-Re) Tj\n`;
    streamText += `ET\n`;

    const streamLength = streamText.length;
    const contentObjId = addObject(`<< /Length ${streamLength} >>\nstream\n${streamText}\nendstream`);

    const pageObjId = addObject(
      `<< /Type /Page /Parent 4 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontRegularObjId} 0 R /F2 ${fontBoldObjId} 0 R >> >> /Contents ${contentObjId} 0 R >>`
    );
    pageObjIds.push(pageObjId);
  });

  // Pages Object (id 4)
  const pagesListStr = pageObjIds.map((id) => `${id} 0 R`).join(' ');
  const pagesObjContent = `<< /Type /Pages /Kids [${pagesListStr}] /Count ${pageObjIds.length} >>`;
  
  // Replace placeholder catalog and insert pages
  objects[0] = `<< /Type /Catalog /Pages 4 0 R >>`;
  objects.splice(3, 0, pagesObjContent); // insert at index 3 (object id 4)

  // Build full PDF file
  let pdf = `%PDF-1.4\n%\xE2\xE3\xCF\xD3\n`;
  const offsets: number[] = [0];

  objects.forEach((objContent, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${objContent}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;

  for (let i = 1; i <= objects.length; i++) {
    const offsetStr = String(offsets[i]).padStart(10, '0');
    pdf += `${offsetStr} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export function downloadMaterialPdf(materialId: string): void {
  let title = 'Cavaquinho Facil';
  let subtitle = 'Demonstracao do Material';
  let pages: string[][] = [];

  if (materialId === 'guia-iniciante') {
    title = 'Guia do Iniciante no Cavaquinho (Demonstracao)';
    subtitle = 'Fundamentos Praticos, Postura e Afinacao Re-Sol-Si-Re';
    pages = [
      [
        '# CAPITULO 1: O INSTRUMENTO E A AFINACAO TRADICIONAL',
        'O cavaquinho brasileiro e um dos instrumentos mais vibrantes e ritmicos do mundo.',
        'Sua afinacao tradicional e o Sol Aberto com as 4 cordas numeradas:',
        '* 4a corda (mais grossa, voltada para cima): Re (D4 - 293.66 Hz)',
        '* 3a corda: Sol (G4 - 392.00 Hz)',
        '* 2a corda: Si (B4 - 493.88 Hz)',
        '* 1a corda (mais fina, voltada para baixo): Re (D5 - 587.33 Hz)',
        '',
        '## O Segredo do Som Limpo',
        'A 1a corda e a 4a corda estao na mesma nota (Re), porem em oitavas diferentes.',
        'Ao tocar com a palheta, deixe a ponta passar com leveza pelas cordas sem engasgar.',
        'O apoio do cavaquinho deve ficar no antebraco direito contra a costela.',
        'A mao esquerda nunca segura o peso do instrumento; ela precisa ficar solta.',
        '',
        '# CAPITULO 2: EMPUNHADURA DA PALHETA',
        '* Segure a palheta entre a polpa do polegar e a lateral do indicador.',
        '* Deixe apenas cerca de 2 a 3 mm de ponta para fora.',
        '* O movimento ritmico vem do punho flexivel e solto, nao do cotovelo travado.'
      ],
      [
        '# CAPITULO 3: DEDOS DA MAO ESQUERDA E POSTURA',
        'Cada dedo possui uma funcao anatomica bem definida no braco do cavaquinho:',
        '* Dedo 1: Indicador',
        '* Dedo 2: Medio',
        '* Dedo 3: Anelar',
        '* Dedo 4: Minimo',
        '',
        '## Dica de Ouro: Ataque Perpendicular',
        'Pressione as cordas com a ponta dos dedos, bem proximo ao traste de metal.',
        'Nunca apoie a barriga do dedo na escala, pois isso abafa as cordas vizinhas.',
        'Mantenha as unhas curtas para permitir a curvatura perfeita dos nos dos dedos.',
        '',
        '# CAPITULO 4: ROTINA SUSTENTAVEL DE 15 MINUTOS',
        '* Minutos 0 a 3: Aquecimento com cordas soltas no metronomo a 60 BPM.',
        '* Minutos 3 a 8: Pratica de trocas entre Sol Maior (G) e Do Maior (C).',
        '* Minutos 8 a 13: Aplicacao da batida de samba (Baixo - Cima - Abafa - Cima).',
        '* Minutos 13 a 15: Execucao musical livre e relaxamento dos punhos.'
      ]
    ];
  } else if (materialId === 'acordes-ilustrados') {
    title = '10 Acordes Ilustrados para Cavaquinho';
    subtitle = 'Dicionario de Digitacoes para Afinacao Re-Sol-Si-Re';
    pages = [
      [
        '# PRANCHA 1: ACORDES MAIORES FUNDAMENTAIS',
        'Posicoes exatas de casas [4a, 3a, 2a, 1a corda] e dedos recomendados:',
        '',
        '## G - Sol Maior [Casas: 0 0 0 0 | Dedos: 0 0 0 0]',
        '* Notas: Re, Sol, Si, Re. Todas as 4 cordas soltas! Som limpo e luminoso.',
        '',
        '## C - Do Maior [Casas: 2 0 1 2 | Dedos: 2 0 1 3]',
        '* Notas: Mi, Sol, Do, Mi. Dedo 1 na casa 1; dedos 2 e 3 na casa 2.',
        '',
        '## D - Re Maior [Casas: 0 2 3 4 | Dedos: 0 1 2 3]',
        '* Notas: Re, La, Re, Fa#. 4a corda solta; dedos 1, 2 e 3 em escadinha.',
        '',
        '## E - Mi Maior [Casas: 2 1 0 2 | Dedos: 3 1 0 2]',
        '* Notas: Mi, Sol#, Si, Mi. 2a corda solta (Si).',
        '',
        '## F - Fa Maior [Casas: 3 2 1 3 | Dedos: 3 2 1 4]',
        '* Notas: Fa, La, Do, Fa. Exige os 4 dedos bem curvados.',
        '',
        '## A - La Maior [Casas: 2 2 2 2 | Dedos: 1 1 1 1]',
        '* Notas: Mi, La, Do#, Mi. Pestana com o dedo 1 na casa 2.'
      ],
      [
        '# PRANCHA 2: ACORDES MENORES E COM SETIMA',
        '',
        '## Em - Mi Menor [Casas: 2 0 0 2 | Dedos: 2 0 0 3]',
        '* Notas: Mi, Sol, Si, Mi. Duas cordas soltas no centro.',
        '',
        '## Am - La Menor [Casas: 2 2 1 2 | Dedos: 3 2 1 4]',
        '* Notas: Mi, La, Do, Mi. Acorde chave para cadencias menores do samba.',
        '',
        '## Dm - Re Menor [Casas: 0 2 3 3 | Dedos: 0 1 2 3]',
        '* Notas: Re, La, Re, Fa. Dedos 2 e 3 na casa 3.',
        '',
        '## G7 - Sol com Setima [Casas: 0 0 0 3 | Dedos: 0 0 0 3]',
        '* Notas: Re, Sol, Si, Fa. Dedo 3 na casa 3 da 1a corda.',
        '',
        '## D7 - Re com Setima [Casas: 0 2 1 4 | Dedos: 0 2 1 3]',
        '* Notas: Re, La, Do, Fa#. Essencial para o quadrado de Sol Maior.',
        '',
        '## A7 - La com Setima [Casas: 2 2 2 5 | Dedos: 1 2 3 4]',
        '* Notas: Mi, La, Do#, Sol. Minimo alcanca a casa 5 na 1a corda.'
      ]
    ];
  } else {
    title = 'Planner Semanal de Pratica no Cavaquinho';
    subtitle = 'Acompanhamento de Trocas de Acordes e Metronomo';
    pages = [
      [
        '# PLANNER DE ESTUDO SEMANAL - METAS CLARAS',
        'Constancia diaria e o unico diferencial entre quem evolui e quem desiste.',
        '',
        '## Tabela de Monitoramento Semanal',
        '* Segunda-feira: [  ] 15 min - Postura e afinaao | Meta: 20 trocas G -> C',
        '* Terca-feira:   [  ] 15 min - Acorde G7 e D7    | Meta: 15 trocas C -> G7',
        '* Quarta-feira:  [  ] 15 min - Metronomo a 65 BPM| Meta: Manter ritmo 2/4',
        '* Quinta-feira:  [  ] 15 min - Batida com abafado| Meta: Som sem travar',
        '* Sexta-feira:   [  ] 20 min - Quadrado de Sol   | Meta: G - Em - Am - D7',
        '* Sabado:        [  ] 20 min - Revisao completa  | Meta: Tocar 4 compassos',
        '* Domingo:       [  ] Descanso ou toque livre por prazer musical',
        '',
        '## Registro de Trocas por Minuto (Desafio 60s)',
        'Anote o numero de trocas limpas que voce consegue fazer no treinador:',
        '* Par G -> C: Meta inicial: 15 trocas/min | Meta intermediaria: 35 trocas/min',
        '* Par C -> D7: Meta inicial: 12 trocas/min | Meta intermediaria: 30 trocas/min',
        '* Par Em -> Am: Meta inicial: 15 trocas/min | Meta intermediaria: 32 trocas/min'
      ]
    ];
  }

  const blob = generatePdfBlob(title, subtitle, pages);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${materialId}-cavaquinho-facil.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
