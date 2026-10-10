import React, { useState } from 'react';
import { AppTab } from '../types';
import {
  Home,
  Music2,
  Repeat,
  BookOpen,
  FolderArchive,
  Clock,
  TrendingUp,
  LogOut,
  Sparkles,
  MoreHorizontal
} from 'lucide-react';

interface NavigationProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  isDemoMode?: boolean;
  onExitToHome: () => void;
  progressPercent: number;
}

interface NavItem {
  id: AppTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Início', icon: Home },
  { id: 'acordes', label: 'Acordes', icon: Music2 },
  { id: 'treinador', label: 'Treinar', icon: Repeat },
  { id: 'plano', label: 'Estudos', icon: BookOpen },
  { id: 'kit', label: 'Meu Kit', icon: FolderArchive },
  { id: 'metronomo', label: 'Tempo', icon: Clock },
  { id: 'evolucao', label: 'Evolução', icon: TrendingUp },
];

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  isDemoMode = false,
  onExitToHome,
  progressPercent,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile bottom bar items: show primary 5 items directly, plus 'Mais' modal or horizontal scroll
  const primaryMobileTabs: AppTab[] = ['dashboard', 'acordes', 'treinador', 'plano', 'metronomo'];

  return (
    <>
      {/* DESKTOP SIDEBAR (lg and up) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-[#0C0E12] min-h-screen p-5 justify-between shrink-0 select-none">
        <div>
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10D97E] to-emerald-700 flex items-center justify-center text-[#08090B] font-black text-xl shadow-lg shadow-[#10D97E]/10">
              CF
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white block">
                Cavaquinho Fácil
              </span>
              <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10D97E] animate-pulse" />
                Ré–Sol–Si–Ré
              </span>
            </div>
          </div>

          {/* Mode Banner if Demo */}
          {isDemoMode && (
            <div className="mb-6 p-2.5 rounded-lg bg-amber-500/10 border border-[#D4AF37]/30 text-xs text-amber-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Ambiente de Demonstração</span>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold px-3 mb-2">
              Área de Estudos
            </p>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#10D97E]/15 text-[#10D97E] border border-[#10D97E]/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#10D97E]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'plano' && progressPercent > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#10D97E]">
                      {progressPercent}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer / Exit */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <div className="bg-[#111317] p-3 rounded-xl border border-white/5 text-xs text-slate-400">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-slate-300">Jornada 7 Dias</span>
              <span className="text-[11px] font-mono text-[#10D97E] font-semibold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#10D97E] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={onExitToHome}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Voltar ao início</span>
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR (Screens < lg) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C0E12]/95 backdrop-blur-md border-t border-white/10 px-2 py-1.5 pb-safe">
        <div className="grid grid-cols-6 gap-0.5 items-center max-w-lg mx-auto">
          {primaryMobileTabs.map((tabId) => {
            const item = NAV_ITEMS.find((n) => n.id === tabId)!;
            const Icon = item.icon;
            const isActive = currentTab === tabId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSelectTab(item.id);
                }}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all ${
                  isActive ? 'text-[#10D97E]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`relative p-1 rounded-md ${isActive ? 'bg-[#10D97E]/15' : ''}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium tracking-tight mt-0.5 truncate max-w-[55px]">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Button for 'Mais' (Kit e Evolução) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all ${
              currentTab === 'kit' || currentTab === 'evolucao' || mobileMenuOpen
                ? 'text-[#10D97E]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1 rounded-md ${
                currentTab === 'kit' || currentTab === 'evolucao' ? 'bg-[#10D97E]/15' : ''
              }`}
            >
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-0.5 truncate">Mais</span>
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER / POPUP FOR 'MAIS' */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end p-4 animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#111317] border border-white/10 rounded-2xl p-4 space-y-2 mb-16 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-semibold text-slate-300">Outros Recursos</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-slate-300 hover:text-white"
              >
                Fechar
              </button>
            </div>

            <button
              onClick={() => {
                onSelectTab('kit');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${
                currentTab === 'kit'
                  ? 'bg-[#10D97E]/15 text-[#10D97E] border border-[#10D97E]/30'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <FolderArchive className="w-4 h-4 text-[#D4AF37]" />
              <div className="text-left">
                <p className="font-medium text-white">Meu Kit de Materiais</p>
                <p className="text-xs text-slate-300">E-book, dicionário e planner para download</p>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectTab('evolucao');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${
                currentTab === 'evolucao'
                  ? 'bg-[#10D97E]/15 text-[#10D97E] border border-[#10D97E]/30'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <p className="font-medium text-white">Minha Evolução</p>
                <p className="text-xs text-slate-300">Histórico de trocas e progresso dos 7 dias</p>
              </div>
            </button>

            <div className="pt-2 border-t border-white/5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExitToHome();
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 text-xs text-slate-300 hover:text-white rounded-lg"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair para a página inicial</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
