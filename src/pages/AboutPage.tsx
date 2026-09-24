import React from 'react';
import { ViewType } from '../types';
import { ArrowRight, Check, Sparkles, Heart, Users, Compass, BookOpen, Palette, Shield } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: ViewType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const PILLARS = [
    { title: 'Propósito', desc: 'Reconectar con aquello que le da sentido a los días y moviliza nuestras energías.', icon: Sparkles, bg: '#F5EFFB', border: '#D7BEF4', text: '#563188' },
    { title: 'Vínculos', desc: 'Cuidar las relaciones significativas, nutrir nuevas amistades y compartir entre generaciones.', icon: Users, bg: '#EEF6FB', border: '#B6DBF5', text: '#14517A' },
    { title: 'Autonomía', desc: 'Preservar la capacidad de decidir cómo, dónde y con quién queremos vivir.', icon: Compass, bg: '#F2F8EC', border: '#C8E4B4', text: '#2F591E' },
    { title: 'Participación', desc: 'Contar con espacios para aportar desde la propia experiencia y ser parte de una comunidad.', icon: Heart, bg: '#FDF0EE', border: '#F7C8BE', text: '#9A2F21' },
    { title: 'Aprendizaje', desc: 'Mantener viva la curiosidad intelectual, adquiriendo nuevos saberes y destrezas.', icon: BookOpen, bg: '#F0F7EE', border: '#C0E2BE', text: '#1E5A2F' },
    { title: 'Proyectos', desc: 'Emprender, crear y darle vida a iniciativas personales a cualquier edad.', icon: Palette, bg: '#FDF1EA', border: '#F7C6AF', text: '#A13F19' },
    { title: 'Preparación para el futuro', desc: 'Conversar y tomar decisiones con tiempo, cuidando nuestro bienestar y el de quienes nos rodean.', icon: Shield, bg: '#EFF2FB', border: '#C6D0F7', text: '#2E397B' },
  ];

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-4">
        <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#FDF1EA] border border-[#F7C6AF] text-[#A13F19]">
          Sobre LongeviLab
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F201D] tracking-tight leading-tight">
          ¿Cómo queremos vivir una vida más larga?
        </h1>
        <p className="text-xl sm:text-2xl text-[#2F312D]/85 leading-relaxed font-normal pt-2">
          LongeviLab nace de una idea simple: vivir más años también nos invita a pensar cómo queremos vivirlos.
        </p>
      </div>

      {/* Philosophy Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#F5EFFB] border-2 border-[#D7BEF4] space-y-4 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#351959] italic">
          “La vejez no se improvisa, se construye día a día.”
        </h2>
        <p className="text-base sm:text-lg text-[#2F312D]/90 leading-relaxed">
          No significa que podamos controlar todo lo que ocurrirá. Significa que podemos conversar, elegir, preparar y seguir construyendo nuestra vida a lo largo del tiempo.
        </p>
      </div>

      {/* Focus Areas */}
      <div className="space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F201D]">
          Dimensiones para pensar nuestra longevidad
        </h3>
        <p className="text-base sm:text-lg text-[#2F312D]/80 leading-relaxed">
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
                  className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs"
                  style={{ color: p.text }}
                >
                  <IconComp className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1F201D] mb-1">
                    {p.title}
                  </h4>
                  <p className="text-sm sm:text-base text-[#2F312D]/80 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experience CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FDF1EA] to-[#F5EFFB] border-2 border-[#E7D5FA] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F201D]">
            Comienza hoy por tu propia reflexión
          </h3>
          <p className="text-base text-[#2F312D]/85">
            Descubre tu Mapa de Longevidad en aproximadamente 10 minutos. Una experiencia personal y guiada.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('mi-longevidad')}
          className="inline-flex items-center gap-2 px-7 py-3.5 text-base sm:text-lg font-bold text-white bg-[#C15832] hover:bg-[#A84523] active:bg-[#913B1B] rounded-2xl transition-all shadow-md hover:shadow-lg shadow-[#C15832]/25 cursor-pointer whitespace-nowrap"
        >
          <span>Construir mi mapa</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
