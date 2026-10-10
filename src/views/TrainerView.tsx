import React, { useState, useEffect, useRef } from 'react';
import { ChordData, TrainingRecord } from '../types';
import { CHORDS_LIST, CHORD_BY_ID } from '../data/chords';
import { ChordDiagram } from '../components/ChordDiagram';
import { playPluck } from '../utils/audio';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

interface TrainerViewProps {
  initialChordA?: string;
  initialChordB?: string;
  onSaveRecord: (record: Omit<TrainingRecord, 'id' | 'date'>) => void;
  recentRecords: TrainingRecord[];
}

export const TrainerView: React.FC<TrainerViewProps> = ({
  initialChordA = 'G',
  initialChordB = 'C',
  onSaveRecord,
  recentRecords,
}) => {
  const [chordAId, setChordAId] = useState<string>(initialChordA);
  const [chordBId, setChordBId] = useState<string>(
    initialChordB !== initialChordA ? initialChordB : initialChordA === 'G' ? 'C' : 'G'
  );
  const [durationSeconds, setDurationSeconds] = useState<number>(60);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Trainer state: 'config' | 'running' | 'completed'
  const [state, setState] = useState<'config' | 'running' | 'completed'>('config');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [currentStep, setCurrentStep] = useState<0 | 1>(0); // 0 = Chord A, 1 = Chord B
  const [reportedSwitches, setReportedSwitches] = useState<number | ''>('');
  const [recordSaved, setRecordSaved] = useState<boolean>(false);

  const chordA: ChordData = CHORD_BY_ID.get(chordAId) || CHORDS_LIST[0];
  const chordB: ChordData = CHORD_BY_ID.get(chordBId) || CHORDS_LIST[2];

  // Ref for timer
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (state === 'running') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setState('completed');
            if (soundEnabled) {
              playPluck(587.33, 0.4, 0.8); // High Ré chime on completion
            }
            return 0;
          }

          const elapsed = durationSeconds - (prev - 1);
          // Switch every 2 seconds
          if (elapsed % 2 === 0) {
            setCurrentStep((curr) => {
              const next = curr === 0 ? 1 : 0;
              if (soundEnabled) {
                // Soft pluck tick
                playPluck(next === 0 ? 392.0 : 493.88, 0.2, 0.4);
              }
              return next;
            });
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state, durationSeconds, soundEnabled]);

  const handleStart = () => {
    setTimeLeft(durationSeconds);
    setCurrentStep(0);
    setReportedSwitches('');
    setRecordSaved(false);
    setState('running');
    if (soundEnabled) {
      playPluck(392.0, 0.3, 0.5);
    }
  };

  const handleStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState('config');
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportedSwitches === '') return;

    const count = Number(reportedSwitches);
    const spm = Math.round((count / durationSeconds) * 60 * 10) / 10;

    onSaveRecord({
      chordA: chordA.name,
      chordB: chordB.name,
      durationSeconds,
      switchesReported: count,
      switchesPerMinute: spm,
    });

    setRecordSaved(true);
  };

  const activeChord = currentStep === 0 ? chordA : chordB;
  const nextChord = currentStep === 0 ? chordB : chordA;

  // Preset durations
  const presetDurations = [30, 60, 90, 120, 180, 300];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider text-[#10D97E]">
          <Clock className="w-3.5 h-3.5" />
          <span>Treinador de Agilidade</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Treinador de Trocas de Acordes
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Alterne entre dois acordes a cada 2 segundos. Desenvolva o movimento econômico dos dedos
          sem interromper a pulsação da mão direita.
        </p>
      </div>

      {/* VIEW: CONFIGURATION */}
      {state === 'config' && (
        <div className="space-y-6">
          <div className="bg-[#0F1116] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
            {/* Step 1: Select Chords */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                1. Escolha os 2 Acordes para Treinar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Chord A Selector */}
                <div className="p-4 rounded-2xl bg-[#111317] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400">Primeiro Acorde (A)</span>
                    <span className="text-xs text-slate-400">Dedos: [{chordA.fingers.join(',')}]</span>
                  </div>
                  <select
                    value={chordAId}
                    onChange={(e) => setChordAId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#16191F] border border-white/10 text-white font-bold text-base focus:outline-none focus:border-[#10D97E]"
                  >
                    {CHORDS_LIST.map((chord) => (
                      <option key={`a-${chord.id}`} value={chord.id} disabled={chord.id === chordBId}>
                        {chord.name} — {chord.fullName} ({chord.category})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-400 leading-relaxed">{chordA.tip}</p>
                </div>

                {/* Chord B Selector */}
                <div className="p-4 rounded-2xl bg-[#111317] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#D4AF37]">Segundo Acorde (B)</span>
                    <span className="text-xs text-slate-400">Dedos: [{chordB.fingers.join(',')}]</span>
                  </div>
                  <select
                    value={chordBId}
                    onChange={(e) => setChordBId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#16191F] border border-white/10 text-white font-bold text-base focus:outline-none focus:border-[#10D97E]"
                  >
                    {CHORDS_LIST.map((chord) => (
                      <option key={`b-${chord.id}`} value={chord.id} disabled={chord.id === chordAId}>
                        {chord.name} — {chord.fullName} ({chord.category})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-400 leading-relaxed">{chordB.tip}</p>
                </div>
              </div>

              {/* Recommended Pairs for Beginners */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-300">Duplas clássicas:</span>
                {[
                  { a: 'G', b: 'C', label: 'G ↔ C (Essencial)' },
                  { a: 'G', b: 'G7', label: 'G ↔ G7 (1 dedo)' },
                  { a: 'C', b: 'D7', label: 'C ↔ D7 (Quadrado)' },
                  { a: 'Em', b: 'Am', label: 'Em ↔ Am (Menores)' },
                  { a: 'Am', b: 'D7', label: 'Am ↔ D7 (Cadência)' },
                ].map((pair) => (
                  <button
                    key={pair.label}
                    onClick={() => {
                      setChordAId(pair.a);
                      setChordBId(pair.b);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#16191F] hover:bg-white/10 text-[11px] text-slate-300 border border-white/5 transition-colors"
                  >
                    {pair.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Duration Selector (30s - 300s) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Duração do Treino (30 a 300 segundos)
                </h2>
                <span className="font-mono text-sm font-bold text-[#10D97E]">
                  {durationSeconds} segundos ({Math.floor(durationSeconds / 60)}m {durationSeconds % 60}s)
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {presetDurations.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setDurationSeconds(sec)}
                    className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
                      durationSeconds === sec
                        ? 'bg-[#10D97E] text-[#08090B] shadow-sm'
                        : 'bg-[#16191F] text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="30"
                max="300"
                step="10"
                value={durationSeconds}
                onChange={(e) => setDurationSeconds(Number(e.target.value))}
                className="w-full accent-[#10D97E] bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Audio Toggle & Start Action */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-[#111317] border border-white/5"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#10D97E]" />
                    <span>Sinal sonoro a cada 2s ativado</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-500" />
                    <span>Sinal sonoro mudo</span>
                  </>
                )}
              </button>

              <button
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-[#10D97E]/20 transition-all hover:scale-[1.01] active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Iniciar Treino de {durationSeconds}s</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: RUNNING ACTIVE TRAINING */}
      {state === 'running' && (
        <div className="space-y-6">
          <div className="bg-[#0F1116] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Countdown Ring */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="#1E232D"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="#10D97E"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 * (1 - timeLeft / durationSeconds)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-black font-mono text-white">{timeLeft}</span>
                  <span className="text-xs text-slate-400 block -mt-1">seg</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Alternando a cada 2 segundos • Troque a mão esquerda
              </p>
            </div>

            {/* Alternating Chords Stage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-3xl mx-auto">
              {/* CURRENT ACTIVE CHORD */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#10D97E]/15 to-[#111317] border-2 border-[#10D97E] text-center shadow-2xl shadow-[#10D97E]/15 flex flex-col justify-between items-center animate-in zoom-in-95">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#10D97E] px-3 py-1 rounded-full bg-[#10D97E]/20 mb-2">
                  TOQUE AGORA
                </span>

                <div className="my-2">
                  <div className="text-6xl sm:text-7xl font-black text-white tracking-tight">
                    {activeChord.name}
                  </div>
                  <p className="text-sm font-semibold text-slate-300 mt-1">
                    {activeChord.fullName}
                  </p>
                </div>

                <div className="w-full my-4 py-2 bg-[#08090B]/60 rounded-xl border border-white/5 flex items-center justify-around text-xs">
                  <div>
                    <span className="text-[10px] text-slate-300 block">Casas</span>
                    <span className="font-mono font-bold text-emerald-400">
                      [{activeChord.frets.join(', ')}]
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 block">Dedos</span>
                    <span className="font-mono font-bold text-[#D4AF37]">
                      [{activeChord.fingers.join(', ')}]
                    </span>
                  </div>
                </div>

                {/* Small Chord Diagram */}
                <div className="scale-90 my-[-10px]">
                  <ChordDiagram chord={activeChord} size="sm" showStringLabels={false} interactiveStrings={false} />
                </div>
              </div>

              {/* NEXT CHORD PREPARATION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111317] border border-white/5 text-center flex flex-col justify-between items-center opacity-70">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 px-3 py-1 rounded-full bg-white/5 mb-2">
                  PRÓXIMO ACORDE
                </span>

                <div className="my-2">
                  <div className="text-5xl sm:text-6xl font-black text-slate-400 tracking-tight">
                    {nextChord.name}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{nextChord.fullName}</p>
                </div>

                <div className="w-full my-4 py-2 bg-[#08090B]/40 rounded-xl border border-white/5 flex items-center justify-around text-xs">
                  <div>
                    <span className="text-[10px] text-slate-300 block">Casas</span>
                    <span className="font-mono text-slate-300">
                      [{nextChord.frets.join(', ')}]
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 block">Dedos</span>
                    <span className="font-mono text-slate-300">
                      [{nextChord.fingers.join(', ')}]
                    </span>
                  </div>
                </div>

                {/* Small Chord Diagram */}
                <div className="scale-90 my-[-10px] grayscale opacity-60">
                  <ChordDiagram chord={nextChord} size="sm" showStringLabels={false} interactiveStrings={false} />
                </div>
              </div>
            </div>

            {/* Abort button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleStop}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Interromper Treino</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: COMPLETED SESSION & HONEST LOGGING */}
      {state === 'completed' && (
        <div className="bg-[#0F1116] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-[#10D97E] flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">Treino Finalizado com Sucesso!</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Você praticou a transição entre <strong>{chordA.name}</strong> e <strong>{chordB.name}</strong> durante {durationSeconds} segundos.
            </p>
          </div>

          {/* Honest self-reporting form */}
          {!recordSaved ? (
            <form onSubmit={handleSaveResult} className="space-y-4 bg-[#111317] p-5 rounded-2xl border border-white/5 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="switches-count">
                  Quantas trocas limpas você conseguiu executar?
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="switches-count"
                    type="number"
                    min="0"
                    max="500"
                    placeholder="Ex: 24"
                    value={reportedSwitches}
                    onChange={(e) =>
                      setReportedSwitches(e.target.value === '' ? '' : Number(e.target.value))
                    }
                    className="w-28 px-3.5 py-2.5 rounded-xl bg-[#16191F] border border-white/10 text-white font-mono text-lg font-bold focus:outline-none focus:border-[#10D97E]"
                    required
                  />
                  <span className="text-xs text-slate-400">
                    trocas completas de acorde
                  </span>
                </div>
              </div>

              {reportedSwitches !== '' && (
                <div className="p-3 rounded-xl bg-[#16191F] border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                  <span>Velocidade calculada:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">
                    {Math.round((Number(reportedSwitches) / durationSeconds) * 60 * 10) / 10} trocas/min
                  </span>
                </div>
              )}

              {/* Explicit Honest Audio Disclaimer as required by prompt */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-[#D4AF37]/20 text-[11px] text-amber-200/90 flex items-start gap-2">
                <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <p>
                  <strong>Registro honesto do aluno:</strong> Este valor é informado por você para autoavaliação
                  e histórico pessoal. O app não utiliza avaliação automática por microfone nem pontuações fictícias.
                </p>
              </div>

              <button
                type="submit"
                disabled={reportedSwitches === ''}
                className="w-full py-3 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] disabled:opacity-50 text-[#08090B] font-bold text-sm transition-all shadow-md shadow-[#10D97E]/20"
              >
                Salvar no Meu Histórico
              </button>
            </form>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm space-y-1">
              <p className="font-bold">Resultado salvo com sucesso no navegador!</p>
              <p className="text-xs text-emerald-400/80">
                Você registrou {reportedSwitches} trocas em {durationSeconds}s (
                {Math.round((Number(reportedSwitches) / durationSeconds) * 60 * 10) / 10} por minuto).
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={handleStart}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-semibold flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir este Treino</span>
            </button>
            <button
              onClick={() => setState('config')}
              className="px-5 py-2.5 rounded-xl bg-[#16191F] hover:bg-white/10 text-xs text-slate-300 font-semibold"
            >
              Escolher Outros Acordes
            </button>
          </div>
        </div>
      )}

      {/* Recent History Table */}
      {recentRecords.length > 0 && (
        <div className="bg-[#0F1116] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <TrendingUp className="w-4 h-4 text-[#10D97E]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Seus Últimos Treinos Salvos
            </h2>
          </div>

          <div className="space-y-2">
            {recentRecords.slice(0, 5).map((rec) => (
              <div
                key={rec.id}
                className="p-3 rounded-xl bg-[#111317] border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-[#16191F]">
                    {rec.chordA} ↔ {rec.chordB}
                  </span>
                  <span className="text-slate-400">{rec.durationSeconds}s</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-400 font-bold">
                    {rec.switchesReported} trocas ({rec.switchesPerMinute}/min)
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {new Date(rec.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
