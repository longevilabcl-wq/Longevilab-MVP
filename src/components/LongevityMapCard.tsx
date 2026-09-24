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
          className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#C15832] via-[#205B32] via-[#14517A] to-[#563188]"
          aria-hidden="true"
        />

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#2F312D]/10 pb-6 mb-8">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C15832] block mb-1">
              Reflexión y diseño de futuro
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F201D] tracking-tight">
              Mi Longevidad
            </h1>
          </div>
          <div className="text-sm sm:text-base text-[#2F312D]/80 font-semibold px-3.5 py-1.5 rounded-full bg-[#FDF1EA] border border-[#F7C6AF] text-[#A13F19]">
            {map.dateFormatted}
          </div>
        </div>

        {/* Personalized Phrase Block */}
        <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-[#F5EFFB] border-2 border-[#D7BEF4] text-[#2F312D] shadow-2xs">
          <div className="flex items-start gap-3.5">
            <Sparkles className="w-6 h-6 text-[#563188] shrink-0 mt-0.5" />
            <p className="text-lg sm:text-xl font-semibold leading-relaxed italic text-[#241738]">
              “{map.personalPhrase}”
            </p>
          </div>
        </div>

        {/* 4 Editorial Blocks in a 2x2 Grid with distinctive warm colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Block 1: LO QUE HOY QUIERO CONSERVAR */}
          <div className="p-6 rounded-2xl bg-[#EDF7EE] border-2 border-[#BBE3BE] flex flex-col shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#205B32]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#205B32]">
                Lo que hoy quiero conservar
              </h2>
            </div>
            <ul className="space-y-2.5 flex-1 text-base sm:text-lg text-[#1F201D]">
              {map.toKeep.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug">
                  <span className="text-[#205B32] font-bold text-lg leading-none">·</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 2: QUIERO DARLE MÁS ESPACIO A */}
          <div className="p-6 rounded-2xl bg-[#FDF1EA] border-2 border-[#F7C6AF] flex flex-col shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#A13F19]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#A13F19]">
                Quiero darle más espacio a
              </h2>
            </div>
            <ul className="space-y-2.5 flex-1 text-base sm:text-lg text-[#1F201D]">
              {map.giveSpaceTo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug font-bold">
                  <span className="text-[#A13F19] font-bold text-lg leading-none">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 3: QUIERO COMENZAR A PREPARAR */}
          <div className="p-6 rounded-2xl bg-[#EEF6FB] border-2 border-[#B6DBF5] flex flex-col shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#14517A]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#14517A]">
                Quiero comenzar a preparar
              </h2>
            </div>
            <ul className="space-y-2.5 flex-1 text-base sm:text-lg text-[#1F201D]">
              {map.toPrepare.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug">
                  <span className="text-[#14517A] font-bold text-lg leading-none">·</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 4: LO QUE PARECE IMPORTANTE PARA MÍ */}
          <div className="p-6 rounded-2xl bg-[#F5EFFB] border-2 border-[#D7BEF4] flex flex-col shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#563188]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#563188]">
                Lo que parece importante para mí
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {map.importantThemes.map((concept, idx) => (
                <span
                  key={idx}
                  className="inline-block px-4 py-2 rounded-xl bg-white border-2 border-[#D7BEF4] text-[#563188] text-base font-bold shadow-2xs"
                >
                  {concept}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#2F312D]/70 leading-relaxed">
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-[#2F312D] bg-white border-2 border-[#2F312D]/20 hover:bg-[#FDF1EA] hover:border-[#F7C6AF] rounded-2xl transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-5 h-5 text-[#2F312D]" />
            Guardar o imprimir mi mapa
          </button>

          <button
            type="button"
            onClick={onGoToActivations}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-lg font-bold text-white bg-[#C15832] hover:bg-[#A84523] active:bg-[#913B1B] active:scale-[0.99] rounded-2xl transition-all shadow-md hover:shadow-lg shadow-[#C15832]/25 cursor-pointer"
          >
            <span>Descubrir qué puedo activar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
