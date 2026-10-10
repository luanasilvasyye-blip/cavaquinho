import React from 'react';
import { Music2, Repeat, Clock, BookOpen, Volume2, ShieldCheck, ArrowRight, Play, Sparkles } from 'lucide-react';
import { playChord } from '../utils/audio';
import { CHORD_BY_ID } from '../data/chords';

interface WelcomeViewProps {
  onGoToApp: () => void;
  onGoToDemo: () => void;
  onGoToLogin: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onGoToApp,
  onGoToDemo,
  onGoToLogin,
}) => {
  const gChord = CHORD_BY_ID.get('G')!;

  const handleTestSound = () => {
    playChord(gChord.frequencies);
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-slate-100 flex flex-col justify-between selection:bg-[#10D97E]/30 selection:text-[#10D97E]">
      {/* Top Navbar */}
      <header className="border-b border-white/5 bg-[#0C0E12]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10D97E] to-emerald-700 flex items-center justify-center text-[#08090B] font-extrabold text-lg shadow-md shadow-[#10D97E]/20">
              CF
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white">
                Cavaquinho Fácil
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Afinação Ré–Sol–Si–Ré
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onGoToDemo}
              className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Demonstração
            </button>
            <button
              onClick={onGoToLogin}
              className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#10D97E] bg-[#10D97E]/10 hover:bg-[#10D97E]/20 border border-[#10D97E]/30 transition-all"
            >
              Acessar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 py-12 sm:py-16 flex-1 flex flex-col justify-center">
        {/* Honest Label Pill */}
        <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#111317] border border-white/10 text-xs text-slate-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#10D97E]" />
          <span>Método prático para iniciantes no cavaquinho brasileiro</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.15]">
          Aprenda a tocar de verdade, com{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10D97E] via-emerald-300 to-[#D4AF37]">
            trocas de acordes limpas
          </span>{' '}
          e ritmo constante.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Sem falsas promessas de virtuosismo instantâneo. Um ambiente de estudos focado no que
          realmente importa: anatomia do cavaquinho, diagrama com áudio sintetizado, treinador de
          transições e metrônomo de samba em 2/4.
        </p>

        {/* Audio Quick Test Callout */}
        <div className="mt-8 p-4 rounded-2xl bg-[#111317] border border-white/10 max-w-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10D97E]/15 border border-[#10D97E]/30 flex items-center justify-center text-[#10D97E] shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Teste o som sintetizado</p>
              <p className="text-xs text-slate-400">Acorde Sol Maior (G) em afinação Ré-Sol-Si-Ré</p>
            </div>
          </div>
          <button
            onClick={handleTestSound}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all active:scale-95"
            aria-label="Tocar acorde Sol Maior"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Ouvir G</span>
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <button
            onClick={onGoToApp}
            className="px-6 py-3.5 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-[#10D97E]/20 transition-all hover:translate-y-[-1px] active:translate-y-0"
          >
            <span>Entrar no App de Estudos</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToDemo}
            className="px-5 py-3.5 rounded-xl bg-[#16191F] hover:bg-[#1E222A] text-slate-200 border border-white/10 text-sm sm:text-base font-semibold flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Ver Demonstração Rápida</span>
          </button>

          <button
            onClick={onGoToLogin}
            className="px-4 py-3.5 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            Já sou aluno? Entrar com código
          </button>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0F1116] border border-white/5 hover:border-[#10D97E]/30 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-[#10D97E] flex items-center justify-center mb-3">
              <Music2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white mb-1">12 Acordes Exatos</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diagramas interativos com dedos recomendados, cordas clicáveis e áudio físico sintetizado Karplus-Strong.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F1116] border border-white/5 hover:border-[#10D97E]/30 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-[#10D97E] flex items-center justify-center mb-3">
              <Repeat className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white mb-1">Treinador de Trocas</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cronômetro de 30s a 300s com alternância visual a cada 2s para treinar agilidade sem olhar pro braço.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F1116] border border-white/5 hover:border-[#10D97E]/30 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-[#10D97E] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white mb-1">Metrônomo 2/4</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Motor Web Audio com precisão milimétrica, acento forte no primeiro tempo e andamentos de 40 a 220 BPM.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F1116] border border-white/5 hover:border-[#10D97E]/30 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-[#10D97E] flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white mb-1">Plano de 7 Dias</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Roteiro passo a passo com postura, exercícios objetivos, dicas de anatomia e progresso salvo localmente.
            </p>
          </div>
        </div>

        {/* Honest Transparency Note */}
        <div className="mt-12 p-4 rounded-xl bg-[#0F1116] border border-white/5 flex items-start gap-3 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-200">Compromisso com o aprendizado:</strong> Este aplicativo é
            um ambiente didático sem anúncios, sem compras forçadas e sem truques. Todas as ferramentas
            de áudio rodam no seu próprio navegador via Web Audio API.
          </p>
        </div>
      </main>

      {/* Simple Clean Footer */}
      <footer className="border-t border-white/5 py-6 bg-[#08090B]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10D97E]" />
            <span>Cavaquinho Fácil • Estudos práticos em afinação brasileira (Ré–Sol–Si–Ré)</span>
          </div>
          <p>Funciona 100% no seu navegador sem dependências externas.</p>
        </div>
      </footer>
    </div>
  );
};
