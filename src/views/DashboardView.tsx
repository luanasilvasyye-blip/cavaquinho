import React from 'react';
import { UserProgress, AppTab } from '../types';
import { STUDY_PLAN, ALL_LESSONS } from '../data/studyPlan';
import {
  Play,
  ArrowRight,
  Repeat,
  Clock,
  Music2,
  FolderArchive,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';

interface DashboardViewProps {
  userProgress: UserProgress;
  onNavigateTab: (tab: AppTab) => void;
  onSelectLesson: (lessonId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProgress,
  onNavigateTab,
  onSelectLesson,
}) => {
  const totalLessons = ALL_LESSONS.length;
  const completedCount = userProgress.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Find the next incomplete lesson
  const nextLesson = ALL_LESSONS.find(
    (l) => !userProgress.completedLessons.includes(l.id)
  ) || ALL_LESSONS[0];

  const nextLessonDay = STUDY_PLAN.find((d) =>
    d.lessons.some((l) => l.id === nextLesson.id)
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Greeting & Progress Hero */}
      <div className="bg-gradient-to-r from-[#0F1116] via-[#12151C] to-[#0F1116] border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prática Diária de Cavaquinho</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bem-vindo ao seu espaço de estudos!
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              O segredo do som limpo e da palhetada leve está na consistência de 15 minutos diários.
              Mantenha o foco na precisão dos dedos e no andamento constante do metrônomo.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectLesson(nextLesson.id)}
                className="px-5 py-2.5 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#10D97E]/20 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continuar Estudando</span>
              </button>
              <button
                onClick={() => onNavigateTab('treinador')}
                className="px-4 py-2.5 rounded-xl bg-[#16191F] hover:bg-[#1E222A] text-slate-200 border border-white/10 text-sm font-semibold flex items-center gap-2 transition-all"
              >
                <Repeat className="w-4 h-4 text-[#10D97E]" />
                <span>Treinar Trocas</span>
              </button>
            </div>
          </div>

          {/* Circular Progress Ring */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#08090B]/60 border border-white/5 shrink-0">
            <div className="relative flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  stroke="#1F242E"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  stroke="#10D97E"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 46}
                  strokeDashoffset={2 * Math.PI * 46 * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-black font-mono text-white">
                  {progressPercent}%
                </span>
                <span className="text-[10px] text-slate-400 block -mt-1 font-medium">concluído</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 mt-2 font-medium">
              {completedCount} de {totalLessons} lições feitas
            </span>
          </div>
        </div>
      </div>

      {/* Next Lesson Highlight Card */}
      <div className="bg-[#0F1116] border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              {nextLessonDay ? `Dia ${nextLessonDay.day} • ${nextLessonDay.title}` : 'Próxima Aula'}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{nextLesson.durationMinutes} min de prática</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {nextLesson.title}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {nextLesson.objective}
          </p>
        </div>

        <button
          onClick={() => onSelectLesson(nextLesson.id)}
          className="px-5 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shrink-0 active:scale-95"
        >
          <span>Iniciar esta Lição</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Access Grid */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3 px-1">
          Acesso Rápido às Ferramentas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => onNavigateTab('acordes')}
            className="p-4 rounded-2xl bg-[#0F1116] border border-white/5 hover:border-[#10D97E]/30 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#10D97E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Music2 className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm text-white group-hover:text-[#10D97E] transition-colors">
              12 Acordes
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Diagramas & som sintetizado
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('treinador')}
            className="p-4 rounded-2xl bg-[#0F1116] border border-white/5 hover:border-[#10D97E]/30 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#10D97E] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Repeat className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm text-white group-hover:text-[#10D97E] transition-colors">
              Treinador
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Alternador 2s & cronômetro
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('metronomo')}
            className="p-4 rounded-2xl bg-[#0F1116] border border-white/5 hover:border-[#10D97E]/30 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#D4AF37] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm text-white group-hover:text-[#D4AF37] transition-colors">
              Metrônomo 2/4
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              40–220 BPM com acento
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('kit')}
            className="p-4 rounded-2xl bg-[#0F1116] border border-white/5 hover:border-[#10D97E]/30 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FolderArchive className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm text-white group-hover:text-teal-400 transition-colors">
              Meu Kit
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              3 PDFs didáticos de apoio
            </p>
          </button>
        </div>
      </div>

      {/* 7 Days Timeline Overview */}
      <div className="bg-[#0F1116] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#10D97E]" />
            <h2 className="text-sm font-bold text-white">Indicadores da Jornada de 7 Dias</h2>
          </div>
          <button
            onClick={() => onNavigateTab('plano')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Ver todas as lições →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
          {STUDY_PLAN.map((day) => {
            const dayLessons = day.lessons;
            const completedInDay = dayLessons.filter((l) =>
              userProgress.completedLessons.includes(l.id)
            ).length;
            const isAllCompleted = completedInDay === dayLessons.length;
            const isPartial = completedInDay > 0 && !isAllCompleted;

            return (
              <div
                key={day.day}
                onClick={() => onNavigateTab('plano')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  isAllCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                    : isPartial
                    ? 'bg-amber-500/10 border-[#D4AF37]/30 text-white'
                    : 'bg-[#111317] border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold">Dia {day.day}</span>
                  {isAllCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10D97E]" />
                  ) : (
                    <span className="text-[10px] text-slate-300 font-mono">
                      {completedInDay}/{dayLessons.length}
                    </span>
                  )}
                </div>
                <p className="text-[11px] line-clamp-1 font-medium text-slate-300">{day.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Training History */}
      <div className="bg-[#0F1116] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <h2 className="text-sm font-bold text-white">Histórico Recente de Treinos</h2>
          </div>
          <button
            onClick={() => onNavigateTab('evolucao')}
            className="text-xs text-slate-400 hover:text-white"
          >
            Ver histórico completo
          </button>
        </div>

        {userProgress.history.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <p className="text-xs text-slate-400">
              Nenhum treino registrado ainda. Que tal fazer um teste de 60 segundos com G e C?
            </p>
            <button
              onClick={() => onNavigateTab('treinador')}
              className="px-4 py-2 rounded-xl bg-[#10D97E] text-[#08090B] font-bold text-xs inline-flex items-center gap-1.5"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Fazer primeiro treino de trocas</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {userProgress.history.slice(0, 3).map((record) => (
              <div
                key={record.id}
                className="p-3 rounded-xl bg-[#111317] border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 rounded bg-[#16191F] font-mono font-bold text-white border border-white/5">
                    {record.chordA} ↔ {record.chordB}
                  </div>
                  <span className="text-slate-400">{record.durationSeconds}s de prática</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-mono font-bold">
                    {record.switchesReported} trocas ({record.switchesPerMinute}/min)
                  </span>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    {new Date(record.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
