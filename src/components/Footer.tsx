import React from 'react';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#879B83]/20 bg-[#FAF7F2] py-14 px-4 sm:px-8 mt-auto no-print">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="max-w-md">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold tracking-tight text-[#303530] text-left hover:opacity-85 transition-opacity cursor-pointer flex items-center gap-1.5"
          >
            <span>LongeviLab</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C97863]" aria-hidden="true" />
          </button>
          <p className="mt-3 text-lg text-[#4F6757] font-semibold italic">
            “La vejez no se improvisa, se construye día a día.”
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#303530]/75 leading-relaxed">
            Ecosistema de innovación para reflexionar, diseñar y activar cómo vivir una vida más larga y con sentido.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4F6757] mb-3">
              Explorar
            </h4>
            <ul className="space-y-2.5 text-base font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-[#303530]/85 hover:text-[#C97863] transition-colors cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('mi-longevidad')}
                  className="text-[#303530]/85 hover:text-[#C97863] transition-colors cursor-pointer"
                >
                  Mi Longevidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sobre-longevilab')}
                  className="text-[#303530]/85 hover:text-[#C97863] transition-colors cursor-pointer"
                >
                  Sobre LongeviLab
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4F6757] mb-3">
              Información
            </h4>
            <ul className="space-y-2.5 text-base font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacidad')}
                  className="text-[#303530]/85 hover:text-[#C97863] transition-colors cursor-pointer"
                >
                  Privacidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contacto')}
                  className="text-[#303530]/85 hover:text-[#C97863] transition-colors cursor-pointer"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#879B83]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#303530]/70">
        <p className="max-w-2xl leading-relaxed">
          <strong className="text-[#303530]">Nota importante:</strong> Mi Longevidad es una herramienta de reflexión y orientación personal. No corresponde a una evaluación clínica ni médica.
        </p>
        <p className="whitespace-nowrap font-medium">
          © {new Date().getFullYear()} LongeviLab.
        </p>
      </div>
    </footer>
  );
};
