import React, { useState } from 'react';
import { ChordData } from '../types';
import { CHORDS_LIST } from '../data/chords';
import { ChordDiagram } from '../components/ChordDiagram';
import { playChord, playPluck } from '../utils/audio';
import { Volume2, Repeat, Sparkles, HelpCircle } from 'lucide-react';

interface ChordsViewProps {
  onStartTrainingWithChord: (chordId: string) => void;
  initialChordId?: string;
}

export const ChordsView: React.FC<ChordsViewProps> = ({
  onStartTrainingWithChord,
  initialChordId = 'G',
}) => {
  const [selectedChordId, setSelectedChordId] = useState<string>(initialChordId);
  const [filterCategory, setFilterCategory] = useState<'todos' | 'maior' | 'menor' | 'setima'>('todos');

  const selectedChord = CHORDS_LIST.find((c) => c.id === selectedChordId) || CHORDS_LIST[0];

  const filteredChords = CHORDS_LIST.filter((chord) => {
    if (filterCategory === 'todos') return true;
    return chord.category === filterCategory;
  });

  const handlePlayChord = () => {
    playChord(selectedChord.frequencies);
  };

  const handlePlayString = (idx: number) => {
    playPluck(selectedChord.frequencies[idx], 2.0, 0.9);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Title & Description */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider text-[#10D97E]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dicionário Prático de Acordes</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          12 Acordes Essenciais para Cavaquinho
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Afinação brasileira tradicional Ré–Sol–Si–Ré (cordas 4ª a 1ª). Toque no acorde para ouvir
          a síntese acústica Karplus-Strong ou clique nas cordas do diagrama para ouvir as notas individuais.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            { id: 'todos', label: 'Todos os 12 Acordes' },
            { id: 'maior', label: 'Maiores (6)' },
            { id: 'menor', label: 'Menores (3)' },
            { id: 'setima', label: 'Com Sétima (3)' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === tab.id
                ? 'bg-[#10D97E] text-[#08090B] shadow-sm'
                : 'bg-[#111317] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Detail on Left, Chord Selector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active Chord Interactive Stage (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-[#0F1116] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Header of Active Chord */}
          <div className="flex items-start justify-between pb-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {selectedChord.name}
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-300">
                  {selectedChord.fullName}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#16191F] border border-white/10 text-emerald-400 font-mono">
                  Casas: [{selectedChord.frets.join(', ')}]
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#16191F] border border-white/10 text-[#D4AF37] font-mono">
                  Dedos: [{selectedChord.fingers.join(', ')}]
                </span>
              </div>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                selectedChord.difficulty === 'Fácil'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : selectedChord.difficulty === 'Médio'
                  ? 'bg-amber-500/10 text-[#D4AF37] border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
              }`}
            >
              {selectedChord.difficulty}
            </span>
          </div>

          {/* Interactive Fretboard Visualizer */}
          <div className="bg-[#111317] border border-white/5 rounded-2xl p-6 flex flex-col items-center">
            <ChordDiagram chord={selectedChord} size="md" />
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handlePlayChord}
              className="py-3 px-4 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#10D97E]/20 transition-all active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ouvir Acorde (Sintetizado)</span>
            </button>

            <button
              onClick={() => onStartTrainingWithChord(selectedChord.id)}
              className="py-3 px-4 rounded-xl bg-[#16191F] hover:bg-[#1E222A] text-slate-200 border border-white/10 font-bold text-sm flex items-center justify-center gap-2 transition-all hover:border-[#10D97E]/40"
            >
              <Repeat className="w-4 h-4 text-[#10D97E]" />
              <span>Treinar Troca com {selectedChord.name}</span>
            </button>
          </div>

          {/* String-by-String Detailed Breakdown */}
          <div className="space-y-3 pt-4 border-t border-white/5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Detalhamento Corda por Corda (Afinação Ré–Sol–Si–Ré)
            </h2>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { name: '4ª corda', base: 'Ré (D4)', idx: 0 },
                { name: '3ª corda', base: 'Sol (G4)', idx: 1 },
                { name: '2ª corda', base: 'Si (B4)', idx: 2 },
                { name: '1ª corda', base: 'Ré (D5)', idx: 3 },
              ].map((item) => {
                const fret = selectedChord.frets[item.idx];
                const finger = selectedChord.fingers[item.idx];
                const note = selectedChord.notes[item.idx];
                const freq = Math.round(selectedChord.frequencies[item.idx]);

                return (
                  <button
                    key={item.idx}
                    onClick={() => handlePlayString(item.idx)}
                    className="p-2.5 rounded-xl bg-[#111317] border border-white/5 hover:border-[#10D97E]/40 hover:bg-[#16191F] transition-all text-left group"
                  >
                    <p className="text-[10px] text-slate-300 font-semibold">{item.name}</p>
                    <p className="text-xs font-bold text-white mt-0.5">{note}</p>
                    <p className="text-[11px] text-emerald-400 font-mono mt-1">
                      {fret === 0 ? 'Solta (0)' : `Casa ${fret}`}
                    </p>
                    <p className="text-[10px] text-slate-300">
                      {finger === 0 ? 'Sem dedo' : `Dedo ${finger}`}
                    </p>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5">
                      {freq} Hz
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Practical Posture Advice */}
          <div className="p-4 rounded-xl bg-[#111317] border border-white/5 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-slate-200">Dica prática de execução:</span>
              <p className="text-slate-400 leading-relaxed">{selectedChord.tip}</p>
            </div>
          </div>
        </div>

        {/* Chord Selector Grid (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 px-1">
            Selecione um Acorde ({filteredChords.length})
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2.5">
            {filteredChords.map((chord) => {
              const isSelected = chord.id === selectedChord.id;
              return (
                <button
                  key={chord.id}
                  onClick={() => setSelectedChordId(chord.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                    isSelected
                      ? 'bg-[#10D97E]/15 border-[#10D97E] text-white shadow-md shadow-[#10D97E]/10 scale-102'
                      : 'bg-[#0F1116] border-white/5 text-slate-300 hover:border-white/20 hover:bg-[#16191F]'
                  }`}
                >
                  <div className="w-full flex items-center justify-between text-[10px] text-slate-300 mb-1">
                    <span className="font-mono text-slate-300">[{chord.frets.join(',')}]</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#10D97E]" />}
                  </div>

                  <span className="text-2xl font-black tracking-tight">{chord.name}</span>
                  <span className="text-[11px] text-slate-300 truncate w-full mt-0.5">
                    {chord.fullName}
                  </span>

                  <span
                    className={`mt-2 text-[9px] px-2 py-0.5 rounded-full font-medium ${
                      chord.category === 'maior'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : chord.category === 'menor'
                        ? 'bg-blue-500/10 text-blue-300'
                        : 'bg-amber-500/10 text-[#D4AF37]'
                    }`}
                  >
                    {chord.category}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-[#0F1116] border border-white/5 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 block mb-0.5">Legenda dos Dedos:</span>
            <span>0 = Corda Solta • 1 = Indicador • 2 = Médio • 3 = Anelar • 4 = Mínimo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
