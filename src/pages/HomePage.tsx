import React, { useState } from 'react';
import { ViewType } from '../types';
import { Modal } from '../components/Modal';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Palette,
  Plane,
  Award,
  Heart,
  Compass,
  Smile,
} from 'lucide-react';
import heroImg from '../assets/images/hero_active_longevity_1790256767698.jpg';
import learningImg from '../assets/images/learning_workshop_1790256777861.jpg';
import communityImg from '../assets/images/community_connection_1790256788397.jpg';

interface HomePageProps {
  onNavigate: (view: ViewType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activationModalOpen, setActivationModalOpen] = useState(false);

  const POSSIBILITIES = [
    {
      title: 'Aprender algo nuevo',
      desc: 'Idiomas, oficios, herramientas digitales o curiosidades pendientes.',
      icon: BookOpen,
      bg: '#F2F6F1',
      border: '#879B83',
      chipBg: '#DFEBDE',
      accentText: '#4F6757',
    },
    {
      title: 'Conocer personas',
      desc: 'Nuevos vínculos con intereses afines y diferentes generaciones.',
      icon: Users,
      bg: '#EEF6FB',
      border: '#B6D6EB',
      chipBg: '#D4E8F4',
      accentText: '#1D4F73',
    },
    {
      title: 'Retomar un proyecto',
      desc: 'Aquellas ideas postergadas que hoy pueden tener su propio momento.',
      icon: Sparkles,
      bg: '#FDF5F1',
      border: '#E8B89F',
      chipBg: '#F6D9CB',
      accentText: '#C97863',
    },
    {
      title: 'Compartir lo que sabes',
      desc: 'Mentorías, espacios de conversación y transmisión de experiencia.',
      icon: Award,
      bg: '#FCF9ED',
      border: '#E7D58B',
      chipBg: '#F6EFD0',
      accentText: '#7A6615',
    },
    {
      title: 'Viajar',
      desc: 'Explorar lugares cercanos o lejanos a tu propio ritmo y estilo.',
      icon: Plane,
      bg: '#EEF6FB',
      border: '#B6D6EB',
      chipBg: '#D4E8F4',
      accentText: '#1D4F73',
    },
    {
      title: 'Crear',
      desc: 'Escribir, diseñar, cultivar, pintar o construir con tus propias manos.',
      icon: Palette,
      bg: '#FDF5F1',
      border: '#E8B89F',
      chipBg: '#F6D9CB',
      accentText: '#C97863',
    },
    {
      title: 'Preparar tu próxima etapa',
      desc: 'Decidir dónde quieres vivir y cómo organizar tu autonomía.',
      icon: Compass,
      bg: '#F2F6F1',
      border: '#879B83',
      chipBg: '#DFEBDE',
      accentText: '#4F6757',
    },
    {
      title: 'Participar',
      desc: 'Involucrarte en tu barrio, comunidad o causas que te movilizan.',
      icon: Heart,
      bg: '#F2F6F1',
      border: '#879B83',
      chipBg: '#DFEBDE',
      accentText: '#4F6757',
    },
  ];

