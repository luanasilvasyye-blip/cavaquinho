import { PlanDay } from '../types';

export const STUDY_PLAN: PlanDay[] = [
  {
    day: 1,
    title: 'Conhecendo o Cavaquinho',
    shortDescription: 'Anatomia, afinação brasileira Ré-Sol-Si-Ré e como segurar.',
    goal: 'Aprender a postura correta, entender as cordas e tirar o primeiro som limpo sem forçar o pulso.',
    lessons: [
      {
        id: 'd1_l1',
        title: 'Anatomia e Afinação Tradicional',
        durationMinutes: 6,
        objective: 'Reconhecer as 4 cordas numeradas da mais aguda (1ª) para a mais grave (4ª).',
        content: [
          'O cavaquinho brasileiro utiliza afinação tradicional em Sol Aberto: 4ª corda = Ré (D4), 3ª corda = Sol (G4), 2ª corda = Si (B4) e 1ª corda = Ré (D5).',
          'Note que a 1ª e a 4ª corda possuem a mesma nota (Ré), porém a 1ª corda soa uma oitava acima.',
          'Memorize a contagem das cordas: olhando de cima para baixo enquanto segura o cavaquinho, a mais próxima do seu queixo é a 4ª corda e a mais próxima do chão é a 1ª corda.'
        ],
        exercise: 'Toque com a palheta cada corda solta, da 4ª até a 1ª. Ouça a ressonância de cada uma no app e compare com o seu instrumento.',
        tips: 'Segure a palheta entre o polegar e a lateral do indicador sem apertar com força excessiva.'
      },
      {
        id: 'd1_l2',
        title: 'Empunhadura e Apoio do Instrumento',
        durationMinutes: 8,
        objective: 'Posicionar o cavaquinho confortavelmente contra o antebraço direito e peito.',
        content: [
          'Ao contrário do violão grande, o cavaquinho é leve e fica encaixado entre o antebraço direito e a lateral do tronco.',
          'A mão esquerda NÃO deve carregar o peso do instrumento! Ela precisa estar totalmente livre para se mover ao longo do braço.',
          'Mantenha o braço do cavaquinho ligeiramente inclinado para cima (cerca de 30° a 45°), nunca apontado para o chão.'
        ],
        exercise: 'Solte a mão esquerda por 5 segundos: o cavaquinho continua firme apenas com o apoio do braço direito? Se sim, seu apoio está perfeito.',
        tips: 'Se sentir tensão nos ombros, respire fundo, abaixe os ombros e relaxe o pescoço.'
      },
      {
        id: 'd1_l3',
        title: 'Primeiro Toque com a Palheta',
        durationMinutes: 7,
        objective: 'Executar batidas suaves para baixo sem travar a palheta entre as cordas.',
        content: [
          'Deixe apenas a pontinha da palheta (cerca de 2 a 3 milímetros) tocar as cordas.',
          'O movimento da mão direita vem principalmente da rotação suave do punho, como se estivesse sacudindo a água dos dedos, e não do cotovelo rígido.',
          'Incline a palheta suavemente para que ela deslize pelas 4 cordas sem enroscar.'
        ],
        exercise: 'Faça 4 movimentos para baixo no ritmo constante de 1 segundo por batida, passando por todas as cordas soltas (Sol Maior natural).',
        tips: 'Busque um som macio e brilhante, evitando força bruta.'
      }
    ]
  },
  {
    day: 2,
    title: 'Primeiros Acordes',
    shortDescription: 'Sol Maior (G), Sol com Sétima (G7) e Dó Maior (C).',
    goal: 'Montar com precisão os 3 primeiros acordes fundamentais e soar cada corda com clareza.',
    lessons: [
      {
        id: 'd2_l1',
        title: 'O Acorde de Sol Maior (G) Solto',
        durationMinutes: 7,
        objective: 'Compreender o acorde natural mais amigável do cavaquinho.',
        content: [
          'Na afinação Ré-Sol-Si-Ré, todas as 4 cordas soltas já formam a tríade de Sol Maior [G: 0 0 0 0]!',
          'Isso acontece porque Ré, Sol e Si são justamente a fundamental (Sol), terça maior (Si) e quinta justa (Ré).',
          'É o acorde perfeito para treinar a precisão e a dinâmica da mão da palheta.'
        ],
        exercise: 'Toque 8 batidas no acorde de Sol Maior solto. Verifique se nenhuma corda está vibrando contra outra ou zumbindo no traste.',
        tips: 'Lembre-se: em cifras musicais, G representa Sol Maior.'
      },
      {
        id: 'd2_l2',
        title: 'Sol com Sétima (G7) - A Primeira Casa',
        durationMinutes: 8,
        objective: 'Pressionar apenas 1 dedo e entender a função da sétima.',
        content: [
          'O acorde G7 [0 0 0 3] exige apenas um dedo: coloque o dedo 3 (anelar) na casa 3 da 1ª corda.',
          'A nota resultante na 1ª corda é o Fá natural, que adiciona a sétima menor à harmonia.',
          'Essa sonoridade cria uma "pergunta" musical que pede para ser respondida pelo acorde de Dó Maior (C).'
        ],
        exercise: 'Alterne entre G (solto) e G7 (dedo 3 na 1ª corda, casa 3). Toque 4 tempos em cada um bem devagar.',
        tips: 'Aperte a corda perto do traste (o filete de metal), nunca em cima dele.'
      },
      {
        id: 'd2_l3',
        title: 'Dó Maior (C) - Coordenando Três Dedos',
        durationMinutes: 10,
        objective: 'Montar C [2 0 1 2] garantindo que a 3ª corda solta ressoe limpa.',
        content: [
          'Dó Maior exige: dedo 1 na 2ª corda casa 1, dedo 2 na 4ª corda casa 2, e dedo 3 na 1ª corda casa 2.',
          'Atenção especial à 3ª corda (Sol): ela é tocada solta no meio do acorde.',
          'Se o dedo 2 ou o dedo 1 encostarem nela por descuido, ela soará abafada ("toc").'
        ],
        exercise: 'Monte o acorde C. Toque corda por corda bem devagar com a palheta: 4ª, 3ª, 2ª, 1ª. Todas as quatro soaram límpidas?',
        tips: 'Arqueie os dedos como se estivesse segurando uma pequena bolinha de tênis de mesa.'
      }
    ]
  },
  {
    day: 3,
    title: 'Posição das Mãos e Postura',
    shortDescription: 'Curvatura dos dedos, polegar guia e ataque perpendicular.',
    goal: 'Eliminar vícios posturais e dores desnecessárias nos tendões da mão esquerda.',
    lessons: [
      {
        id: 'd3_l1',
        title: 'O Polegar Guia Atrás do Braço',
        durationMinutes: 8,
        objective: 'Posicionar o polegar esquerdo no centro da curvatura posterior do braço.',
        content: [
          'O polegar da mão esquerda serve como ponto de apoio e contra-pressão suave, não como pinça de aperto.',
          'Ele deve repousar aproximadamente atrás do dedo médio, na metade de trás do braço do cavaquinho.',
          'Evite colocar o polegar muito para cima tapando a escala ou muito encolhido embaixo.'
        ],
        exercise: 'Pressione o acorde C com o polegar bem posicionado. Note como seus dedos ganham alcance e curvatura natural.',
        tips: 'A força para apertar as cordas vem do peso relaxado do braço, e não de um esmagamento com o polegar.'
      },
      {
        id: 'd3_l2',
        title: 'Ataque Perpendicular: A Ponta dos Dedos',
        durationMinutes: 9,
        objective: 'Garantir que apenas a polpa firme próxima à unha toque a corda.',
        content: [
          'Se o dedo deitar sobre a escala, ele encosta nas cordas adjacentes e mata o som do cavaquinho.',
          'Mantenha as unhas da mão esquerda sempre curtas e bem aparadas para que o dedo consiga atacar a 90° em relação à escala.',
          'Cada junta do dedo deve estar levemente arredondada, sem quebrar a articulação para trás.'
        ],
        exercise: 'Monte o acorde Em [2 0 0 2] (dedo 2 na 4ª corda casa 2, dedo 3 na 1ª corda casa 2). As duas cordas do meio precisam soar livres!',
        tips: 'Confira as marcas temporárias na ponta dos seus dedos após o treino: se estiverem no centro da ponta, sua postura está perfeita.'
      }
    ]
  },
  {
    day: 4,
    title: 'Troca Entre Acordes',
    shortDescription: 'Técnica de dedo pivô, antecipação e fluxo contínuo.',
    goal: 'Transitar entre dois acordes sem pausar o ritmo da mão direita.',
    lessons: [
      {
        id: 'd4_l1',
        title: 'O Conceito de Movimento Econômico',
        durationMinutes: 8,
        objective: 'Mover os dedos a menor distância possível ao mudar de posição.',
        content: [
          'O erro mais comum de quem inicia é afastar toda a mão do braço a 5 centímetros de distância ao trocar de acorde.',
          'Mantenha os dedos flutuando a apenas alguns milímetros da escala.',
          'Pense na forma geométrica do próximo acorde ANTES de soltar o acorde atual.'
        ],
        exercise: 'Pratique a transição de G para C no ar: visualize os dedos caindo juntos na casa certa ao mesmo tempo.',
        tips: 'Não posicione os dedos um por um em sequência; acostume seu cérebro a pousar a formação inteira em bloco.'
      },
      {
        id: 'd4_l2',
        title: 'Dedo Pivô e Cordas de Apoio',
        durationMinutes: 10,
        objective: 'Identificar dedos que permanecem no mesmo lugar ou deslizam na mesma corda.',
        content: [
          'Quando trocamos entre Em [2 0 0 2] e C [2 0 1 2], observe: o dedo 2 na 4ª corda casa 2 NÃO precisa sair do lugar!',
          'Ele funciona como um "pivô" seguro que ancora sua mão, bastando apenas ajustar os outros dedos.',
          'Encontrar pivôs é o segredo dos grandes sambistas para tocarem com agilidade sem olhar para o braço.'
        ],
        exercise: 'Utilize o Treinador de Trocas do app configurado em G e C por 60 segundos. Conte mentalmente quantas trocas você consegue fazer sem travar.',
        tips: 'É melhor fazer 10 trocas lentas e limpas do que 20 trocas atropeladas com cordas trastejando.'
      }
    ]
  },
  {
    day: 5,
    title: 'Ritmo e Batidas de Samba',
    shortDescription: 'Palhetada para baixo/cima, abafado e o compasso 2/4.',
    goal: 'Entender a pulsação do samba tradicional e executar o balanço básico.',
    lessons: [
      {
        id: 'd5_l1',
        title: 'A Divisão do Compasso 2/4',
        durationMinutes: 9,
        objective: 'Compreender os dois tempos do samba: o tempo forte (1) e o tempo fraco (2).',
        content: [
          'O samba e o choro são regidos pelo compasso binário (2/4). O tempo 1 é a marcação do surdo grave, e o tempo 2 responde com agilidade.',
          'No metrônomo do app, você ouvirá o primeiro clique agudo (tempo 1) e o segundo clique suave (tempo 2).',
          'O cavaquinho faz a costura rítmica sincopada entre esses dois polos.'
        ],
        exercise: 'Abra a aba "Tempo" no app, selecione 2/4 e 65 BPM. Bata palma apenas no clique agudo e sinta a respiração do compasso.',
        tips: 'Não acelere o andamento no começo; o balanço do samba nasce da precisão lenta.'
      },
      {
        id: 'd5_l2',
        title: 'A Batida Básica com Abafamento',
        durationMinutes: 12,
        objective: 'Executar o padrão: Baixo - Cima - Abafa - Cima.',
        content: [
          'Movimento 1: Batida para baixo com a palheta abrangendo as 4 cordas.',
          'Movimento 2: Batida rápida para cima puxando as cordas agudas.',
          'Movimento 3: Toque para baixo encostando de leve a lateral da palma direita nas cordas para produzir o estalo percussivo ("chick").',
          'Movimento 4: Retorno rápido para cima voltando ao início do ciclo.'
        ],
        exercise: 'Execute esse padrão com a mão esquerda apenas repousando sobre as cordas soltas (som percussivo mudo) durante 2 minutos contínuos.',
        tips: 'O punho direito deve agir como uma mola solta, com o antebraço estável.'
      }
    ]
  },
  {
    day: 6,
    title: 'Progressões Harmônicas Simples',
    shortDescription: 'O famoso "Quadrado" e cadências consagradas do samba.',
    goal: 'Tocar uma sequência completa de 4 acordes em ciclo contínuo.',
    lessons: [
      {
        id: 'd6_l1',
        title: 'O Quadrado de Sol Maior (G - Em - Am - D7)',
        durationMinutes: 12,
        objective: 'Dominar a progressão I - VI - II - V mais tocada nas rodas de samba.',
        content: [
          'Essa sequência forma a base de centenas de sambas clássicos: G [0 0 0 0] -> Em [2 0 0 2] -> Am [2 2 1 2] -> D7 [0 2 1 4].',
          'Cada acorde dura 2 tempos (1 compasso em 2/4).',
          'Perceba a viagem tonal: estabilidade (G) -> afeto menor (Em) -> preparação (Am) -> tensão dominante (D7) -> volta para a casa (G).'
        ],
        exercise: 'Toque 2 batidas para cada acorde em sequência contínua por 4 voltas seguidas sem interrupções.',
        tips: 'Se errar um acorde no meio, não pare a mão direita: continue o ritmo e monte o acorde seguinte na contagem certa!'
      },
      {
        id: 'd6_l2',
        title: 'A Cadência C - Am - Dm - G7',
        durationMinutes: 11,
        objective: 'Explorar a mesma relação harmônica agora no tom de Dó Maior.',
        content: [
          'Dó Maior (C) é o outro tom preferido dos iniciantes.',
          'A sequência: C [2 0 1 2] -> Am [2 2 1 2] -> Dm [0 2 3 3] -> G7 [0 0 0 3].',
          'Note que na transição de C para Am, você só precisa acrescentar o dedo 2 na 3ª corda casa 2!'
        ],
        exercise: 'Pratique a transição específica de C para Am por 1 minuto, aproveitando o dedo indicador já fixado.',
        tips: 'Preste atenção no conforto da mão esquerda: se sentir cansaço, alongue os punhos por 30 segundos.'
      }
    ]
  },
  {
    day: 7,
    title: 'Prática Final e Consolidação',
    shortDescription: 'Integração completa: ritmo, acordes, troca e autoavaliação.',
    goal: 'Tocar com confiança o seu primeiro ciclo completo de samba mantendo o tempo constante.',
    lessons: [
      {
        id: 'd7_l1',
        title: 'Sua Primeira Roda Virtual',
        durationMinutes: 15,
        objective: 'Ligar o metrônomo a 70 BPM e executar o Quadrado de Sol Maior por 3 minutos ininterruptos.',
        content: [
          'Hoje você une todos os pilares construídos nos últimos 6 dias: afinação correta, palhetada flexível, postura sem tensão e trocas memorizadas.',
          'Coloque o metrônomo em 2/4 a 70 BPM.',
          'Toque o ciclo G -> Em -> Am -> D7 sem parar. Feche os olhos em alguns momentos e escute a afinação do conjunto.'
        ],
        exercise: 'Grave um áudio de 1 minuto no seu gravador de celular para escutar sua própria palhetada e verificar se o ritmo oscilou.',
        tips: 'Ouvir sua própria gravação é a ferramenta mais transformadora para qualquer músico.'
      },
      {
        id: 'd7_l2',
        title: 'Autoavaliação Honesta e Próximos Passos',
        durationMinutes: 10,
        objective: 'Reconhecer seu avanço real e traçar a rotina sustentável para as próximas semanas.',
        content: [
          'Ninguém vira virtuoso em 7 dias, e desconfie de quem prometer isso.',
          'O verdadeiro segredo do cavaquinho é a constância: 15 a 20 minutos todos os dias valem muito mais do que 3 horas apenas no sábado.',
          'Agora você já conhece os 12 acordes essenciais, domina a postura correta e tem as ferramentas do app (metrônomo, treinador e PDFs) para continuar evoluindo no seu tempo.'
        ],
        exercise: 'Acesse a aba "Evolução" e confira suas lições concluídas e o histórico de trocas de acordes.',
        tips: 'Comemore o seu primeiro passo: você já sabe tirar som de verdade no cavaquinho brasileiro!'
      }
    ]
  }
];

export const ALL_LESSONS = STUDY_PLAN.flatMap(day => day.lessons);
export const LESSON_BY_ID = new Map(ALL_LESSONS.map(l => [l.id, l]));
