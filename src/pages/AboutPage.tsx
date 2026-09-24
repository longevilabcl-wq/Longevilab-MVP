import React from 'react';
import { ViewType } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: ViewType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const PILLARS = [
    { title: 'Propósito', desc: 'Reconectar con aquello que le da sentido a los días y moviliza nuestras energías.' },
    { title: 'Vínculos', desc: 'Cuidar las relaciones significativas, nutrir nuevas amistades y compartir entre generaciones.' },
    { title: 'Autonomía', desc: 'Preservar la capacidad de decidir cómo, dónde y con quién queremos vivir.' },
    { title: 'Participación', desc: 'Contar con espacios para aportar desde la propia experiencia y ser parte de una comunidad.' },
    { title: 'Aprendizaje', desc: 'Mantener viva la curiosidad intelectual, adquiriendo nuevos saberes y destrezas.' },
    { title: 'Proyectos', desc: 'Emprender, crear y darle vida a iniciativas personales a cualquier edad.' },
    { title: 'Preparación para el futuro', desc: 'Conversar y tomar decisiones con tiempo, cuidando nuestro bienestar y el de quienes nos rodean.' },
  ];

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#2F312D]/60 block">
          Sobre LongeviLab
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2F312D] tracking-tight leading-tight">
          ¿Cómo queremos vivir una vida más larga?
        </h1>
        <p className="text-xl sm:text-2xl text-[#2F312D]/85 leading-relaxed font-normal pt-2">
          LongeviLab nace de una idea simple: vivir más años también nos invita a pensar cómo queremos vivirlos.
        </p>
      </div>

      {/* Philosophy Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#F4F1FA] border border-[#DDD6F3] space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2F312D] italic">
          “La vejez no se improvisa, se construye día a día.”
        </h2>
        <p className="text-base sm:text-lg text-[#2F312D]/85 leading-relaxed">
          No significa que podamos controlar todo lo que ocurrirá. Significa que podemos conversar, elegir, preparar y seguir construyendo nuestra vida a lo largo del tiempo.
        </p>
      </div>

      {/* Focus Areas */}
      <div className="space-y-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#2F312D]">
          Dimensiones para pensar nuestra longevidad
        </h3>
        <p className="text-base sm:text-lg text-[#2F312D]/80 leading-relaxed">
          En LongeviLab exploramos nuevas formas de reflexionar y proyectar:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PILLARS.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#2F312D]/15 flex items-start gap-3.5 shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#D3E0D0] text-[#324E2E] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#2F312D] mb-1">
                  {p.title}
                </h4>
                <p className="text-sm sm:text-base text-[#2F312D]/75 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#2F312D]/15 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-[#2F312D]">
            Comienza hoy por tu propia reflexión
          </h3>
          <p className="text-base text-[#2F312D]/80">
            Descubre tu Mapa de Longevidad en aproximadamente 10 minutos. Una experiencia personal y guiada.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('mi-longevidad')}
          className="inline-flex items-center gap-2 px-7 py-3.5 text-base sm:text-lg font-bold text-white bg-[#2F312D] hover:bg-[#1E1F1C] rounded-2xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
        >
          <span>Construir mi mapa</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
