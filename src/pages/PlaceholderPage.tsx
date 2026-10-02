import React from 'react';
import { ViewType } from '../types';
import { ArrowLeft, Shield, Mail } from 'lucide-react';

interface PlaceholderPageProps {
  type: 'privacidad' | 'contacto';
  onNavigate: (view: ViewType) => void;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacidad';

  return (
    <div className="py-20 sm:py-28 px-6 sm:px-12 max-w-3xl mx-auto animate-in fade-in duration-300">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#DFEBDE] text-[#4F6757] flex items-center justify-center">
            {isPrivacy ? <Shield className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
          </span>
          <span className="text-xs uppercase tracking-widest text-[#879B83] font-bold">
            {isPrivacy ? 'Privacidad' : 'Contacto'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#292D2A] tracking-tight">
          {isPrivacy ? 'Privacidad y Confidencialidad' : 'Contacto con LongeviLab'}
        </h1>

        <div className="space-y-6 text-base sm:text-lg text-[#292D2A]/85 leading-relaxed font-light border-t border-[#879B83]/20 pt-8">
          {isPrivacy ? (
            <>
              <p>
                En esta versión de <strong>LongeviLab</strong>, la experiencia <em>Mi Longevidad</em> es 100% anónima y personal.
              </p>
              <p>
                No solicitamos tu nombre, RUT, teléfono, información médica ni datos personales sensibles. Tus respuestas se almacenan únicamente de manera local en tu propio navegador para permitirte explorar y revisar tu mapa a tu propio ritmo.
              </p>
              <p className="text-sm text-[#292D2A]/60 pt-2 font-mono">
                LongeviLab · Compromiso ético con la privacidad y la autonomía digital.
              </p>
            </>
          ) : (
            <>
              <p>
                LongeviLab es un laboratorio de innovación en desarrollo continuo.
              </p>
              <p>
                Si tienes consultas, interés en colaborar en investigación o participar en nuestros programas piloto, puedes escribirnos directamente a nuestro equipo de coordinación.
              </p>
              <p className="text-sm text-[#292D2A]/60 pt-2 font-mono">
                longevilab.cl@gmail.com · Santiago, Chile
              </p>
            </>
          )}
        </div>

        <div className="pt-8 border-t border-[#879B83]/20">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#4F6757] hover:text-[#292D2A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
