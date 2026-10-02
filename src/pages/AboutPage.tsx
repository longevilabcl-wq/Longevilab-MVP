import React from 'react';
import { ViewType } from '../types';
import { ArrowRight, Sparkles, Activity, Cpu, Users, Compass, Award, Layers } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: ViewType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const DIMENSIONS = [
    { name: 'Vitalidad', icon: Activity, desc: 'Salud física, autonomía funcional, nutrición y descanso reparador.' },
    { name: 'Cognición', icon: Cpu, desc: 'Curiosidad intelectual, aprendizaje continuo, plasticidad y adaptación tecnológica.' },
    { name: 'Conexión', icon: Users, desc: 'Vínculos significativos, redes comunitarias y puentes intergeneracionales.' },
    { name: 'Continuidad', icon: Compass, desc: 'Sentido de trayectoria, historia personal e integración biográfica.' },
    { name: 'Contribución', icon: Award, desc: 'Mentoría, voluntariado, proyectos productivos y transmisión de legado.' },
    { name: 'Contexto', icon: Layers, desc: 'Vivienda adecuada, entorno accesible, seguridad financiera y políticas públicas.' },
  ];

  return (
    <div className="py-16 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto space-y-24 animate-in fade-in duration-300">
      {/* Editorial Header */}
      <div className="max-w-4xl space-y-8">
        <span className="text-xs uppercase tracking-widest text-[#879B83] font-bold block">
          Sobre LongeviLab · Manifiesto y Enfoque
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#292D2A] tracking-[-0.03em] leading-[1.1] text-balance">
          ¿Cómo queremos vivir una vida más larga?
        </h1>
        <p className="text-2xl sm:text-3xl font-editorial italic text-[#4F6757] leading-relaxed">
          LongeviLab nace de una certeza: vivir más años no es solo un logro de la medicina, sino una invitación a reinventar cómo construimos nuestro futuro.
        </p>
      </div>

      {/* Narrative Pause */}
      <div className="py-12 px-8 sm:px-12 bg-[#F4F1EB] rounded-3xl border border-[#879B83]/20 space-y-4">
        <p className="text-xs font-mono uppercase tracking-widest text-[#879B83]">
          Principio rector
        </p>
        <blockquote className="text-2xl sm:text-4xl font-editorial italic text-[#292D2A] leading-snug">
          “La vejez no se improvisa, se construye día a día.”
        </blockquote>
        <p className="text-base text-[#292D2A]/80 font-light max-w-2xl pt-2">
          No significa controlar cada variable del porvenir. Significa abrir conversaciones sinceras, tomar decisiones informadas antes de que sean urgencias, y mantener encendida la capacidad de asombro.
        </p>
      </div>

      {/* Narrative Section: Laboratorio de Innovación */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C97863] font-bold">
            Identidad
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292D2A] tracking-tight">
            Un laboratorio vivo, no una clínica geriátrica.
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#292D2A]/85 font-light leading-relaxed">
          <p>
            Rechazamos los estereotipos que asocian el envejecimiento únicamente con la fragilidad, el deterioro o el retiro pasivo. Creemos que una persona a los 65 o 75 años puede estar comenzando su proyecto más inspirador.
          </p>
          <p>
            LongeviLab opera en la intersección entre diseño editorial, investigación científica, ciencias sociales y bienestar, creando espacios donde personas de cualquier edad pueden planificar su curso de vida con autonomía y optimismo.
          </p>
        </div>
      </div>

      {/* Dimensions Minimalist Grid */}
      <div className="space-y-12 border-t border-[#879B83]/20 pt-16">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#879B83] font-bold block mb-2">
            Marco Conceptual
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#292D2A] tracking-tight">
            Seis dimensiones para una longevidad con propósito
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DIMENSIONS.map((dim, idx) => {
            const IconComp = dim.icon;
            return (
              <div key={idx} className="space-y-3 pb-6 border-b border-[#292D2A]/15">
                <div className="flex items-center gap-3">
                  <IconComp className="w-5 h-5 text-[#4F6757] stroke-[1.8]" />
                  <h4 className="text-xl font-bold text-[#292D2A]">{dim.name}</h4>
                </div>
                <p className="text-sm text-[#292D2A]/75 leading-relaxed font-light">
                  {dim.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Callout */}
      <div className="p-10 sm:p-14 rounded-3xl bg-[#FAF7F2] border-2 border-[#879B83]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-[#C97863] font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C97863]" />
            Experiencia Abierta
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#292D2A]">
            Comienza por tu propia reflexión.
          </h3>
          <p className="text-base text-[#292D2A]/80 font-light">
            Explora la herramienta interactiva <strong>Mi Longevidad</strong> y genera tu mapa personal.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('mi-longevidad')}
          className="px-8 py-4 text-base font-bold text-white bg-[#C97863] hover:bg-[#B56652] active:bg-[#A35542] rounded-full transition-all shadow-sm hover:shadow cursor-pointer flex items-center gap-2 whitespace-nowrap"
        >
          <span>Explorar Mi Longevidad</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
