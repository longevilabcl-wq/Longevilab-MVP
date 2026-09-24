import React from 'react';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#2F312D]/15 bg-[#F7F3EC] py-14 px-4 sm:px-8 mt-auto no-print">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="max-w-md">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold tracking-tight text-[#2F312D] text-left hover:opacity-85 transition-opacity"
          >
            LongeviLab
          </button>
          <p className="mt-3 text-lg text-[#2F312D]/85 italic">
            “La vejez no se improvisa, se construye día a día.”
          </p>
          <p className="mt-4 text-sm text-[#2F312D]/70 leading-relaxed">
            Ecosistema de innovación para reflexionar, diseñar y activar cómo vivir una vida más larga y con sentido.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#2F312D]/60 mb-3">
              Explorar
            </h4>
            <ul className="space-y-2.5 text-base">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-[#2F312D]/85 hover:text-[#2F312D] transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('mi-longevidad')}
                  className="text-[#2F312D]/85 hover:text-[#2F312D] transition-colors"
                >
                  Mi Longevidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sobre-longevilab')}
                  className="text-[#2F312D]/85 hover:text-[#2F312D] transition-colors"
                >
                  Sobre LongeviLab
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#2F312D]/60 mb-3">
              Información
            </h4>
            <ul className="space-y-2.5 text-base">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacidad')}
                  className="text-[#2F312D]/85 hover:text-[#2F312D] transition-colors"
                >
                  Privacidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contacto')}
                  className="text-[#2F312D]/85 hover:text-[#2F312D] transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#2F312D]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#2F312D]/70">
        <p className="max-w-2xl leading-relaxed">
          <strong>Nota importante:</strong> Mi Longevidad es una herramienta de reflexión y orientación personal. No corresponde a una evaluación clínica ni médica.
        </p>
        <p className="whitespace-nowrap">
          © {new Date().getFullYear()} LongeviLab.
        </p>
      </div>
    </footer>
  );
};
