import React, { useState } from 'react';
import { ShieldCheck, Mail, KeyRound, ArrowRight, Home, Sparkles, AlertCircle } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (email: string, code: string) => void;
  onGoToHome: () => void;
  onGoToDemo: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onGoToHome,
  onGoToDemo,
}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation: valid email format & 4+ character code
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Por favor, digite um endereço de e-mail válido.');
      return;
    }

    if (code.trim().length < 4) {
      setErrorMessage('O código de acesso deve ter pelo menos 4 caracteres.');
      return;
    }

    onLoginSuccess(email.trim(), code.trim());
  };

  const handleFillDemoData = () => {
    setEmail('aluno.iniciante@exemplo.com');
    setCode('DEMO-FACIL');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-slate-100 flex flex-col justify-between selection:bg-[#10D97E]/30 selection:text-[#10D97E]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0C0E12]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onGoToHome}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">Início</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10D97E] to-emerald-700 flex items-center justify-center text-[#08090B] font-black text-sm">
              CF
            </div>
            <span className="font-bold text-sm tracking-tight text-white hidden sm:inline">
              Cavaquinho Fácil
            </span>
          </div>

          <button
            onClick={onGoToDemo}
            className="text-xs sm:text-sm text-slate-400 hover:text-white"
          >
            Modo Demonstração
          </button>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        {/* Transparent Banner */}
        <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-[#D4AF37]/30 text-amber-200 text-xs flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block text-amber-100">
              Ambiente de Demonstração (MVP)
            </span>
            <span className="text-slate-400">
              Sem vendas ou pagamentos reais. Você pode entrar digitando qualquer e-mail válido e
              um código de 4+ caracteres.
            </span>
          </div>
        </div>

        <div className="bg-[#0F1116] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Acesso do Aluno
            </h1>
            <p className="text-xs text-slate-400">
              Digite suas credenciais de estudo para abrir a área prática
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="email-input">
                E-mail cadastrado
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#16191F] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#10D97E] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="code-input">
                Código da transação ou de acesso
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="code-input"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Ex: DEMO-1234"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#16191F] border border-white/10 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#10D97E] transition-colors"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Qualquer código com 4 ou mais dígitos será aceito neste protótipo.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#10D97E]/20 transition-all active:scale-[0.98]"
            >
              <span>Entrar na Área de Estudos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick autofill helper for test convenience */}
          <div className="pt-2 border-t border-white/5 text-center">
            <button
              type="button"
              onClick={handleFillDemoData}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/30"
            >
              Preencher dados rápidos de teste
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <span>Acesso seguro com armazenamento no navegador</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 text-center text-xs text-slate-400">
        Cavaquinho Fácil • Ambiente de Aprendizado Prático
      </footer>
    </div>
  );
};
