import React, { useState, useEffect, useRef } from 'react';
import { MetronomeEngine } from '../utils/audio';
import {
  Play,
  Square,
  Plus,
  Minus,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';

export const MetronomeView: React.FC = () => {
  const [bpm, setBpm] = useState<number>(80);
  const [timeSignature, setTimeSignature] = useState<number>(2); // 2/4 is classic samba default
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeBeat, setActiveBeat] = useState<number>(-1);

  // Tap tempo state
  const tapTimesRef = useRef<number[]>([]);
  const engineRef = useRef<MetronomeEngine | null>(null);

  useEffect(() => {
    const engine = new MetronomeEngine(bpm, timeSignature);
    engine.setOnBeat((beat) => {
      setActiveBeat(beat);
    });
    engineRef.current = engine;

    return () => {
      engine.stop();
    };
  }, []);

  // Update engine properties when state changes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setBpm(bpm);
    }
  }, [bpm]);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setTimeSignature(timeSignature);
      setActiveBeat(-1);
    }
  }, [timeSignature]);

  const toggleMetronome = () => {
    if (!engineRef.current) return;
    if (isPlaying) {
      engineRef.current.stop();
      setIsPlaying(false);
      setActiveBeat(-1);
    } else {
      engineRef.current.start();
      setIsPlaying(true);
    }
  };

  const adjustBpm = (delta: number) => {
    setBpm((prev) => Math.min(220, Math.max(40, prev + delta)));
  };

  const handleTapTempo = () => {
    const now = Date.now();
    const taps = tapTimesRef.current.filter((t) => now - t < 3000);
    taps.push(now);
    tapTimesRef.current = taps;

    if (taps.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 220) {
        setBpm(calculatedBpm);
      }
    }
  };

  // Tempo name descriptor
  const getTempoLabel = (val: number): string => {
    if (val < 65) return 'Muito Lento (Estudo Inicial)';
    if (val < 85) return 'Andamento Médio (Prática de Trocas)';
    if (val < 110) return 'Samba de Roda / Partido Alto';
    if (val < 140) return 'Samba Tradicional';
    if (val < 180) return 'Samba Rápido / Choro';
    return 'Muito Rápido (Avançado)';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider text-[#10D97E]">
          <Clock className="w-3.5 h-3.5" />
          <span>Controle Preciso de Pulso</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Metrônomo do Sambista (40–220 BPM)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Agendamento de alta precisão via Web Audio API (lookahead audio engine).
          A 1ª batida tem clique agudo e acentuado para marcar a cabeça do compasso.
        </p>
      </div>

      {/* Main Metronome Console */}
      <div className="bg-[#0F1116] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-center relative overflow-hidden">
        {/* Visual Pulse Wave Glow */}
        {isPlaying && (
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-150 ${
              activeBeat === 0
                ? 'bg-[#10D97E]/10 opacity-100'
                : 'bg-white/5 opacity-50'
            }`}
          />
        )}

        {/* Time Signature Buttons: 2/4, 3/4, 4/4 */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Fórmula de Compasso
          </span>
          <div className="flex items-center bg-[#16191F] p-1 rounded-2xl border border-white/10">
            {[
              { val: 2, label: '2/4 Samba & Choro' },
              { val: 3, label: '3/4 Valsa' },
              { val: 4, label: '4/4 Padrão' },
            ].map((ts) => (
              <button
                key={ts.val}
                onClick={() => setTimeSignature(ts.val)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  timeSignature === ts.val
                    ? 'bg-[#10D97E] text-[#08090B] shadow-md shadow-[#10D97E]/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ts.label}
              </button>
            ))}
          </div>
        </div>

        {/* Synchronized Beat Animated Dots */}
        <div className="relative z-10 py-4 flex items-center justify-center gap-4 sm:gap-6">
          {Array.from({ length: timeSignature }).map((_, beatIdx) => {
            const isActive = isPlaying && activeBeat === beatIdx;
            const isFirstBeat = beatIdx === 0;

            return (
              <div key={beatIdx} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-lg sm:text-2xl transition-all duration-75 ${
                    isActive
                      ? isFirstBeat
                        ? 'bg-[#10D97E] text-[#08090B] scale-110 shadow-xl shadow-[#10D97E]/40 border-2 border-[#10D97E]'
                        : 'bg-[#D4AF37] text-[#08090B] scale-105 shadow-lg shadow-[#D4AF37]/30 border-2 border-[#D4AF37]'
                      : 'bg-[#16191F] border border-white/10 text-slate-500'
                  }`}
                >
                  {beatIdx + 1}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {isFirstBeat ? 'Forte (1200Hz)' : 'Fraco (800Hz)'}
                </span>
              </div>
            );
          })}
        </div>

        {/* BPM Display & Stepper */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            {/* -5 and -1 buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => adjustBpm(-5)}
                className="w-10 h-10 rounded-xl bg-[#16191F] hover:bg-[#1E232D] text-slate-300 font-mono font-bold text-xs flex items-center justify-center border border-white/5 active:scale-95"
                title="-5 BPM"
              >
                -5
              </button>
              <button
                onClick={() => adjustBpm(-1)}
                className="w-10 h-10 rounded-xl bg-[#16191F] hover:bg-[#1E232D] text-slate-200 flex items-center justify-center border border-white/5 active:scale-95"
                title="-1 BPM"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Huge BPM Readout */}
            <div className="px-6 py-2">
              <div className="text-6xl sm:text-7xl font-black font-mono text-white tracking-tight">
                {bpm}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block -mt-1">
                BPM
              </span>
            </div>

            {/* +1 and +5 buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => adjustBpm(1)}
                className="w-10 h-10 rounded-xl bg-[#16191F] hover:bg-[#1E232D] text-slate-200 flex items-center justify-center border border-white/5 active:scale-95"
                title="+1 BPM"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => adjustBpm(5)}
                className="w-10 h-10 rounded-xl bg-[#16191F] hover:bg-[#1E232D] text-slate-300 font-mono font-bold text-xs flex items-center justify-center border border-white/5 active:scale-95"
                title="+5 BPM"
              >
                +5
              </button>
            </div>
          </div>

          <p className="text-xs font-semibold text-[#10D97E]">
            {getTempoLabel(bpm)}
          </p>

          {/* Precision Slider */}
          <div className="max-w-md mx-auto px-4">
            <input
              type="range"
              min="40"
              max="220"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-[#10D97E] bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-300 font-mono mt-1 px-1">
              <span>40 (Lento)</span>
              <span>130 (Médio)</span>
              <span>220 (Rápido)</span>
            </div>
          </div>
        </div>

        {/* Play/Stop and Tap Tempo Bar */}
        <div className="relative z-10 pt-4 border-t border-white/5 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={toggleMetronome}
            className={`px-8 py-4 rounded-2xl font-black text-base flex items-center gap-3 transition-all active:scale-95 shadow-xl ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                : 'bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] shadow-[#10D97E]/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-5 h-5 fill-current" />
                <span>Parar Metrônomo</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Iniciar Pulsação</span>
              </>
            )}
          </button>

          <button
            onClick={handleTapTempo}
            className="px-5 py-4 rounded-2xl bg-[#16191F] hover:bg-[#1E232D] text-slate-200 border border-white/10 text-xs font-bold transition-all active:scale-95"
          >
            Tap Tempo (Bata o ritmo)
          </button>
        </div>

        {/* Quick Presets for Samba and Beginner Study */}
        <div className="relative z-10 pt-4 flex flex-wrap justify-center items-center gap-2">
          <span className="text-xs text-slate-300">Andamentos recomendados:</span>
          {[
            { label: '60 BPM (Início)', bpm: 60 },
            { label: '80 BPM (Treino)', bpm: 80 },
            { label: '100 BPM (Samba)', bpm: 100 },
            { label: '120 BPM (Roda)', bpm: 120 },
            { label: '140 BPM (Choro)', bpm: 140 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => setBpm(preset.bpm)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors ${
                bpm === preset.bpm
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-[#111317] border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Practical Guide on 2/4 in Brazilian Music */}
      <div className="bg-[#0F1116] border border-white/5 rounded-2xl p-5 sm:p-6 flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
        <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-200 block">
            Por que o compasso 2/4 é a alma do cavaquinho?
          </strong>
          <p>
            No samba brasileiro, o compasso binário (2/4) replica a conversa entre os instrumentos de percussão:
            o primeiro tempo é a marcação profunda do surdo (clique agudo/acento no app), enquanto o segundo
            tempo é a resposta dinâmica. O cavaquinho flutua com a palhetada sincopada em cima dessa pulsação.
          </p>
        </div>
      </div>
    </div>
  );
};