  const ACTIVATION_CATEGORIES = [
    { name: 'Talleres', bg: '#F2F6F1', border: '#879B83', text: '#4F6757' },
    { name: 'Charlas', bg: '#EEF6FB', border: '#B6D6EB', text: '#1D4F73' },
    { name: 'Comunidades', bg: '#EEF6FB', border: '#B6D6EB', text: '#1D4F73' },
    { name: 'Voluntariados', bg: '#F2F6F1', border: '#879B83', text: '#4F6757' },
    { name: 'Proyectos', bg: '#FDF5F1', border: '#E8B89F', text: '#C97863' },
    { name: 'Aprendizaje', bg: '#FCF9ED', border: '#E7D58B', text: '#7A6615' },
    { name: 'Diseñar mi próxima etapa', bg: '#FDF5F1', border: '#E8B89F', text: '#C97863' },
    { name: 'Propósito y sentido', bg: '#EEF6FB', border: '#B6D6EB', text: '#1D4F73' },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 py-6 sm:py-10">
      {/* --- HERO SECTION --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#FDF5F1] border border-[#E8B89F] text-[#C97863] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C97863] animate-pulse" />
              Ecosistema de Innovación en Longevidad
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#303530] tracking-tight leading-[1.15] text-balance">
              La vejez no se improvisa, se construye día a día.
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-[#C97863]">
              ¿Cómo quieres vivir una vida más larga?
            </p>

            <p className="text-base sm:text-lg text-[#303530]/85 leading-relaxed max-w-xl">
              En LongeviLab creemos que cada etapa puede abrir nuevas posibilidades. Descubre qué quieres conservar, transformar y comenzar a construir para tus próximos años.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('mi-longevidad')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-lg font-bold text-white bg-[#C97863] hover:bg-[#B56652] active:bg-[#A35542] active:scale-[0.99] rounded-2xl transition-all shadow-md hover:shadow-lg shadow-[#C97863]/25 cursor-pointer"
              >
                <span>Construir mi mapa</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('sobre-longevilab')}
                className="inline-flex items-center justify-center px-6 py-4 text-base font-bold text-[#4F6757] bg-white hover:bg-[#F2F6F1] rounded-2xl transition-colors cursor-pointer border border-[#879B83]/40 shadow-2xs"
              >
                Descubrir LongeviLab
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#303530]/60 pt-1">
              Una experiencia de aproximadamente 10 minutos. No hay respuestas correctas.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#FAF7F2] aspect-4/3 lg:aspect-4/3">
              <img
                src={heroImg || '/images/hero_active_longevity_1790256767698.jpg'}
                alt="Personas colaborando y conversando activamente en un entorno luminoso y contemporáneo"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('/images/')) {
                    target.src = '/images/hero_active_longevity_1790256767698.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#303530]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>Reflexión y diseño de futuro</span>
                <span className="px-2.5 py-1 rounded-full bg-[#4F6757]/80 backdrop-blur-xs text-xs font-bold">LongeviLab</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN POSIBILIDADES --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#DFEBDE] border border-[#879B83] text-[#4F6757] mb-3">
            Nuevas posibilidades
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#303530] tracking-tight leading-tight">
            Tu vida no termina cuando termina el trabajo.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#303530]/85 leading-relaxed">
            Una vida más larga también puede abrir espacio para nuevos proyectos, relaciones, aprendizajes y formas de participar.
          </p>
        </div>

        {/* Grid of 8 Possibilities with distinct warm colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POSSIBILITIES.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl border-2 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
                style={{
                  backgroundColor: item.bg,
                  borderColor: item.border,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xs"
                      style={{ backgroundColor: item.chipBg, color: item.accentText }}
                    >
                      <IconComp className="w-5 h-5 stroke-[2.2]" />
                    </span>
                    <span className="text-xs font-bold" style={{ color: item.accentText }}>
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#303530] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#303530]/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two editorial photos side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-md bg-[#FAF7F2] aspect-16/10">
            <img
              src={learningImg || '/images/learning_workshop_1790256777861.jpg'}
              alt="Adulto aprendiendo en un taller creativo con luz natural"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('/images/')) {
                  target.src = '/images/learning_workshop_1790256777861.jpg';
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 right-5 text-white text-base font-semibold">
              Aprender y crear sin límite de edad
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-md bg-[#FAF7F2] aspect-16/10">
            <img
              src={communityImg || '/images/community_connection_1790256788397.jpg'}
              alt="Personas de distintas generaciones compartiendo una conversación en un jardín"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('/images/')) {
                  target.src = '/images/community_connection_1790256788397.jpg';
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 right-5 text-white text-base font-semibold">
              Vínculos significativos e intergeneracionales
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN ACTIVACIÓN CON FONDOS COLORIDOS --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F2F6F1] border-2 border-[#879B83] shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#DFEBDE] text-[#4F6757] mb-2">
              Exploración de actividades
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#303530] tracking-tight">
              ¿Qué quieres activar?
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#303530]/85">
              Categorías demostrativas de experiencias y oportunidades que conectan con tus intereses.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {ACTIVATION_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivationModalOpen(true)}
                className="p-4 sm:p-5 rounded-2xl border-2 hover:shadow-md text-left transition-all cursor-pointer group bg-white"
                style={{
                  backgroundColor: cat.bg,
                  borderColor: cat.border,
                }}
              >
                <span className="text-base sm:text-lg font-bold text-[#303530] block leading-snug">
                  {cat.name}
                </span>
                <span
                  className="text-xs font-bold block mt-3 group-hover:translate-x-1 transition-transform"
                  style={{ color: cat.text }}
                >
                  Explorar →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN CALLOUT MI LONGEVIDAD --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#FDF5F1] via-[#FAF7F2] to-[#EEF6FB] border-2 border-[#879B83]/40 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#DFEBDE] text-[#4F6757]">
              Experiencia guiada y gratuita
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#303530] tracking-tight leading-tight">
              Haz una pausa y piensa en lo que viene.
            </h2>
            <p className="text-base sm:text-lg text-[#303530]/85 leading-relaxed">
              Mi Longevidad es una experiencia breve para mirar cómo estás viviendo hoy, descubrir qué quieres para tus próximos años y convertirlo en acciones concretas.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onNavigate('mi-longevidad')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-lg font-bold text-white bg-[#C97863] hover:bg-[#B56652] active:bg-[#A35542] active:scale-[0.99] rounded-2xl transition-all shadow-md hover:shadow-lg shadow-[#C97863]/25 cursor-pointer"
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
