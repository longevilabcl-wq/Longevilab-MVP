import React, { useState } from 'react';
import { ViewType } from '../types';
import { Menu, X, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  isStepperActive?: boolean;
  currentStep?: number;
  totalSteps?: number;
  onExitStepper?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isStepperActive = false,
  currentStep = 1,
  totalSteps = 8,
  onExitStepper,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // When stepper is active, provide a calm, distraction-free header
  if (isStepperActive) {
    return (
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#879B83]/20 px-4 sm:px-8 py-3.5 transition-colors no-print">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExitStepper}
              className="inline-flex items-center gap-2 text-base text-[#4F6757] hover:text-[#303530] focus-visible:ring-2 focus-visible:ring-[#4F6757] rounded-lg px-2 py-1 transition-opacity cursor-pointer font-semibold"
              aria-label="Salir del recorrido y volver al inicio"
            >
              <ArrowLeft className="w-5 h-5 text-[#4F6757]" />
              <span className="font-bold text-lg tracking-tight text-[#303530]">LongeviLab</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm sm:text-base font-semibold text-[#4F6757] bg-[#E3ECE1] px-3 py-1 rounded-full tabular-nums">
              Paso {currentStep} de {totalSteps}
            </span>
            <button
              type="button"
              onClick={onExitStepper}
              className="text-sm font-medium text-[#303530]/70 hover:text-[#C97863] underline underline-offset-4 px-2 py-1 rounded cursor-pointer transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#879B83]/20 px-4 sm:px-8 py-4 transition-colors no-print">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="text-2xl font-bold tracking-tight text-[#303530] hover:opacity-85 transition-opacity text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4F6757] rounded-lg p-1 flex items-center gap-1.5"
        >
          <span>LongeviLab</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#C97863]" aria-hidden="true" />
        </button>

        {/* Zone 2: Clean navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-base font-medium text-[#303530]"
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`transition-colors py-1 cursor-pointer border-b-2 ${
              currentView === 'home'
                ? 'border-[#C97863] text-[#303530] font-bold'
                : 'border-transparent text-[#303530]/80 hover:text-[#4F6757]'
            }`}
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => onNavigate('mi-longevidad')}
            className={`transition-colors py-1 cursor-pointer border-b-2 ${
              currentView === 'mi-longevidad'
                ? 'border-[#C97863] text-[#303530] font-bold'
                : 'border-transparent text-[#303530]/80 hover:text-[#4F6757]'
            }`}
          >
            Mi Longevidad
          </button>
          <button
            type="button"
            onClick={() => onNavigate('sobre-longevilab')}
            className={`transition-colors py-1 cursor-pointer border-b-2 ${
              currentView === 'sobre-longevilab'
                ? 'border-[#C97863] text-[#303530] font-bold'
                : 'border-transparent text-[#303530]/80 hover:text-[#4F6757]'
            }`}
          >
            Qué es LongeviLab
          </button>
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('mi-longevidad')}
            className="px-5 py-2.5 text-base font-bold text-white bg-[#C97863] hover:bg-[#B56652] active:bg-[#A35542] active:scale-[0.99] rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C97863]"
          >
            Construir mi mapa
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#303530] rounded-lg focus-visible:ring-2 focus-visible:ring-[#4F6757] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#879B83]/20 mt-3 pt-4 pb-4 px-2 flex flex-col gap-3 bg-[#FAF7F2]">
          <button
            type="button"
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className={`text-left text-lg py-2.5 px-3 rounded-lg font-medium transition-colors ${
              currentView === 'home' ? 'bg-[#879B83]/15 font-bold text-[#303530]' : 'text-[#303530]'
            }`}
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('mi-longevidad');
              setMobileMenuOpen(false);
            }}
            className={`text-left text-lg py-2.5 px-3 rounded-lg font-medium transition-colors ${
              currentView === 'mi-longevidad' ? 'bg-[#879B83]/15 font-bold text-[#303530]' : 'text-[#303530]'
            }`}
          >
            Mi Longevidad
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('sobre-longevilab');
              setMobileMenuOpen(false);
            }}
            className={`text-left text-lg py-2.5 px-3 rounded-lg font-medium transition-colors ${
              currentView === 'sobre-longevilab' ? 'bg-[#879B83]/15 font-bold text-[#303530]' : 'text-[#303530]'
            }`}
          >
            Qué es LongeviLab
          </button>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onNavigate('mi-longevidad');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 text-lg font-bold text-white bg-[#C97863] hover:bg-[#B56652] rounded-xl shadow-sm cursor-pointer"
            >
              Construir mi mapa
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
