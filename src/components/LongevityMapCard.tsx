import React from 'react';
import { LongevityMap } from '../types';
import { Sparkles, Printer, ArrowRight, RotateCcw } from 'lucide-react';

interface LongevityMapCardProps {
  map: LongevityMap;
  onGoToActivations: () => void;
  onPrintMap: () => void;
  onRestartMap: () => void;
}

export const LongevityMapCard: React.FC<LongevityMapCardProps> = ({
  map,
  onGoToActivations,
  onPrintMap,
  onRestartMap,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Editorial Card Layout */}
      <div className="bg-white border border-[#2F312D]/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm printable-card relative overflow-hidden">
        {/* Subtle decorative tone bar */}
        <div
          className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#DDD6F3] via-[#D3E0D0] via-[#D9EAF3] to-[#F3D7C7]"
          aria-hidden="true"
        />

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#2F312D]/10 pb-6 mb-8">
          <div>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#2F312D]/60 block mb-1">
              Reflexión y diseño de futuro
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2F312D] tracking-tight">
              Mi Longevidad
            </h1>
          </div>
          <div className="text-sm sm:text-base text-[#2F312D]/70 font-medium">
            {map.dateFormatted}
          </div>
        </div>

        {/* Personalized Phrase Block */}
        <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-[#F4F1FA] border border-[#DDD6F3] text-[#2F312D]">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#4A3B69] shrink-0 mt-1" />
            <p className="text-lg sm:text-xl font-medium leading-relaxed italic text-[#2F312D]">
              “{map.personalPhrase}”
            </p>
          </div>
        </div>

        {/* 4 Editorial Blocks in a 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Block 1: LO QUE HOY QUIERO CONSERVAR */}
          <div className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#E5DECF] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#324E2E]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2F312D]/75">
                Lo que hoy quiero conservar
              </h2>
            </div>
            <ul className="space-y-2.5 flex-1 text-base sm:text-lg text-[#2F312D]">
              {map.toKeep.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug">
                  <span className="text-[#324E2E] font-bold">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 2: QUIERO DARLE MÁS ESPACIO A */}
          <div className="p-6 rounded-2xl bg-[#FDF7F3] border border-[#ECCDBB] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#68402A]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2F312D]/75">
                Quiero darle más espacio a
              </h2>
            </div>
            <ul className="space-y-2.5 flex-1 text-base sm:text-lg text-[#2F312D]">
              {map.giveSpaceTo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug font-medium">
                  <span className="text-[#68402A] font-bold">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 3: QUIERO COMENZAR A PREPARAR */}
          <div className="p-6 rounded-2xl bg-[#F2F7FA] border border-[#C8DFEC] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C495E]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2F312D]/75">
                Quiero comenzar a preparar
              </h2>
            </div>
            <ul className="space-y-2.5 flex-1 text-base sm:text-lg text-[#2F312D]">
              {map.toPrepare.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug">
                  <span className="text-[#2C495E] font-bold">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 4: LO QUE PARECE IMPORTANTE PARA MÍ */}
          <div className="p-6 rounded-2xl bg-[#F5F5FA] border border-[#D8D4EE] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4A3B69]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2F312D]/75">
                Lo que parece importante para mí
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {map.importantThemes.map((concept, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3.5 py-1.5 rounded-xl bg-white border border-[#2F312D]/15 text-[#2F312D] text-base font-semibold shadow-2xs"
                >
                  {concept}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#2F312D]/60 leading-relaxed">
              Basado en tus respuestas espontáneas de hoy. Este mapa no busca etiquetarte, sino acompañar tus siguientes pasos.
            </p>
          </div>
        </div>

        {/* Footnote in card */}
        <div className="mt-8 pt-6 border-t border-[#2F312D]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#2F312D]/60 gap-2">
          <span>LongeviLab · “La vejez no se improvisa, se construye día a día.”</span>
          <span>Herramienta de reflexión personal</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 no-print pt-2">
        <button
          type="button"
          onClick={onRestartMap}
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-medium text-[#2F312D]/80 hover:text-[#2F312D] hover:bg-black/5 rounded-2xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Comenzar nuevamente
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={onPrintMap}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#2F312D] bg-white border border-[#2F312D]/20 hover:bg-[#F4F1FA] rounded-2xl transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-5 h-5 text-[#2F312D]" />
            Guardar o imprimir mi mapa
          </button>

          <button
            type="button"
            onClick={onGoToActivations}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-lg font-bold text-white bg-[#2F312D] hover:bg-[#1E1F1C] active:scale-[0.99] rounded-2xl transition-all shadow-sm cursor-pointer"
          >
            <span>Descubrir qué puedo activar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
