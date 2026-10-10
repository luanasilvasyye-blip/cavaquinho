import React, { useState } from 'react';
import { STUDY_PLAN } from '../data/studyPlan';
import { PlanDay, Lesson } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  Target
} from 'lucide-react';

interface StudyPlanViewProps {
  completedLessonIds: string[];
  onToggleLessonCompletion: (lessonId: string) => void;
  selectedLessonId?: string;
}

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({
  completedLessonIds,
  onToggleLessonCompletion,
  selectedLessonId,
}) => {
  // If a specific lesson was requested, find its day
  const initialDayIndex = selectedLessonId
    ? STUDY_PLAN.findIndex((d) => d.lessons.some((l) => l.id === selectedLessonId))
    : 0;

  const [activeDayIndex, setActiveDayIndex] = useState<number>(
    initialDayIndex !== -1 ? initialDayIndex : 0
  );

  const activeDay: PlanDay = STUDY_PLAN[activeDayIndex];

  // Global counts
  const totalLessons = STUDY_PLAN.reduce((acc, d) => acc + d.lessons.length, 0);
  const completedTotal = completedLessonIds.length;
  const progressPercent = Math.round((completedTotal / totalLessons) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider text-[#10D97E]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Jornada Passo a Passo</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Plano de Estudos de 7 Dias
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Construa uma base técnica sólida sem atalhos ilusórios. Pratique de 15 a 20 minutos por dia,
          conclua as lições e marque seu progresso real.
        </p>
      </div>

      {/* Progress Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1116] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[#10D97E] flex items-center justify-center font-mono font-bold text-lg shrink-0">
            {progressPercent}%
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Progresso Geral da Jornada</h2>
            <p className="text-xs text-slate-400">
              {completedTotal} de {totalLessons} lições concluídas
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64 h-2 bg-slate-800 rounded-full overflow-hidden self-center">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-[#10D97E] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 7 Days Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {STUDY_PLAN.map((day, idx) => {
          const isSelected = activeDayIndex === idx;
          const completedInDay = day.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;
          const isDayComplete = completedInDay === day.lessons.length;

          return (
            <button
              key={day.day}
              onClick={() => setActiveDayIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#10D97E]/15 border-[#10D97E] text-white shadow-md shadow-[#10D97E]/10'
                  : isDayComplete
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-200'
                  : 'bg-[#0F1116] border-white/5 text-slate-400 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-extrabold text-[11px]">Dia {day.day}</span>
                {isDayComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10D97E]" />
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">
                    {completedInDay}/{day.lessons.length}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold truncate text-white">
                {day.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Day Content */}
      <div className="bg-[#0F1116] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Day Meta Header */}
        <div className="pb-6 border-b border-white/5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Jornada • Dia {activeDay.day} de 7
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {activeDay.lessons.length} lições práticas
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {activeDay.title}
          </h2>

          <div className="p-3.5 rounded-xl bg-[#111317] border border-white/5 flex items-start gap-2.5">
            <Target className="w-4 h-4 text-[#10D97E] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-slate-200">Meta do Dia: </strong>
              <span className="text-slate-400">{activeDay.goal}</span>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-6">
          {activeDay.lessons.map((lesson: Lesson, lessonIdx: number) => {
            const isCompleted = completedLessonIds.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-[#111317]/80 border-emerald-500/30'
                    : 'bg-[#111317] border-white/5'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#16191F] text-slate-400 text-xs font-bold font-mono flex items-center justify-center">
                      {lessonIdx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {lesson.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.durationMinutes} min
                    </span>

                    <button
                      onClick={() => onToggleLessonCompletion(lesson.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                        isCompleted
                          ? 'bg-[#10D97E] text-[#08090B] shadow-sm shadow-[#10D97E]/20'
                          : 'bg-[#16191F] text-slate-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Concluída</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5 text-slate-500" />
                          <span>Marcar Concluída</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Lesson Objective */}
                <div className="py-3 text-xs text-emerald-400 font-medium">
                  <strong>Objetivo:</strong> {lesson.objective}
                </div>

                {/* Content paragraphs */}
                <div className="space-y-2 py-2">
                  {lesson.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Exercise Box */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#16191F] border border-white/5 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] block">
                    Exercício Prático
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {lesson.exercise}
                  </p>
                </div>

                {/* Tips */}
                {lesson.tips && (
                  <p className="mt-3 text-[11px] text-slate-400 italic">
                    💡 Dica: {lesson.tips}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Day Footer Navigation */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => setActiveDayIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeDayIndex === 0}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs text-slate-300 font-semibold"
          >
            ← Dia Anterior
          </button>

          <span className="text-xs text-slate-500 font-mono">
            {activeDayIndex + 1} de 7
          </span>

          <button
            onClick={() => setActiveDayIndex((prev) => Math.min(6, prev + 1))}
            disabled={activeDayIndex === 6}
            className="px-4 py-2 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] disabled:opacity-30 text-xs text-[#08090B] font-bold"
          >
            Próximo Dia →
          </button>
        </div>
      </div>

      {/* Honest Commitment Card */}
      <div className="p-4 rounded-2xl bg-[#0F1116] border border-white/5 flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Compromisso realista de aprendizado:</strong> 7 dias servem
          para construir as bases mecânicas corretas (postura, afinação, dedos e palhetada). Não prometemos
          virtuosismo em uma semana. A evolução contínua vem da prática de 15 minutos ao longo das próximas semanas.
        </p>
      </div>
    </div>
  );
};
