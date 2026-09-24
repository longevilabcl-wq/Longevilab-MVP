import React, { useState } from 'react';
import { ViewType } from '../types';
import { Modal } from '../components/Modal';
import { ArrowRight, Compass, Sparkles, BookOpen, Users, Palette, Plane, Award, Heart, HelpCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: ViewType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activationModalOpen, setActivationModalOpen] = useState(false);

  const POSSIBILITIES = [
    { title: 'Aprender algo nuevo', desc: 'Idiomas, oficios, herramientas digitales o curiosidades pendientes.' },
    { title: 'Conocer personas', desc: 'Nuevos vínculos con intereses afines y diferentes generaciones.' },
    { title: 'Retomar un proyecto', desc: 'Aquellas ideas postergadas que hoy pueden tener su propio momento.' },
    { title: 'Compartir lo que sabes', desc: 'Mentorías, espacios de conversación y transmisión de experiencia.' },
    { title: 'Viajar', desc: 'Explorar lugares cercanos o lejanos a tu propio ritmo y estilo.' },
    { title: 'Crear', desc: 'Escribir, diseñar, cultivar, pintar o construir con tus propias manos.' },
    { title: 'Preparar tu próxima etapa', desc: 'Decidir dónde quieres vivir y cómo organizar tu autonomía.' },
    { title: 'Participar', desc: 'Involucrarte en tu barrio, comunidad o causas que te movilizan.' },
  ];

  const ACTIVATION_CATEGORIES = [
    'Talleres',
    'Charlas',
    'Comunidades',
    'Voluntariados',
    'Proyectos',
    'Aprendizaje',
    'Diseñar mi próxima etapa',
    'Propósito y sentido',
  ];

  return (
    <div className="space-y-20 sm:space-y-28 py-6 sm:py-10">
      {/* --- HERO SECTION --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#2F312D]/60 block">
              Ecosistema de Innovación en Longevidad
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#2F312D] tracking-tight leading-[1.15] text-balance">
              La vejez no se improvisa, se construye día a día.
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-[#2F312D]/90">
              ¿Cómo quieres vivir una vida más larga?
            </p>

            <p className="text-base sm:text-lg text-[#2F312D]/80 leading-relaxed max-w-xl">
              En LongeviLab creemos que cada etapa puede abrir nuevas posibilidades. Descubre qué quieres conservar, transformar y comenzar a construir para tus próximos años.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('mi-longevidad')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-lg font-bold text-white bg-[#2F312D] hover:bg-[#1E1F1C] active:scale-[0.99] rounded-2xl transition-all shadow-sm cursor-pointer"
              >
                <span>Construir mi mapa</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('sobre-longevilab')}
                className="inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-[#2F312D] hover:bg-[#2F312D]/5 rounded-2xl transition-colors cursor-pointer border border-[#2F312D]/20"
              >
                Descubrir LongeviLab
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#2F312D]/60 pt-1">
              Una experiencia de aproximadamente 10 minutos. No hay respuestas correctas.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#2F312D]/10 bg-[#E8E2D5] aspect-4/3 lg:aspect-4/3">
              <img
                src="/src/assets/images/hero_active_longevity_1790256767698.jpg"
                alt="Personas colaborando y conversando activamente en un entorno luminoso y contemporáneo"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container in case of any loading quirk
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F312D]/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm font-medium">
                Reflexión, diseño y activación para todas las edades
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN POSIBILIDADES --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2F312D]/60 block mb-2">
            Nuevas posibilidades
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2F312D] tracking-tight leading-tight">
            Tu vida no termina cuando termina el trabajo.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2F312D]/80 leading-relaxed">
            Una vida más larga también puede abrir espacio para nuevos proyectos, relaciones, aprendizajes y formas de participar.
          </p>
        </div>

        {/* Grid of 8 Possibilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POSSIBILITIES.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#2F312D]/15 flex flex-col justify-between transition-all hover:border-[#2F312D]/35 shadow-2xs"
            >
              <div>
                <span className="text-xs font-bold text-[#2F312D]/40 block mb-2">0{idx + 1}</span>
                <h3 className="text-lg font-bold text-[#2F312D] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#2F312D]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Two editorial photos side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="relative rounded-3xl overflow-hidden border border-[#2F312D]/10 bg-[#E8E2D5] aspect-16/10">
            <img
              src="/src/assets/images/learning_workshop_1790256777861.jpg"
              alt="Adulto aprendiendo en un taller creativo con luz natural"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium">
              Aprender y crear sin límite de edad
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-[#2F312D]/10 bg-[#E8E2D5] aspect-16/10">
            <img
              src="/src/assets/images/community_connection_1790256788397.jpg"
              alt="Personas de distintas generaciones compartiendo una conversación en un jardín"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium">
              Vínculos significativos e intergeneracionales
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN ACTIVACIÓN --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F4F1FA] border border-[#DDD6F3]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4A3B69] block mb-1">
              Exploración de actividades
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2F312D] tracking-tight">
              ¿Qué quieres activar?
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#2F312D]/80">
              Categorías demostrativas de experiencias y oportunidades que conectan con tus intereses.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {ACTIVATION_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivationModalOpen(true)}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#2F312D]/15 hover:border-[#2F312D] hover:shadow-xs text-left transition-all cursor-pointer group"
              >
                <span className="text-base sm:text-lg font-semibold text-[#2F312D] group-hover:text-black leading-snug">
                  {cat}
                </span>
                <span className="text-xs text-[#2F312D]/50 block mt-2">
                  Ver oportunidades →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN CALLOUT MI LONGEVIDAD --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-[#2F312D]/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#324E2E] block">
              Experiencia guiada
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F312D] tracking-tight leading-tight">
              Haz una pausa y piensa en lo que viene.
            </h2>
            <p className="text-base sm:text-lg text-[#2F312D]/80 leading-relaxed">
              Mi Longevidad es una experiencia breve para mirar cómo estás viviendo hoy, descubrir qué quieres para tus próximos años y convertirlo en acciones concretas.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onNavigate('mi-longevidad')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-lg font-bold text-white bg-[#2F312D] hover:bg-[#1E1F1C] active:scale-[0.99] rounded-2xl transition-all shadow-sm cursor-pointer"
            >
              <span>Construir mi mapa</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming notice modal */}
      <Modal
        isOpen={activationModalOpen}
        onClose={() => setActivationModalOpen(false)}
        title="Estamos construyendo esta experiencia."
        description="Próximamente podrás explorar oportunidades desde aquí."
        primaryButtonText="Entendido"
        onPrimaryClick={() => setActivationModalOpen(false)}
      />
    </div>
  );
};
