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
    <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-2xl mx-auto">
      <div className="bg-white border border-[#2F312D]/15 rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#F7F3EC] border border-[#2F312D]/15 flex items-center justify-center text-[#2F312D] mb-6">
          {isPrivacy ? <Shield className="w-7 h-7" /> : <Mail className="w-7 h-7" />}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2F312D] tracking-tight">
          {isPrivacy ? 'Privacidad y Confidencialidad' : 'Contacto con LongeviLab'}
        </h1>

        <div className="mt-6 space-y-4 text-base sm:text-lg text-[#2F312D]/80 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                En esta primera versión (MVP) de LongeviLab, la experiencia <strong>Mi Longevidad</strong> es totalmente anónima.
              </p>
              <p>
                No solicitamos tu nombre, RUT, teléfono, información médica ni datos personales sensibles. Tus respuestas se almacenan únicamente de manera local en tu propio navegador (localStorage) para permitirte completar tu mapa sin interrupciones.
              </p>
              <p className="text-sm text-[#2F312D]/60 pt-2">
                La política de privacidad completa y formal estará disponible próximamente conforme se habiliten nuevas funcionalidades del ecosistema.
              </p>
            </>
          ) : (
            <>
              <p>
                LongeviLab está en etapa de validación de su MVP inicial.
              </p>
              <p>
                Estamos preparando los canales de atención y retroalimentación institucional. Los canales de contacto oficiales estarán disponibles próximamente.
              </p>
              <p className="text-sm text-[#2F312D]/60 pt-2">
                Agradecemos tu interés en ser parte de la conversación sobre cómo construimos una longevidad con sentido.
              </p>
            </>
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-[#2F312D]/10">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-[#2F312D] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
