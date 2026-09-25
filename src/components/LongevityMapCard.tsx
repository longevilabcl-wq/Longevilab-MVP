import React from 'react';
import { LongevityMap } from '../types';
import { Sparkles, Printer, ArrowRight, RotateCcw, ShieldCheck, HeartHandshake, Compass, Bookmark } from 'lucide-react';

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
      <div className="bg-white border border-[#879B83]/25 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm printable-card relative overflow-hidden">
        {/* Subtle decorative tone bar */}
        <div
          className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#C97863] via-[#E8B89F] via-[#E7D58B] via-[#879B83] via-[#4F6757] to-[#8DB9D5]"
          aria-hidden="true"
        />

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#879B83]/20 pb-6 mb-8">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C97863] block mb-1">
              Reflexión y diseño de futuro
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#303530] tracking-tight">
              Mi Longevidad
            </h1>
          </div>
          <div className="text-sm sm:text-base font-bold px-3.5 py-1.5 rounded-full bg-[#FDF5F1] border border-[#E8B89F] text-[#C97863]">
            {map.dateFormatted}
          </div>
        </div>

        {/* Personalized Phrase Block */}
        <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-[#FCF9ED] border-2 border-[#E7D58B] text-[#303530] shadow-2xs">
          <div className="flex items-start gap-3.5">
            <Sparkles className="w-6 h-6 text-[#7A6615] shrink-0 mt-0.5" />
            <p className="text-lg sm:text-xl font-semibold leading-relaxed italic text-[#303530]">
              “{map.personalPhrase}”
            </p>
          </div>
        </div>

        {/* 4 Editorial Blocks in a 2x2 Grid with distinctive warm colors, icons and labels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Block 1: LO QUE HOY QUIERO CONSERVAR */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#F2F6F1] border-2 border-[#879B83] flex flex-col shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-xl bg-[#DFEBDE] border border-[#879B83] flex items-center justify-center text-[#4F6757] shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#4F6757] tracking-wider uppercase block">Dimensión Presente</span>
                <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#4F6757]">
                  Lo que hoy quiero conservar
                </h2>
              </div>
            </div>
            <ul className="space-y-2.5 flex-1 text-base sm:text-lg text-[#303530]">
              {map.toKeep.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug">
                  <span className="text-[#4F6757] font-bold text-lg leading-none">✓</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 2: QUIERO DARLE MÁS ESPACIO A */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FDF5F1] border-2 border-[#E8B89F] flex flex-col shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-xl bg-[#F6D9CB] border border-[#E8B89F] flex items-center justify-center text-[#C97863] shrink-0">
                <HeartHandshake className="w-5 h-5 stroke-[2.2]" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#C97863] tracking-wider uppercase block">Dimensión Expansión</span>
                <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#C97863]">
                  Quiero darle más espacio a
                </h2>
              </div>
            </div>
            <ul className="space-y-2.5 flex-1 text-base sm:text-lg text-[#303530]">
              {map.giveSpaceTo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug font-bold">
                  <span className="text-[#C97863] font-bold text-lg leading-none">★</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 3: QUIERO COMENZAR A PREPARAR */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#EEF6FB] border-2 border-[#B6D6EB] flex flex-col shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-xl bg-[#D4E8F4] border border-[#B6D6EB] flex items-center justify-center text-[#1D4F73] shrink-0">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#1D4F73] tracking-wider uppercase block">Dimensión Anticipación</span>
                <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#1D4F73]">
                  Quiero comenzar a preparar
                </h2>
              </div>
            </div>
            <ul className="space-y-2.5 flex-1 text-base sm:text-lg text-[#303530]">
              {map.toPrepare.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-snug">
                  <span className="text-[#1D4F73] font-bold text-lg leading-none">→</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 4: LO QUE PARECE IMPORTANTE PARA MÍ */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#F2F6F1] border-2 border-[#879B83] flex flex-col shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-xl bg-[#DFEBDE] border border-[#879B83] flex items-center justify-center text-[#4F6757] shrink-0">
                <Bookmark className="w-5 h-5 stroke-[2.2]" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#4F6757] tracking-wider uppercase block">Dimensión Pilares</span>
                <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#4F6757]">
                  Lo que parece importante para mí
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {map.importantThemes.map((concept, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border-2 border-[#879B83] text-[#4F6757] text-base font-bold shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F6757]" />
                  {concept}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#303530]/75 leading-relaxed">
              Basado en tus respuestas espontáneas de hoy. Este mapa no busca etiquetarte, sino acompañar tus siguientes pasos.
            </p>
          </div>
        </div>

        {/* Footnote in card */}
        <div className="mt-8 pt-6 border-t border-[#879B83]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#303530]/65 gap-2">
          <span>LongeviLab · “La vejez no se improvisa, se construye día a día.”</span>
          <span>Herramienta de reflexión personal</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 no-print pt-2">
        <button
          type="button"
          onClick={onRestartMap}
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-[#4F6757] hover:text-[#303530] hover:bg-black/5 rounded-2xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Comenzar nuevamente
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={onPrintMap}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-[#303530] bg-white border-2 border-[#879B83]/30 hover:bg-[#FDF5F1] hover:border-[#E8B89F] rounded-2xl transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-5 h-5 text-[#303530]" />
            Guardar o imprimir mi mapa
          </button>

          <button
            type="button"
            onClick={onGoToActivations}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-lg font-bold text-white bg-[#C97863] hover:bg-[#B56652] active:bg-[#A35542] active:scale-[0.99] rounded-2xl transition-all shadow-md hover:shadow-lg shadow-[#C97863]/25 cursor-pointer"
          >
            <span>Descubrir qué puedo activar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
