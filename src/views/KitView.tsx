import React, { useState } from 'react';
import { KIT_MATERIALS } from '../data/kitMaterials';
import { KitMaterial } from '../types';
import { downloadMaterialPdf } from '../utils/pdfGenerator';
import {
  Download,
  Eye,
  FolderArchive,
  BookOpen,
  CheckCircle2,
  X,
  Sparkles,
  FileText
} from 'lucide-react';

export const KitView: React.FC = () => {
  const [previewMaterial, setPreviewMaterial] = useState<KitMaterial | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const handleDownload = (mat: KitMaterial) => {
    downloadMaterialPdf(mat.id);
    setDownloadSuccessId(mat.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
          <FolderArchive className="w-3.5 h-3.5" />
          <span>Materiais Complementares</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Meu Kit de Apoio ao Aluno
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          E-books e apostilas em formato PDF prático para acompanhar seus estudos no instrumento,
          imprimir ou consultar no tablet.
        </p>
      </div>

      {/* 3 Material Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {KIT_MATERIALS.map((mat) => {
          const isDownloaded = downloadSuccessId === mat.id;

          return (
            <div
              key={mat.id}
              className="bg-[#0F1116] border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl transition-all group"
            >
              {/* Material Cover Header */}
              <div
                className={`p-6 bg-gradient-to-b ${mat.coverGradient} border-b border-white/5 relative min-h-[160px] flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/10">
                    {mat.tag}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center text-slate-300">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-black text-white leading-snug">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    {mat.subtitle}
                  </p>
                </div>
              </div>

              {/* Material Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {mat.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Tópicos Abordados:
                    </span>
                    {mat.topics.slice(0, 3).map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10D97E] mt-1.5 shrink-0" />
                        <span className="line-clamp-1">{topic}</span>
                      </div>
                    ))}
                    {mat.topics.length > 3 && (
                      <p className="text-[11px] text-slate-400 pl-3.5">
                        + {mat.topics.length - 3} outros tópicos
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => handleDownload(mat)}
                    className="w-full py-2.5 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#10D97E]/20 transition-all active:scale-95"
                  >
                    {isDownloaded ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Download Concluído!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Baixar PDF Demonstrativo</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setPreviewMaterial(mat)}
                    className="w-full py-2 rounded-xl bg-[#16191F] hover:bg-[#1E232D] text-slate-300 hover:text-white border border-white/5 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visualizar no Navegador</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* IN-APP PREVIEW MODAL */}
      {previewMaterial && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewMaterial(null)}
        >
          <div
            className="bg-[#0F1116] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111317]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#10D97E]">
                  Leitor de Documento • {previewMaterial.tag}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {previewMaterial.title}
                </h3>
              </div>

              <button
                onClick={() => setPreviewMaterial(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#16191F] border border-white/5 space-y-2">
                <span className="text-xs font-bold text-slate-200 block">
                  Visão Geral do Conteúdo
                </span>
                <p className="text-xs text-slate-400">{previewMaterial.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
                  Índice de Tópicos
                </h4>
                <div className="space-y-2">
                  {previewMaterial.topics.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#111317] border border-white/5 flex items-center gap-3 text-xs"
                    >
                      <span className="w-5 h-5 rounded-md bg-[#16191F] text-slate-400 font-mono font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#10D97E] shrink-0 mt-0.5" />
                <p>
                  Você pode baixar o arquivo <strong>.pdf</strong> completo diretamente para o seu
                  computador ou smartphone e imprimir com facilidade para a sua pasta de estudos.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-[#111317] flex items-center justify-between">
              <button
                onClick={() => setPreviewMaterial(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Fechar Visualização
              </button>

              <button
                onClick={() => handleDownload(previewMaterial)}
                className="px-5 py-2.5 rounded-xl bg-[#10D97E] hover:bg-[#0eb86b] text-[#08090B] font-bold text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Arquivo PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
