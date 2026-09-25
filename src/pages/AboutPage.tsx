import React from 'react';
import { ViewType } from '../types';
import { ArrowRight, Check, Sparkles, Heart, Users, Compass, BookOpen, Palette, Shield } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: ViewType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const PILLARS = [
    { title: 'Propósito', desc: 'Reconectar con aquello que le da sentido a los días y moviliza nuestras energías.', icon: Sparkles, bg: '#FDF5F1', border: '#E8B89F', text: '#C97863' },
    { title: 'Vínculos', desc: 'Cuidar las relaciones significativas, nutrir nuevas amistades y compartir entre generaciones.', icon: Users, bg: '#EEF6FB', border: '#B6D6EB', text: '#1D4F73' },
    { title: 'Autonomía', desc: 'Preservar la capacidad de decidir cómo, dónde y con quién queremos vivir.', icon: Compass, bg: '#F2F6F1', border: '#879B83', text: '#4F6757' },
    { title: 'Participación', desc: 'Contar con espacios para aportar desde la propia experiencia y ser parte de una comunidad.', icon: Heart, bg: '#F2F6F1', border: '#879B83', text: '#4F6757' },
    { title: 'Aprendizaje', desc: 'Mantener viva la curiosidad intelectual, adquiriendo nuevos saberes y destrezas.', icon: BookOpen, bg: '#FCF9ED', border: '#E7D58B', text: '#7A6615' },
    { title: 'Proyectos', desc: 'Emprender, crear y darle vida a iniciativas personales a cualquier edad.', icon: Palette, bg: '#FDF5F1', border: '#E8B89F', text: '#C97863' },
    { title: 'Preparación para el futuro', desc: 'Conversar y tomar decisiones con tiempo, cuidando nuestro bienestar y el de quienes nos rodean.', icon: Shield, bg: '#EEF6FB', border: '#B6D6EB', text: '#1D4F73' },
  ];

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-4">
        <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#FDF5F1] border border-[#E8B89F] text-[#C97863]">
          Sobre LongeviLab
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#303530] tracking-tight leading-tight">
          ¿Cómo queremos vivir una vida más larga?
        </h1>
        <p className="text-xl sm:text-2xl text-[#303530]/85 leading-relaxed font-normal pt-2">
          LongeviLab nace de una idea simple: vivir más años también nos invita a pensar cómo queremos vivirlos.
        </p>
      </div>

      {/* Philosophy Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#F2F6F1] border-2 border-[#879B83] space-y-4 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4F6757] italic">
          “La vejez no se improvisa, se construye día a día.”
        </h2>
        <p className="text-base sm:text-lg text-[#303530]/90 leading-relaxed">
          No significa que podamos controlar todo lo que ocurrirá. Significa que podemos conversar, elegir, preparar y seguir construyendo nuestra vida a lo largo del tiempo.
        </p>
      </div>

      {/* Focus Areas */}
      <div className="space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#303530]">
          Dimensiones para pensar nuestra longevidad
        </h3>
        <p className="text-base sm:text-lg text-[#303530]/80 leading-relaxed">
          En LongeviLab exploramos nuevas formas de reflexionar y proyectar:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PILLARS.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border-2 flex items-start gap-4 shadow-2xs transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundColor: p.bg,
                  borderColor: p.border,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs border"
                  style={{ color: p.text, borderColor: p.border }}
                >
                  <IconComp className="w-5 h-5 stroke-[2.3]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#303530] mb-1">
                    {p.title}
                  </h4>
                  <p className="text-sm sm:text-base text-[#303530]/80 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experience CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FDF5F1] via-[#FAF7F2] to-[#EEF6FB] border-2 border-[#879B83]/40 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#303530]">
            Comienza hoy por tu propia reflexión
          </h3>
          <p className="text-base text-[#303530]/85">
            Descubre tu Mapa de Longevidad en aproximadamente 10 minutos. Una experiencia personal y guiada.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('mi-longevidad')}
          className="inline-flex items-center gap-2 px-7 py-3.5 text-base sm:text-lg font-bold text-white bg-[#C97863] hover:bg-[#B56652] active:bg-[#A35542] rounded-2xl transition-all shadow-md hover:shadow-lg shadow-[#C97863]/25 cursor-pointer whitespace-nowrap"
        >
          <span>Construir mi mapa</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
