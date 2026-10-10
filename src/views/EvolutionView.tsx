import React from 'react';
import { UserProgress, AppTab } from '../types';
import { ALL_LESSONS } from '../data/studyPlan';
import {
  TrendingUp,
  Award,
  Calendar,
  Repeat,
  BookOpen,
  Trash2,
  Sparkles,
  Zap
} from 'lucide-react';

interface EvolutionViewProps {
  userProgress: UserProgress;
  onClearHistory: () => void;
  onNavigateTab: (tab: AppTab) => void;
}

export const EvolutionView: React.FC<EvolutionViewProps> = ({
  userProgress,
  onClearHistory,
  onNavigateTab,
}) => {
  const totalLessons = ALL_LESSONS.length;
  const completedLessons = userProgress.completedLessons.length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  const history = userProgress.history;
  const totalSwitches = history.reduce((acc, h) => acc + h.switchesReported, 0);
  const totalSecondsTrained = history.reduce((acc, h) => acc + h.durationSeconds, 0);
  const bestSpm = history.length > 0 ? Math.max(...history.map((h) => h.switchesPerMinute)) : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider text-[#10D97E]">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Histórico & Métricas Reais</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Minha Evolução no Cavaquinho
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Acompanhe seu avanço com base em dados reais: trocas informadas nos treinos cronometrados
          e lições concluídas na Jornada de 7 Dias.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0F1116] border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#10D97E] flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-white block">
            {completedLessons}/{totalLessons}
          </span>
          <span className="text-xs text-slate-400 block">
            Lições Concluídas ({progressPercent}%)
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F1116] border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#10D97E] flex items-center justify-center">
            <Repeat className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-white block">
            {totalSwitches}
          </span>
          <span className="text-xs text-slate-400 block">
            Trocas de Acordes Realizadas
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F1116] border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-[#D4AF37] flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-white block">
            {bestSpm}
          </span>
          <span className="text-xs text-slate-400 block">
            Melhor Taxa (Trocas/min)
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F1116] border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-white block">
            {Math.round(totalSecondsTrained / 60)} min
          </span>
          <span className="text-xs text-slate-400 block">
            Tempo em Treinos de Trocas
          </span>
        </div>
      </div>

      {/* History Log Table */}
      <div className="bg-[#0F1116] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
          <div>
            <h2 className="text-lg font-bold text-white">Registro de Sessões no Treinador</h2>
            <p className="text-xs text-slate-400">
              Dados salvos no armazenamento local do seu navegador (localStorage)
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar histórico</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 text-slate-500 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-300">
              Nenhuma sessão registrada até o momento
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Abra a aba Treinar, configure dois acordes e registre seu primeiro teste de trocas!
            </p>
            <button
              onClick={() => onNavigateTab('treinador')}
              className="px-5 py-2.5 rounded-xl bg-[#10D97E] text-[#08090B] font-bold text-xs inline-flex items-center gap-2"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Ir para o Treinador</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 uppercase tracking-wider border-b border-white/5">
                  <th className="pb-3 font-semibold">Data</th>
                  <th className="pb-3 font-semibold">Par de Acordes</th>
                  <th className="pb-3 font-semibold">Duração</th>
                  <th className="pb-3 font-semibold">Trocas Informadas</th>
                  <th className="pb-3 font-semibold text-right">Taxa (Trocas/min)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.map((record) => (
                  <tr key={record.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 text-slate-400">
                      {new Date(record.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3">
                      <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-[#16191F]">
                        {record.chordA} ↔ {record.chordB}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300 font-mono">
                      {record.durationSeconds}s
                    </td>
                    <td className="py-3 text-white font-mono font-semibold">
                      {record.switchesReported}
                    </td>
                    <td className="py-3 text-right">
                      <span className="font-mono font-bold text-emerald-400">
                        {record.switchesPerMinute}/min
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
