import React, { useState, useEffect } from 'react';
import { CHORD_BY_ID } from '../data/chords';
import { ChordDiagram } from '../components/ChordDiagram';
import { playChord } from '../utils/audio';
import {
  Sparkles,
  Volume2,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  Home,
  Check
} from 'lucide-react';

interface DemoViewProps {
  onGoToFullApp: () => void;
  onGoToLogin: () => void;
  onGoToHome: () => void;
}

export const DemoView: React.FC<DemoViewProps> = ({
  onGoToFullApp,
  onGoToLogin,
  onGoToHome,
}) => {
  const chordG = CHORD_BY_ID.get('G')!;
  const chordC = CHORD_BY_ID.get('C')!;

  const [selectedChordId, setSelectedChordId] = useState<'G' | 'C'>('G');
  const activeChord = selectedChordId === 'G' ? chordG : chordC;

  // 30-second trainer state
  const [trainerState, setTrainerState] = useState<'idle' | 'running' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // 0 = G, 1 = C
  const [reportedSwitches, setReportedSwitches] = useState<number | ''>('');
  const [hasSavedFeedback, setHasSavedFeedback] = useState(false);

  // Timer loop for demo trainer
  useEffect(() => {
    let interval: number | undefined;
    if (trainerState === 'running') {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTrainerState('finished');
            return 0;
          }
          // Switch chord every 2 seconds
          if ((30 - (prev - 1)) % 2 === 0) {
            setCurrentStepIndex((curr) => (curr === 0 ? 1 : 0));
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [trainerState]);

  const handleStartTrainer = () => {
    setTimeLeft(30);
    setCurrentStepIndex(0);
    setTrainerState('running');
    setHasSavedFeedback(false);
    setReportedSwitches('');
  };

  const handleResetTrainer = () => {
    setTrainerState('idle');
    setTimeLeft(30);
    setCurrentStepIndex(0);
    setReportedSwitches('');
    setHasSavedFeedback(false);
  };

  const currentTrainerChord = currentStepIndex === 0 ? chordG : chordC;
  const nextTrainerChord = currentStepIndex === 0 ? chordC : chordG;

  return (
    <div className="min-h-screen bg-[#08090B] text-slate-100 flex flex-col justify-between selection:bg-[#10D97E]/30 selection:text-[#10D97E]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0C0E12]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onGoToHome}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">Voltar ao início</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-[#D4AF37]/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Modo Demonstração
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToFullApp}
              className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#10D97E] text-[#08090B] hover:bg-[#0eb86b] transition-all"
            >
              Acessar Área Completa
            </button>
          </div>
        </div>
      </header>

      {/* Main Demo Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        {/* Banner Informative */}
        <div className="p-4 rounded-2xl bg-[#111317] border border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-white">
                Demonstração Gratuita Aberta
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Você pode testar a síntese de áudio com os acordes G e C, e experimentar um treino rápido de 30 segundos.
              </p>
            </div>
          </div>
          <button
            onClick={onGoToFullApp}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Liberar todos os 12 acordes e 7 dias</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Section 1: Acordes da Demo (G e C) */}
        <div className="bg-[#0F1116] border border-white/5 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#10D97E]">
                  Passo 1 • Conhecendo os Acordes
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Diagrama Interativo: Sol Maior (G) e Dó Maior (C)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Afinação Ré-Sol-Si-Ré. Toque no botão para ouvir o acorde sintetizado ou clique em cada corda.
              </p>
            </div>

            {/* Chord Switcher Tabs */}
            <div className="flex items-center bg-[#16191F] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setSelectedChordId('G')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedChordId === 'G'
                    ? 'bg-[#10D97E] text-[#08090B] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                G (Sol)
              </button>
              <button
                onClick={() => setSelectedChordId('C')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedChordId === 'C'
                    ? 'bg-[#10D97E] text-[#08090B] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                C (Dó)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Chord Diagram Card */}
            <div className="bg-[#111317] border border-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg">
              <div className="flex items-center justify-between w-full mb-3">
                <div>
                  <span className="text-2xl font-black text-white">{activeChord.name}</span>
                  <span className="ml-2 text-xs text-slate-400">({activeChord.fullName})</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Casas: [{activeChord.frets.join(', ')}]
                </span>
              </div>

              <ChordDiagram chord={activeChord} size="md" />

              <div className="mt-5 w-full flex gap-3">
                <button
                  onClick={() => playChord(activeChord.frequencies)}
                  className="flex-1 py-2.5 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-[#10D97E]/20"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Ouvir {activeChord.name} (Sintetizado)</span>
                </button>
              </div>
            </div>

            {/* Chord Details and Insight */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#111317] border border-white/5">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Digitação Recomendada
                </h4>
                <p className="text-sm text-slate-300">
                  Dedos nas cordas [4ª, 3ª, 2ª, 1ª]:{' '}
                  <span className="font-mono text-[#10D97E] font-bold">
                    [{activeChord.fingers.join(', ')}]
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedChordId === 'G'
                    ? '0 = corda solta. Todas as cordas vibram livres, sem precisar apertar o braço.'
                    : 'Dedo 1 na 2ª corda casa 1, dedo 2 na 4ª corda casa 2, dedo 3 na 1ª corda casa 2.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111317] border border-white/5">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Dica de Postura
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeChord.tip}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111317] border border-[#10D97E]/20">
                <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Próximo Desafio
                </h4>
                <p className="text-xs text-slate-300">
                  Experimente o treino de 30 segundos abaixo para alternar entre G e C sem travar o ritmo!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Treinador de 30 Segundos */}
        <div className="bg-[#0F1116] border border-white/5 rounded-2xl p-5 sm:p-6">
          <div className="mb-6 pb-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Passo 2 • Prática Rítmica
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Treinador Rápido de 30 Segundos (G ↔ C)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                O app alternará o acorde a cada 2 segundos. Seu objetivo é mudar os dedos antes da troca!
              </p>
            </div>
            {trainerState === 'running' && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-[#10D97E] text-xs font-mono font-bold animate-pulse self-start sm:self-auto">
                Treino em Andamento
              </span>
            )}
          </div>

          {trainerState === 'idle' && (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-[#10D97E]/30 text-[#10D97E] flex items-center justify-center mx-auto text-2xl font-bold">
                30s
              </div>
              <h4 className="text-lg font-bold text-white">Preparado para o teste de trocas?</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Posicione o cavaquinho, relaxe o punho e clique no botão para iniciar a contagem.
              </p>
              <button
                onClick={handleStartTrainer}
                className="px-6 py-3 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-[#10D97E]/20 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Começar Treino de 30s</span>
              </button>
            </div>
          )}

          {trainerState === 'running' && (
            <div className="space-y-6">
              {/* Progress Ring and Countdown */}
              <div className="flex items-center justify-center gap-6">
                <div className="relative flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#222630"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#10D97E"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - timeLeft / 30)}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-black font-mono text-white">{timeLeft}</span>
                    <span className="text-[10px] text-slate-400 block -mt-1">seg</span>
                  </div>
                </div>
              </div>

              {/* Big Chord Displays: Current and Next */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {/* Agora */}
                <div className="p-5 rounded-2xl bg-[#10D97E]/10 border-2 border-[#10D97E] text-center shadow-lg shadow-[#10D97E]/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Toque Agora
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white">
                    {currentTrainerChord.name}
                  </div>
                  <span className="text-xs text-slate-300 mt-1 block">
                    {currentTrainerChord.fullName}
                  </span>
                </div>

                {/* Próximo */}
                <div className="p-5 rounded-2xl bg-[#16191F] border border-white/10 text-center opacity-70">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Próximo Acorde
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-slate-400">
                    {nextTrainerChord.name}
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    {nextTrainerChord.fullName}
                  </span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleResetTrainer}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Interromper</span>
                </button>
              </div>
            </div>
          )}

          {trainerState === 'finished' && (
            <div className="text-center py-6 space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-[#10D97E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Treino de 30s Concluído!</h4>
              <p className="text-xs text-slate-400">
                Quantas trocas limpas você conseguiu executar sem interromper o ritmo?
                (O app registra o valor informado por você com honestidade).
              </p>

              {!hasSavedFeedback ? (
                <div className="space-y-3 bg-[#111317] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Ex: 12"
                      value={reportedSwitches}
                      onChange={(e) => setReportedSwitches(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-24 px-3 py-2 rounded-lg bg-[#16191F] border border-white/10 text-center font-mono text-lg text-white focus:outline-none focus:border-[#10D97E]"
                    />
                    <span className="text-xs text-slate-300">trocas</span>
                  </div>

                  <button
                    onClick={() => setHasSavedFeedback(true)}
                    disabled={reportedSwitches === ''}
                    className="w-full py-2 rounded-lg bg-[#10D97E] hover:bg-[#0eb86b] disabled:opacity-50 text-[#08090B] font-bold text-xs transition-colors"
                  >
                    Registrar Resultado
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>
                    Registrado! Taxa estimada de {(Number(reportedSwitches) * 2)} trocas por minuto.
                  </span>
                </div>
              )}

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleStartTrainer}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-medium flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repetir Treino</span>
                </button>
                <button
                  onClick={onGoToFullApp}
                  className="px-4 py-2 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] text-xs text-[#08090B] font-bold flex items-center gap-1.5"
                >
                  <span>Ir para Área do Aluno</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Prévia dos outros módulos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#0F1116] border border-white/5 opacity-80">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Recurso do App
            </span>
            <h4 className="text-sm font-semibold text-white">Metrônomo 2/4</h4>
            <p className="text-xs text-slate-400 mt-1">
              Com acento agudo no 1º tempo, ideal para o balanço do samba e do choro.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1116] border border-white/5 opacity-80">
            <span className="text-[10px] font-bold text-[#10D97E] uppercase tracking-wider block mb-1">
              Recurso do App
            </span>
            <h4 className="text-sm font-semibold text-white">Jornada 7 Dias</h4>
            <p className="text-xs text-slate-400 mt-1">
              Aulas detalhadas de postura, digitação, palhetada e cadências harmônicas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1116] border border-white/5 opacity-80">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Recurso do App
            </span>
            <h4 className="text-sm font-semibold text-white">Downloads do Kit</h4>
            <p className="text-xs text-slate-400 mt-1">
              E-book de 14 páginas, dicionário com 10 acordes e planner semanal em PDF.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-4 pb-8">
          <button
            onClick={onGoToFullApp}
            className="px-8 py-4 rounded-2xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-extrabold text-base inline-flex items-center gap-2.5 shadow-xl shadow-[#10D97E]/25 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Acessar Todos os Recursos do Cavaquinho Fácil</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};
